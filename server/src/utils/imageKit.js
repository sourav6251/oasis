import ImageKit from "@imagekit/nodejs";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Upload an image to ImageKit
 * @param {Buffer} fileBuffer - The image file buffer
 * @param {string} fileName - A server-generated name (never client-supplied)
 * @returns {Promise<{url: string, fileId: string}>} - The URL and fileId of the uploaded image
 */
const uploadImage = async (fileBuffer, fileName) => {
  try {
    const filePayload = Buffer.isBuffer(fileBuffer)
      ? fileBuffer.toString('base64')
      : fileBuffer;

    const response = await imagekit.files.upload({
      file: filePayload,
      fileName: String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_'),
      folder: "/profile_photos",
      useUniqueFileName: true,
    });
    return { url: response.url, fileId: response.fileId };
  } catch (error) {
    console.error("ImageKit upload error:", error.message);
    throw new Error("Failed to upload image to ImageKit");
  }
};

/**
 * Delete an image from ImageKit.
 *
 * SECURITY (SEC-02): deletion is only ever performed by explicit fileId —
 * recorded in our own database for the document being modified. URL-based
 * lookups (list-by-name derived from user content) were removed because they
 * allowed any authenticated user to delete files they do not own.
 * @param {string} fileId - The ID of the file to delete
 * @returns {Promise<void>}
 */
const deleteImage = async (fileId) => {
  try {
    if (!fileId || typeof fileId !== 'string') {
      return; // nothing safe to delete
    }
    await imagekit.files.delete(fileId);
    console.log(`Image with ID ${fileId} deleted successfully from ImageKit.`);
  } catch (error) {
    console.error("ImageKit delete error:", error.message);
  }
};

export { uploadImage, deleteImage };
