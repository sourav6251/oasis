package com.oasis.util;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JWTCreate {

    /**
     * <li> generate token</li>
     * <li>validate</li>
     * <li>Extract Token</li>
     * retrieve username
     * retrieve user ID
     */

    @Value("${jwt.secret}")
    private String secret;
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public void validateToken(String token) throws JwtException {
        Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        return  Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 30L *24*60 * 60 * 1000)) // 1 hour
                .signWith(secretKey)
                .compact();
    }

    public String extractTokenFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }


    public String extractTokenFromCookies(Cookie[] cookies) {
        if (cookies != null) {
            return Arrays.stream(cookies)
                    .filter(cookie -> "AccessToken".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);

        }
        return null;
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Object extractClaimByKey(String token, String claimKey) {
        Claims claims = extractAllClaims(token);
        return claims.get(claimKey);
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = extractClaim(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    // Add this method to your JWTCreate class
    public String extractUserId(String token) {
        return extractUserName(token); // Assuming subject is user ID
    }

}

