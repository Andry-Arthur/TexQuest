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

    private LocalDateTime submittedAt;

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

    public boolean isCorrect() { return isCorrect; }
    public void setCorrect(boolean correct) { isCorrect = correct; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    @Override
    public String toString() {
        return "Submission{id=" + id + ", user=" + user + ", question=" + question + ", latex='" + submittedLatex + "', correct=" + isCorrect + ", submittedAt=" + submittedAt + "}";
    }
}