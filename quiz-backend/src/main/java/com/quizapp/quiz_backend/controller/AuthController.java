package com.quizapp.quiz_backend.controller;

// AuthResponse is handled via responses; no direct import needed here
import com.quizapp.quiz_backend.dto.LoginRequest;
import com.quizapp.quiz_backend.dto.RegisterRequest;
import com.quizapp.quiz_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(authService.register(request));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        logger.info("Login attempt for email: {}", request.getEmail());
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (RuntimeException e) {
            logger.error("Login failed for email: {}", request.getEmail(), e);
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }
}
