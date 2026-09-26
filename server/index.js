import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import galleryRoutes from './src/routes/galleryRoutes.js';
import galleryCategoryRoutes from './src/routes/galleryCategoryRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import blogRoutes from './src/routes/blogRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import subscriberRoutes from './src/routes/subscriberRoutes.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { apiLimiter } from './src/middleware/rateLimiters.js';

const app = express();

// Behind nginx / cloud LB (needed for correct client IPs in rate limiting) (SEC-10)
app.set('trust proxy', 1);

// Security headers (SEC-12)
app.use(helmet({
  contentSecurityPolicy: false, // CSP is enforced at the nginx/client level for this SPA
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // images served from CDN domain
}));
const frontendURL=process.env.FRONTEND_URL;

// Connect to database
connectDB();

// Middleware
app.use(cookieParser());
// Fail-closed CORS: no requests are allowed unless FRONTEND_URL is configured (SEC-15).
// Comma-separated list supported, e.g. "https://oasis.com,https://admin.oasis.com".
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0 && process.env.NODE_ENV !== 'test') {
  console.warn('WARNING: FRONTEND_URL is not set — CORS will reject all cross-origin requests.');
}

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser clients (curl, health checks) with no Origin header
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '1mb' }));

// Global rate limit for all API routes (SEC-10)
app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/gallery-categories', galleryCategoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Oasis API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
