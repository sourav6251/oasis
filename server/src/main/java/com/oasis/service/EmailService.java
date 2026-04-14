package com.oasis.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@Log4j2
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${mail.id}")
    private String fromEmail;

    private static final String OTP_TEMPLATE_PATH = "templates/otp-email.html";

    /**
     * Send OTP email to user
     *
     * @param toEmail         Recipient email address
     * @param userName        Name of the user
     * @param otpCode         The OTP code to send
     * @param validityMinutes How long the OTP is valid (in minutes)
     * @return true if email sent successfully, false otherwise
     */
    public boolean sendOtpEmail(String toEmail, String userName, String otpCode, int validityMinutes) {
        try {
            log.info("📧 Preparing to send OTP email to: {}", toEmail);

            // Load HTML template
            String htmlContent = loadEmailTemplate();

            // Replace placeholders with actual values
            htmlContent = htmlContent.replace("{{USER_NAME}}", userName != null ? userName : "User");
            htmlContent = htmlContent.replace("{{OTP_CODE}}", otpCode);
            htmlContent = htmlContent.replace("{{VALIDITY_MINUTES}}", String.valueOf(validityMinutes));

            // Create and send email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("🔐 Your OTP Code - Oasis Verification");
            helper.setText(htmlContent, true); // true = HTML email

            mailSender.send(message);

            log.info("✅ OTP email sent successfully to: {}", toEmail);
            return true;

        } catch (MessagingException e) {
            log.error("❌ Failed to send OTP email to: {} - MessagingException: {}", toEmail, e.getMessage());
            return false;
        } catch (IOException e) {
            log.error("❌ Failed to load email template: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            log.error("❌ Unexpected error while sending OTP email to: {} - Error: {}", toEmail, e.getMessage());
            return false;
        }
    }

    /**
     * Send OTP email with default validity of 10 minutes
     */
    public boolean sendOtpEmail(String toEmail, String userName, String otpCode) {
        return sendOtpEmail(toEmail, userName, otpCode, 10);
    }

    /**
     * Load HTML email template from resources
     */
    private String loadEmailTemplate() throws IOException {
        try {
            // Try to load from classpath (works in JAR and IDE)
            ClassPathResource resource = new ClassPathResource(OTP_TEMPLATE_PATH);
            byte[] bytes = Files.readAllBytes(Paths.get(resource.getURI()));
            log.debug("📄 Email template loaded successfully from classpath");
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("❌ Failed to load email template from: {}", OTP_TEMPLATE_PATH);
            throw e;
        }
    }

    /**
     * Send a simple text OTP email (fallback if HTML fails)
     */
    public boolean sendSimpleOtpEmail(String toEmail, String userName, String otpCode, int validityMinutes) {
        try {
            log.info("📧 Sending simple text OTP email to: {}", toEmail);

            String textContent = String.format(
                    "Hello %s,\n\n" +
                            "Your OTP code is: %s\n\n" +
                            "This code is valid for %d minutes.\n\n" +
                            "If you didn't request this code, please ignore this email.\n\n" +
                            "Best regards,\n" +
                            "Oasis Team",
                    userName != null ? userName : "User",
                    otpCode,
                    validityMinutes);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Your OTP Code - Oasis Verification");
            helper.setText(textContent, false); // false = plain text

            mailSender.send(message);

            log.info("✅ Simple OTP email sent successfully to: {}", toEmail);
            return true;

        } catch (Exception e) {
            log.error("❌ Failed to send simple OTP email to: {} - Error: {}", toEmail, e.getMessage());
            return false;
        }
    }
}
