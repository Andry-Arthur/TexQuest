package com.texquest.controller;

import com.texquest.model.User;
import com.texquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = userRepo.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            // ✅ only return safe fields
            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> userData) {
        String name = userData.get("name");
        String email = userData.get("email");
        String password = userData.get("password");

        // Check if email is already registered
        if (userRepo.findByEmail(email) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already in use.");
        }

        // Create and save new user
        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password);

        User saved = userRepo.save(newUser);

        // Return limited fields
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "id", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail()
        ));
    }

}
