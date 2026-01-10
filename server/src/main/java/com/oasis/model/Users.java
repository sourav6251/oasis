package com.oasis.model;



import com.oasis.util.enums.AuthProvider;
import com.oasis.util.enums.LoginMethod;
import com.oasis.util.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String mobileNumber;

    @Column(unique = true)
    private String email;

    @JsonIgnore
    @ToString.Exclude
    private String password;

    // OTP verification fields
    @Builder.Default
    private Boolean isMobileVerified = false;

    @Builder.Default
    private Boolean isEmailVerified = false;

    // OAuth2 fields
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AuthProvider authProvider = AuthProvider.LOCAL;

    private String providerId; // Google ID, Facebook ID, etc.

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;

    private String fullName;
    private LocalDate dateOfBirth;

    // Profile picture - can be from OAuth or uploaded
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "profile_picture_file_id")
    @JsonIgnore
    @ToString.Exclude
    private FileStorage profilePictureFile;

    @Builder.Default
    private Boolean isVerified = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private LoginMethod loginMethod;

}
