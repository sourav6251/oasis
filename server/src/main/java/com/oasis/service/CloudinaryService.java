package com.oasis.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }

    /**
     * Upload file to Cloudinary
     * 
     * @param file MultipartFile to upload
     * @return URL of uploaded file
     */
    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        // Upload to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", "oasis",
                "resource_type", "image"));

        // Return the secure URL
        return (String) uploadResult.get("secure_url");
    }

    /**
     * Delete file from Cloudinary
     * 
     * @param publicId Public ID of the file to delete
     */
    public void deleteFile(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }

    /**
     * Extract public ID from Cloudinary URL
     * 
     * @param url Cloudinary URL
     * @return Public ID
     */
    public String extractPublicId(String url) {
        if (url == null || !url.contains("cloudinary.com")) {
            return null;
        }

        // Extract public ID from URL
        // Example:
        // https://res.cloudinary.com/cloud-name/image/upload/v123456/oasis/image.jpg
        // Public ID: oasis/image
        String[] parts = url.split("/upload/");
        if (parts.length < 2) {
            return null;
        }

        String pathAfterUpload = parts[1];
        // Remove version number (v123456/)
        String withoutVersion = pathAfterUpload.replaceFirst("v\\d+/", "");
        // Remove file extension
        int lastDot = withoutVersion.lastIndexOf('.');
        if (lastDot > 0) {
            return withoutVersion.substring(0, lastDot);
        }

        return withoutVersion;
    }
}
