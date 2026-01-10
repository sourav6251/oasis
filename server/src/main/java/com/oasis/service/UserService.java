package com.oasis.service;

import com.oasis.dto.UpdateProfileRequest;
import com.oasis.dto.UserProfileResponse;
import com.oasis.model.FileStorage;
import com.oasis.model.Users;
import com.oasis.repository.FileStorageRepository;
import com.oasis.repository.UsersRepo;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Log4j2
public class UserService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private FileStorageRepository fileStorageRepository;

    @Autowired
    private ImageKitService imageKitService;

    /**
     * Get current authenticated user's profile
     */
    public UserProfileResponse getProfile() {
        Users user = getCurrentUser();
        return buildUserProfileResponse(user);
    }

    /**
     * Get user profile by ID (for admin or public access)
     */
    public UserProfileResponse getProfileById(String userId) {
        Users user = usersRepo.findById(userId)
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", userId);
                    return new RuntimeException("User not found");
                });

        return buildUserProfileResponse(user);
    }

    /**
     * Update current user's profile
     */
    public UserProfileResponse updateProfile(UpdateProfileRequest request) {
        Users user = getCurrentUser();

        log.info("📝 Updating profile for user: {}", user.getEmail());

        // Update fields if provided
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            user.setFullName(request.getFullName());
        }

        if (request.getMobileNumber() != null && !request.getMobileNumber().isBlank()) {
            user.setMobileNumber(request.getMobileNumber());
            // Reset mobile verification if number changed
            user.setIsMobileVerified(false);
        }

        if (request.getDateOfBirth() != null) {
            user.setDateOfBirth(request.getDateOfBirth());
        }

        Users updatedUser = usersRepo.save(user);
        log.info("✅ Profile updated successfully for: {}", updatedUser.getEmail());

        return buildUserProfileResponse(updatedUser);
    }

    /**
     * Upload profile image
     */
    public UserProfileResponse uploadProfileImage(MultipartFile file) {
        Users user = getCurrentUser();

        log.info("📷 Uploading profile image for user: {}", user.getEmail());

        try {
            // Upload to ImageKit
            String imageUrl = imageKitService.uploadImage(file);

            // Check if user already has a profile image
            Optional<FileStorage> existingFile = fileStorageRepository
                    .findByEntityTypeAndEntityId("USER_PROFILE", user.getId());

            FileStorage fileStorage;
            if (existingFile.isPresent()) {
                // Update existing file
                fileStorage = existingFile.get();
                fileStorage.setFileUrl(imageUrl);
                log.info("🔄 Updating existing profile image");
            } else {
                // Create new file storage entry
                fileStorage = FileStorage.builder()
                        .entityType("USER_PROFILE")
                        .entityId(user.getId())
                        .fileUrl(imageUrl)
                        .build();
                log.info("➕ Creating new profile image entry");
            }

            fileStorage = fileStorageRepository.save(fileStorage);

            // Update user's profile picture reference
            user.setProfilePictureFile(fileStorage);
            usersRepo.save(user);

            log.info("✅ Profile image uploaded successfully");

            return buildUserProfileResponse(user);

        } catch (Exception e) {
            log.error("❌ Failed to upload profile image: {}", e.getMessage());
            throw new RuntimeException("Failed to upload profile image: " + e.getMessage());
        }
    }

    /**
     * Delete profile image
     */
    public UserProfileResponse deleteProfileImage() {
        Users user = getCurrentUser();

        log.info("🗑️ Deleting profile image for user: {}", user.getEmail());

        if (user.getProfilePictureFile() != null) {
            // Remove reference
            user.setProfilePictureFile(null);
            usersRepo.save(user);

            log.info("✅ Profile image deleted successfully");
        } else {
            log.warn("⚠️ No profile image to delete");
        }

        return buildUserProfileResponse(user);
    }

    // ========================= Helper Methods =========================

    /**
     * Get currently authenticated user
     */
    private Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            log.error("❌ No authenticated user found");
            throw new RuntimeException("User not authenticated");
        }

        String email = authentication.getName();

        return usersRepo.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", email);
                    return new RuntimeException("User not found");
                });
    }

    /**
     * Build UserProfileResponse from Users entity
     */
    private UserProfileResponse buildUserProfileResponse(Users user) {
        String profileImageUrl = null;

        if (user.getProfilePictureFile() != null) {
            profileImageUrl = user.getProfilePictureFile().getFileUrl();
        }

        return UserProfileResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .mobileNumber(user.getMobileNumber())
                .dateOfBirth(user.getDateOfBirth())
                .profileImageUrl(profileImageUrl)
                .userType(user.getUserType())
                .isEmailVerified(user.getIsEmailVerified())
                .isMobileVerified(user.getIsMobileVerified())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
