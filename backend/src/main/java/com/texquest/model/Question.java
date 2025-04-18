package com.texquest.model;

import jakarta.persistence.*;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String imageUrl;

    @Column(length = 5000)
    private String correctLatex;

    @ManyToOne
    private Contest contest;

    public Question() {}

    public Question(String description, String imageUrl, String correctLatex, Contest contest) {
        this.description = description;
        this.imageUrl = imageUrl;
        this.correctLatex = correctLatex;
        this.contest = contest;
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCorrectLatex() { return correctLatex; }
    public void setCorrectLatex(String correctLatex) { this.correctLatex = correctLatex; }

    public Contest getContest() { return contest; }
    public void setContest(Contest contest) { this.contest = contest; }
}
