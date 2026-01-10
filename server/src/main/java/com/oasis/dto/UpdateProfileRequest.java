package com.oasis.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {

    private String fullName;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid mobile number format")
    private String mobileNumber;

    private LocalDate dateOfBirth;

    // Profile image URL is handled separately via file upload endpoint
}
