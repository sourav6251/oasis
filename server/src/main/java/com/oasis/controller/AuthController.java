package com.oasis.controller;

import com.oasis.dto.*;
import com.oasis.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Log4j2
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Register a new user with email and password
     * 
     * POST /auth/register
     * 
     * Request Body:
     * {
     * "email": "user@example.com",
     * "password": "password123",
     * "fullName": "John Doe",
     * "mobileNumber": "+1234567890" (optional)
     * }
     * 
     * Response:
     * {
     * "token": "jwt-token",
     * "userId": "user-id",
     * "email": "user@example.com",
     * "fullName": "John Doe",
     * "isEmailVerified": false,
     * "message": "Registration successful! Please check your email for OTP
     * verification."
     * }
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, HttpServletResponse httpResponse) {
        try {
            log.info("📝 Registration request received for: {}", request.getEmail());
            AuthResponse response = authService.register(request);

            // Set JWT token in cookie
            setTokenCookie(httpResponse, response.getToken());
            log.info("🍪 Access token set in cookies for: {}", request.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("❌ Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Login with email and password
     * 
     * POST /auth/login
     * 
     * Request Body:
     * {
     * "email": "user@example.com",
     * "password": "password123"
     * }
     * 
     * Response:
     * {
     * "token": "jwt-token",
     * "userId": "user-id",
     * "email": "user@example.com",
     * "fullName": "John Doe",
     * "isEmailVerified": true,
     * "message": "Login successful!"
     * }
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletResponse httpResponse) {
        try {
            log.info("🔐 Login request received for: {}", request.getEmail());
            AuthResponse response = authService.login(request);

            // Set JWT token in cookie
            setTokenCookie(httpResponse, response.getToken());
            log.info("🍪 Access token set in cookies for: {}", request.getEmail());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Login failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Request OTP for forgot password
     * 
     * POST /auth/forgot-password
     * 
     * Request Body:
     * {
     * "email": "user@example.com"
     * }
     * 
     * Response:
     * {
     * "message": "OTP sent successfully! Please check your email.",
     * "success": true
     * }
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            log.info("🔑 Forgot password request for: {}", request.getEmail());
            MessageResponse response = authService.forgotPassword(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Forgot password failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Verify OTP (for email verification or password reset)
     * 
     * POST /auth/verify-otp
     * 
     * Request Body:
     * {
     * "email": "user@example.com",
     * "otp": "123456"
     * }
     * 
     * Response:
     * {
     * "message": "OTP verified successfully!",
     * "success": true
     * }
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        try {
            log.info("🔍 OTP verification request for: {}", request.getEmail());
            MessageResponse response = authService.verifyOtp(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ OTP verification failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Reset password with verified OTP
     * 
     * POST /auth/reset-password
     * 
     * Request Body:
     * {
     * "email": "user@example.com",
     * "otp": "123456",
     * "newPassword": "newpassword123"
     * }
     * 
     * Response:
     * {
     * "message": "Password reset successfully! You can now login with your new
     * password.",
     * "success": true
     * }
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            log.info("🔄 Reset password request for: {}", request.getEmail());
            MessageResponse response = authService.resetPassword(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Password reset failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Resend OTP for email verification
     * 
     * POST /auth/resend-otp
     * 
     * Request Param: email
     * 
     * Response:
     * {
     * "message": "OTP sent successfully! Please check your email.",
     * "success": true
     * }
     */
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestParam String email) {
        try {
            log.info("📤 Resend OTP request for: {}", email);
            MessageResponse response = authService.resendOtp(email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("❌ Resend OTP failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(e.getMessage(), false));
        }
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<MessageResponse> health() {
        return ResponseEntity.ok(new MessageResponse("Auth service is running", true));
    }

    /**
     * Helper method to set JWT token in HttpOnly secure cookie
     */
    private void setTokenCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie("AccessToken", token);
        cookie.setHttpOnly(true); // Prevent JavaScript access (XSS protection)
        cookie.setSecure(false); // Set to true in production with HTTPS
        cookie.setPath("/"); // Cookie available for entire application
        cookie.setMaxAge(30 * 24 * 60 * 60); // 1 month (same as JWT expiry)
        // cookie.setSameSite("Strict"); // Uncomment for CSRF protection (requires
        // newer servlet API)

        response.addCookie(cookie);
    }
}
