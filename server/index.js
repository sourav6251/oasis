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
import cookieParser from 'cookie-parser';

const app = express();
const frontendURL=process.env.FRONTEND_URL;

// Connect to database
connectDB();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5001',
  credentials: true,
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  // exposeHeaders: ['Set-Cookie'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/gallery-categories', galleryCategoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Oasis API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
