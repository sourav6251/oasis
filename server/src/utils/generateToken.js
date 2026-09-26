import jwt from 'jsonwebtoken';

// Short-lived access tokens; long exposure windows removed (SEC-07, SEC-18)
const TOKEN_EXPIRY = process.env.JWT_EXPIRES_IN || '24h';

const generateToken = (id, tokenVersion = 0) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

export default generateToken;
