import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

// Standard "too many requests" response
const fail = (message) => (req, res) =>
  res.status(429).json({ message });

// Trust the reverse proxy (nginx) so per-client limits work in production.
const configureTrustProxy = (app) => {
  app.set('trust proxy', 1);
};

// Strict limiter for credential endpoints: login/register/verify-otp (SEC-06, SEC-10)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  handler: fail('Too many authentication attempts. Please try again later.'),
});

// General API limiter (SEC-10)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  handler: fail('Too many requests from this IP. Please slow down.'),
});

// Extra-tight limiter for OTP verification attempts (SEC-06)
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  handler: fail('Too many OTP attempts. Please request a new code later.'),
});

// Public write endpoints: contact form, newsletter signup (SEC-10, SEC-22)
const publicWriteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  handler: fail('Too many submissions from this IP. Please try again later.'),
});

export { configureTrustProxy, authLimiter, apiLimiter, otpLimiter, publicWriteLimiter };
