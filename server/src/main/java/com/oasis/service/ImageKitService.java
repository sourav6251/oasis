package com.oasis.service;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageKitService {

    @Autowired
    private ImageKit imageKit;

    public String uploadImage(MultipartFile file) {
        try {
            FileCreateRequest fileCreateRequest = new FileCreateRequest(file.getBytes(), file.getOriginalFilename());
            Result result = imageKit.upload(fileCreateRequest);
            return result.getUrl();
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image to ImageKit", e);
        } catch (Exception e) {
            throw new RuntimeException("Error occurred while uploading image: " + e.getMessage(), e);
        }
    }
}
