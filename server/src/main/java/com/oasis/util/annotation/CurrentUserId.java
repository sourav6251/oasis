package com.oasis.util.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to inject the current authenticated user's ID into controller
 * method parameters.
 * 
 * Usage:
 * @GetMapping("/profile")
 * public ResponseEntity<?> getProfile(@CurrentUserId String userId) {
 * // userId will be automatically extracted from JWT token in cookies/headers
 * return ResponseEntity.ok(userService.getProfileById(userId));
 * }
 */
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface CurrentUserId {
}
