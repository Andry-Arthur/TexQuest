package com.texquest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Question question;

    private String submittedLatex;

    private boolean isCorrect;

    private String submittedImageUrl;

    private double score;

    @Column(columnDefinition = "TEXT")
    private String feedback;

    @Column
    private LocalDateTime timestamp;

    // Constructors
    public Submission() {}
    public Submission(User user, Question question, String submittedLatex, boolean isCorrect, LocalDateTime submittedAt) {
        this.user = user;
        this.question = question;
        this.submittedLatex = submittedLatex;
        this.isCorrect = isCorrect;
        this.submittedAt = submittedAt;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getSubmittedLatex() { return submittedLatex; }
    public void setSubmittedLatex(String submittedLatex) { this.submittedLatex = submittedLatex; }

    public String getSubmittedImageUrl() {
        return submittedImageUrl;
    }

    public void setSubmittedImageUrl(String submittedImageUrl) {
        this.submittedImageUrl = submittedImageUrl;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public boolean isCorrect() { return isCorrect; }
    public void setCorrect(boolean correct) { isCorrect = correct; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Submission{id=" + id + ", user=" + user + ", question=" + question + ", latex='" + submittedLatex + "', correct=" + isCorrect + ", submittedAt=" + submittedAt + "}";
    }
}