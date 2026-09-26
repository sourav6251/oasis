import crypto from 'crypto';

// Generate a cryptographically secure 6-digit OTP (SEC-06)
const generateOtp = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

export default generateOtp;
