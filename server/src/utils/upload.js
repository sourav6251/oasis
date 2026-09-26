import multer from 'multer';

// Only allow common web image types (SEC-14)
const ALLOWED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per file

const makeUploader = () =>
  multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_IMAGE_SIZE_BYTES, files: 10 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error('Only JPEG, PNG or WebP images are allowed'));
      }
      cb(null, true);
    },
  });

/** Single-image upload field (e.g. profile photo, service image). */
const uploadSingleImage = (fieldName) => makeUploader().single(fieldName);

/** Multi-image upload: accepts the same field repeated up to maxCount times. */
const uploadImageArray = (fieldName, maxCount = 10) =>
  makeUploader().array(fieldName, maxCount);

/**
 * Multer error handler middleware — returns a clean 4xx message instead of
 * leaking stack traces / internal errors for oversized or rejected uploads.
 */
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ message: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT' || err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Too many files or unexpected upload field.' });
    }
    return res.status(400).json({ message: 'File upload failed.' });
  }
  if (err) {
    return res.status(400).json({ message: err.message || 'File upload failed.' });
  }
  next();
};

export { uploadSingleImage, uploadImageArray, handleUploadErrors };
