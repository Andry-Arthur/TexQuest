package com.texquest.model;

import jakarta.persistence.*;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private String imageUrl;

    private String correctLatex;

    // Constructors
    public Question() {}
    public Question(String description, String imageUrl, String correctLatex) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.correctLatex = correctLatex;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCorrectLatex() { return correctLatex; }
    public void setCorrectLatex(String correctLatex) { this.correctLatex = correctLatex; }

    @Override
    public String toString() {
        return "Question{id=" + id + ", description='" + description + "', imageUrl='" + imageUrl + "', correctLatex='" + correctLatex + "'}";
    }
}
