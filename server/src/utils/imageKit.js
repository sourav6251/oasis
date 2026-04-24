import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

/**
 * Upload an image to ImageKit
 * @param {Buffer} fileBuffer - The image file buffer
 * @param {string} fileName - The name of the file
 * @returns {Promise<{url: string, fileId: string}>} - The URL and fileId of the uploaded image
 */
const uploadImage = async (fileBuffer, fileName) => {
  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: "/profile_photos"
    });
    return { url: response.url, fileId: response.fileId };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("Failed to upload image to ImageKit");
  }
};

/**
 * Delete an image from ImageKit
 * @param {string} fileId - The ID of the file to delete
 * @returns {Promise<void>}
 */
const deleteImage = async (fileId) => {
  try {
    if (!fileId) return;
    await imagekit.deleteFile(fileId);
    console.log(`Image with ID ${fileId} deleted successfully from ImageKit.`);
  } catch (error) {
    console.error("ImageKit delete error:", error);
    // We don't necessarily want to throw here if deletion fails, 
    // but maybe log it so we know we have a orphan file.
  }
};

export { uploadImage, deleteImage };

