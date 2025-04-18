package com.texquest.controller;

import com.texquest.model.User;
import com.texquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        User existing = userRepo.findByEmail(loginUser.getEmail());
        if (existing != null && existing.getPassword().equals(loginUser.getPassword())) {
            return existing;
        }
        return null;
    }
}
