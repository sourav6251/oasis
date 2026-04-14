package com.oasis.util.resolver;

import com.oasis.repository.UsersRepo;
import com.oasis.util.JWTCreate;
import com.oasis.util.annotation.CurrentUserId;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * Resolver to extract current user ID from JWT token in cookies or
 * Authorization header
 */
@Component
@Log4j2
public class CurrentUserIdResolver implements HandlerMethodArgumentResolver {

    @Autowired
    private JWTCreate jwtCreate;

    @Autowired
    private UsersRepo usersRepo;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterAnnotation(CurrentUserId.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter,
            ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest,
            WebDataBinderFactory binderFactory) throws Exception {

        // Try to get user ID from SecurityContext first (most reliable)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !"anonymousUser".equals(authentication.getPrincipal())) {

            String email = authentication.getName();
            log.debug("🔍 Extracting user ID from SecurityContext for: {}", email);

            return usersRepo.findByEmail(email)
                    .map(user -> {
                        log.debug("✅ User ID extracted: {}", user.getId());
                        return user.getId();
                    })
                    .orElseThrow(() -> {
                        log.error("❌ User not found in database: {}", email);
                        return new RuntimeException("User not found");
                    });
        }

        // Fallback: Extract from JWT token directly
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        if (request == null) {
            log.error("❌ HttpServletRequest is null");
            throw new RuntimeException("Unable to extract user ID");
        }

        String token = extractToken(request);

        if (token == null) {
            log.error("❌ No JWT token found in request");
            throw new RuntimeException("User not authenticated");
        }

        try {
            // Validate and extract user email from token
            jwtCreate.validateToken(token);
            String email = jwtCreate.extractUserName(token);

            log.debug("🔍 Extracting user ID from JWT for: {}", email);

            return usersRepo.findByEmail(email)
                    .map(user -> {
                        log.debug("✅ User ID extracted from JWT: {}", user.getId());
                        return user.getId();
                    })
                    .orElseThrow(() -> {
                        log.error("❌ User not found: {}", email);
                        return new RuntimeException("User not found");
                    });

        } catch (Exception e) {
            log.error("❌ Failed to extract user ID: {}", e.getMessage());
            throw new RuntimeException("Failed to authenticate user: " + e.getMessage());
        }
    }

    /**
     * Extract JWT token from request (tries Authorization header, then cookies)
     */
    private String extractToken(HttpServletRequest request) {
        // 1. Try Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            log.debug("🔑 Token found in Authorization header");
            return token;
        }

        // 2. Try cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("AccessToken".equalsIgnoreCase(cookie.getName())) {
                    log.debug("🍪 Token found in cookies");
                    return cookie.getValue();
                }
            }
        }

        log.debug("⚠️ No token found in request");
        return null;
    }
}
