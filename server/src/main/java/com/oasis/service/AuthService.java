package com.oasis.service;

import com.oasis.dto.*;
import com.oasis.model.Users;
import com.oasis.repository.UsersRepo;
import com.oasis.util.JWTCreate;
import com.oasis.util.enums.AuthProvider;
import com.oasis.util.enums.LoginMethod;
import com.oasis.util.enums.UserType;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Log4j2
public class AuthService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JWTCreate jwtCreate;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // In-memory OTP storage (Consider using Redis in production)
    private final Map<String, OtpData> otpStorage = new HashMap<>();

    private static final int OTP_VALIDITY_MINUTES = 10;
    private static final int OTP_LENGTH = 6;

    /**
     * Register a new user with email and password
     */
    public AuthResponse register(RegisterRequest request) {
        log.info("📝 Registering new user with email: {}", request.getEmail());

        // Check if email already exists
        if (usersRepo.existsByEmail(request.getEmail())) {
            log.warn("⚠️ Email already exists: {}", request.getEmail());
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        Users user = Users.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .mobileNumber(request.getMobileNumber())
                .userType(UserType.USER)
                .authProvider(AuthProvider.LOCAL)
                .loginMethod(LoginMethod.EMAIL_PASSWORD)
                .isEmailVerified(false)
                .isMobileVerified(false)
                .isVerified(true)
                .build();

        Users savedUser = usersRepo.save(user);
        log.info("✅ User registered successfully: {}", savedUser.getEmail());

        // Generate and send OTP for email verification
        String otp = generateOtp();
        storeOtp(savedUser.getEmail(), otp);

        boolean emailSent = emailService.sendOtpEmail(
                savedUser.getEmail(),
                savedUser.getFullName(),
                otp,
                OTP_VALIDITY_MINUTES);

        if (!emailSent) {
            log.warn("⚠️ Failed to send verification email to: {}", savedUser.getEmail());
        }

        // Generate JWT token
        String token = generateToken(savedUser);

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .isEmailVerified(savedUser.getIsEmailVerified())
                .message("Registration successful! Please check your email for OTP verification.")
                .build();
    }

    /**
     * Login with email and password
     */
    public AuthResponse login(LoginRequest request) {
        log.info("🔐 Login attempt for email: {}", request.getEmail());

        // Find user by email
        Users user = usersRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", request.getEmail());
                    return new RuntimeException("Invalid email or password");
                });

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.error("❌ Invalid password for: {}", request.getEmail());
            throw new RuntimeException("Invalid email or password");
        }

        log.info("✅ Login successful for: {}", user.getEmail());

        // Generate JWT token
        String token = generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .isEmailVerified(user.getIsEmailVerified())
                .message("Login successful!")
                .build();
    }

    /**
     * Send OTP for forgot password
     */
    public MessageResponse forgotPassword(ForgotPasswordRequest request) {
        log.info("🔑 Forgot password request for: {}", request.getEmail());

        // Check if user exists
        Users user = usersRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", request.getEmail());
                    return new RuntimeException("Email not registered");
                });

        // Generate and send OTP
        String otp = generateOtp();
        storeOtp(user.getEmail(), otp);

        boolean emailSent = emailService.sendOtpEmail(
                user.getEmail(),
                user.getFullName(),
                otp,
                OTP_VALIDITY_MINUTES);

        if (!emailSent) {
            log.error("❌ Failed to send OTP email to: {}", user.getEmail());
            throw new RuntimeException("Failed to send OTP email");
        }

        log.info("✅ OTP sent successfully to: {}", user.getEmail());

        return new MessageResponse(
                "OTP sent successfully! Please check your email.",
                true);
    }

    /**
     * Verify OTP (for email verification or password reset)
     */
    public MessageResponse verifyOtp(VerifyOtpRequest request) {
        log.info("🔍 Verifying OTP for: {}", request.getEmail());

        // Check if OTP exists and is valid
        OtpData otpData = otpStorage.get(request.getEmail());

        if (otpData == null) {
            log.error("❌ No OTP found for: {}", request.getEmail());
            throw new RuntimeException("OTP not found. Please request a new one.");
        }

        if (otpData.isExpired()) {
            log.error("❌ OTP expired for: {}", request.getEmail());
            otpStorage.remove(request.getEmail());
            throw new RuntimeException("OTP expired. Please request a new one.");
        }

        if (!otpData.getOtp().equals(request.getOtp())) {
            log.error("❌ Invalid OTP for: {}", request.getEmail());

            // Increment attempt count
            otpData.incrementAttempts();

            if (otpData.getAttempts() >= 3) {
                log.warn("⚠️ Max OTP attempts reached for: {}", request.getEmail());
                otpStorage.remove(request.getEmail());
                throw new RuntimeException("Maximum OTP attempts exceeded. Please request a new one.");
            }

            throw new RuntimeException("Invalid OTP. Please try again.");
        }

        // OTP verified successfully
        log.info("✅ OTP verified successfully for: {}", request.getEmail());

        // Update user's email verification status
        Optional<Users> userOpt = usersRepo.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            user.setIsEmailVerified(true);
            usersRepo.save(user);
            log.info("✅ Email verified for user: {}", user.getEmail());
        }

        // Mark OTP as verified but keep it for password reset
        otpData.setVerified(true);

        return new MessageResponse(
                "OTP verified successfully!",
                true);
    }

    /**
     * Reset password with verified OTP
     */
    public MessageResponse resetPassword(ResetPasswordRequest request) {
        log.info("🔄 Resetting password for: {}", request.getEmail());

        // Verify OTP again
        OtpData otpData = otpStorage.get(request.getEmail());

        if (otpData == null || !otpData.isVerified()) {
            log.error("❌ OTP not verified for: {}", request.getEmail());
            throw new RuntimeException("Please verify OTP first");
        }

        if (otpData.isExpired()) {
            log.error("❌ OTP expired for: {}", request.getEmail());
            otpStorage.remove(request.getEmail());
            throw new RuntimeException("OTP expired. Please request a new one.");
        }

        // Find user
        Users user = usersRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", request.getEmail());
                    return new RuntimeException("User not found");
                });

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        usersRepo.save(user);

        // Remove OTP from storage
        otpStorage.remove(request.getEmail());

        log.info("✅ Password reset successfully for: {}", user.getEmail());

        return new MessageResponse(
                "Password reset successfully! You can now login with your new password.",
                true);
    }

    /**
     * Resend OTP for email verification
     */
    public MessageResponse resendOtp(String email) {
        log.info("📤 Resending OTP to: {}", email);

        // Check if user exists
        Users user = usersRepo.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("❌ User not found: {}", email);
                    return new RuntimeException("Email not registered");
                });

        // Generate and send new OTP
        String otp = generateOtp();
        storeOtp(email, otp);

        boolean emailSent = emailService.sendOtpEmail(
                user.getEmail(),
                user.getFullName(),
                otp,
                OTP_VALIDITY_MINUTES);

        if (!emailSent) {
            log.error("❌ Failed to send OTP email to: {}", email);
            throw new RuntimeException("Failed to send OTP email");
        }

        log.info("✅ OTP resent successfully to: {}", email);

        return new MessageResponse(
                "OTP sent successfully! Please check your email.",
                true);
    }

    // ========================= Helper Methods =========================

    /**
     * Generate random 6-digit OTP
     */
    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    /**
     * Store OTP with expiry time
     */
    private void storeOtp(String email, String otp) {
        OtpData otpData = new OtpData(otp, LocalDateTime.now().plusMinutes(OTP_VALIDITY_MINUTES));
        otpStorage.put(email, otpData);
        log.debug("🔐 OTP stored for: {} (expires in {} minutes)", email, OTP_VALIDITY_MINUTES);
    }

    /**
     * Generate JWT token for user
     */
    private String generateToken(Users user) {
        UserDetails userDetails = new User(
            // user.getEmail(),
                user.getId(), // ✅ Fixed: Use user ID instead of email for JWT subject
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getUserType().name())));
        return jwtCreate.generateToken(userDetails);
    }

    // ========================= Inner Class =========================

    /**
     * OTP Data class to store OTP with expiry and attempts
     */
    @lombok.Data
    private static class OtpData {
        private String otp;
        private LocalDateTime expiryTime;
        private int attempts = 0;
        private boolean verified = false;

        public OtpData(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public boolean isExpired() {
            return LocalDateTime.now().isAfter(expiryTime);
        }

        public void incrementAttempts() {
            this.attempts++;
        }
    }
}
