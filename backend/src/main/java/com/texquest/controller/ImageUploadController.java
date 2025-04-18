package com.texquest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            String url = "http://localhost:8080/uploads/" + filename;
            return ResponseEntity.ok(url);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Upload failed");
        }
    }
}
