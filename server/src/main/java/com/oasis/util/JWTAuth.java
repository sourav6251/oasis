package com.oasis.util;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Log4j2
public class JWTAuth extends OncePerRequestFilter {

    private final JWTCreate jwtCreate;
    private final UserDetailsService userDetailsService;

    public JWTAuth(JWTCreate jwtCreate, UserDetailsService userDetailsService) {
        this.jwtCreate = jwtCreate;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        // 🎯 Public endpoints
        boolean isPublicEndpoint = path.startsWith("/auth/") || path.startsWith("/public/");

        // 🎯 Preflight requests
        boolean isPreflight = "OPTIONS".equalsIgnoreCase(method);

        boolean shouldSkip = isPublicEndpoint || isPreflight;

        // 🔍 DEBUG: Log the decision process
        log.debug("🎯 JWTAuth Skip Decision:");
        log.debug("   📍 Path: {}", path);
        log.debug("   🛠️ Method: {}", method);
        log.debug("   🚪 Public Endpoint: {}", isPublicEndpoint);
        log.debug("   ✈️ Preflight: {}", isPreflight);
        log.debug("   ✅ Skip JWTAuth: {}", shouldSkip);

        return shouldSkip;
    }

    /**
     * 🛡️ PROCESS HTTP REQUESTS
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getServletPath();
        String method = request.getMethod();

        log.info("🛡️ JWTAuth Processing HTTP Request: {} {}", method, path);
        logRequestDetails(request);

        try {
            // 🔐 1. Extract JWT Token
            String token = extractJwtToken(request);

            if (token != null) {
                // ✅ 2. Authenticate HTTP Request
                authenticateHttpRequest(token);
                log.info("✅ JWTAuth SUCCESS - User authenticated for: {} {}", method, path);
            } else {
                log.warn("⚠️ JWTAuth NO TOKEN - Proceeding anonymously for: {} {}", method, path);
            }

            // ➡️ 3. Continue to HTTP Controller
            filterChain.doFilter(request, response);
            log.debug("✅ JWTAuth Completed - Request forwarded to controller");

        } catch (ExpiredJwtException e) {
            handleError(response, "Token expired", HttpServletResponse.SC_UNAUTHORIZED, e);
        } catch (UsernameNotFoundException e) {
            handleError(response, "User not found", HttpServletResponse.SC_BAD_REQUEST, e);
        } catch (Exception e) {
            handleError(response, "Authentication failed", HttpServletResponse.SC_UNAUTHORIZED, e);
        }
    }

    /**
     * 🔐 EXTRACT JWT TOKEN FROM HTTP REQUEST
     */
    private String extractJwtToken(HttpServletRequest request) {
        String token = null;

        // 1. Try Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            log.debug("🔑 Token from Authorization header: PRESENT ({} chars)", token.length());
        } else {
            log.debug("🔑 Token from Authorization header: NULL");
        }

        // 2. Try cookies if no header token
        if (token == null) {
            token = jwtCreate.extractTokenFromCookies(request.getCookies());
            log.debug("🍪 Token from cookies: {}", token != null ? "PRESENT" : "NULL");
        }

        return token;
    }

    /**
     * ✅ AUTHENTICATE HTTP REQUEST WITH JWT TOKEN
     */
    private void authenticateHttpRequest(String token) {
        log.debug("🔐 Validating JWT token for HTTP request...");

        // Validate token
        jwtCreate.validateToken(token);

        // Extract username
        String username = jwtCreate.extractUserName(token);
        log.debug("👤 Token validated for user: {}", username);

        // Load user details
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // Create authentication
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());

        // Set security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        log.debug("✅ HTTP User authenticated: {} with roles: {}",
                username, userDetails.getAuthorities());
    }

    /**
     * 📊 LOG REQUEST DETAILS FOR DEBUGGING
     */
    private void logRequestDetails(HttpServletRequest request) {
        log.debug("📨 HTTP Request Details:");
        log.debug("   🌐 URL: {} {}", request.getMethod(), request.getRequestURL());
        log.debug("   ❓ Query: {}", request.getQueryString());
        log.debug("   📝 Content-Type: {}", request.getContentType());
        log.debug("   📍 Origin: {}", request.getHeader("Origin"));
        log.debug("   👤 User-Agent: {}", request.getHeader("User-Agent"));
        log.debug("   🎯 Authorization Header: {}",
                request.getHeader("Authorization") != null ? "PRESENT" : "NULL");
    }

    /**
     * 🚨 HANDLE AUTHENTICATION ERRORS
     */
    private void handleError(HttpServletResponse response, String message,
            int statusCode, Exception e) throws IOException {
        log.error("❌ JWTAuth FAILED - Status: {}, Message: {}, Error: {}",
                statusCode, message, e.getMessage());

        response.setStatus(statusCode);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String jsonResponse = String.format(
                "{\"error\": \"%s\", \"message\": \"%s\", \"status\": %d}",
                e.getClass().getSimpleName(), message, statusCode);

        response.getWriter().write(jsonResponse);
    }
}
