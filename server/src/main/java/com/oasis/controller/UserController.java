package com.oasis.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok("Test Backend");
    }
}
