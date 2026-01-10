package com.oasis.dto;

import com.oasis.util.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileResponse {

    private String userId;
    private String email;
    private String fullName;
    private String mobileNumber;
    private LocalDate dateOfBirth;
    private String profileImageUrl;

    private UserType userType;
    private Boolean isEmailVerified;
    private Boolean isMobileVerified;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
