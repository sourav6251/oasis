package com.oasis.controller;

import com.oasis.dto.MessageResponse;
import com.oasis.dto.UpdateProfileRequest;
import com.oasis.dto.UserProfileResponse;
import com.oasis.service.UserService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@Log4j2
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Get current user's profile
     * 
     * GET /api/user/profile
     * Headers: Authorization: Bearer {token}
     * 
     * Response:
     * {
     * "userId": "uuid",
     * "email": "user@example.com",
     * "fullName": "John Doe",
     * "mobileNumber": "+1234567890",
     * "dateOfBirth": "1990-01-01",
     * "profileImageUrl": "https://...",
     * "userType": "USER",
     * "isEmailVerified": true,
     * "isMobileVerified": false,
     * "createdAt": "2024-01-01T00:00:00",
     * "updatedAt": "2024-01-01T00:00:00"
     * }
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        try {
            log.info("📋 Get profile request received");
            UserProfileResponse profile = userService.getProfile();
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            log.error("❌ Get profile failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Get user profile by ID
     * 
     * GET /api/user/profile/{userId}
     * 
     * Response: Same as GET /api/user/profile
     */
    @GetMapping("/profile/{userId}")
    public ResponseEntity<?> getProfileById(@PathVariable String userId) {
        try {
            log.info("📋 Get profile by ID request: {}", userId);
            UserProfileResponse profile = userService.getProfileById(userId);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            log.error("❌ Get profile by ID failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Update current user's profile
     * 
     * PUT /api/user/profile
     * Headers: Authorization: Bearer {token}
     * 
     * Request Body:
     * {
     * "fullName": "Jane Doe",
     * "mobileNumber": "+1234567890",
     * "dateOfBirth": "1990-01-01"
     * }
     * 
     * Response: UserProfileResponse
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        try {
            log.info("✏️ Update profile request received");
            UserProfileResponse profile = userService.updateProfile(request);
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            log.error("❌ Update profile failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Upload profile image
     * 
     * POST /api/user/profile/image
     * Headers: Authorization: Bearer {token}
     * Content-Type: multipart/form-data
     * 
     * Form Data:
     * - file: image file (jpg, png, etc.)
     * 
     * Response: UserProfileResponse with updated profileImageUrl
     */
    @PostMapping("/profile/image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        try {
            log.info("📷 Upload profile image request received");

            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("File is empty", false));
            }

            UserProfileResponse profile = userService.uploadProfileImage(file);
            return ResponseEntity.ok(profile);

        } catch (Exception e) {
            log.error("❌ Upload profile image failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Delete profile image
     * 
     * DELETE /api/user/profile/image
     * Headers: Authorization: Bearer {token}
     * 
     * Response: UserProfileResponse with profileImageUrl set to null
     */
    @DeleteMapping("/profile/image")
    public ResponseEntity<?> deleteProfileImage() {
        try {
            log.info("🗑️ Delete profile image request received");
            UserProfileResponse profile = userService.deleteProfileImage();
            return ResponseEntity.ok(profile);
        } catch (Exception e) {
            log.error("❌ Delete profile image failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Health check endpoint (kept for backward compatibility)
     */
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("User service is running");
    }
}
