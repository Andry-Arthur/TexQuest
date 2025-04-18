package com.texquest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "contest_participation")
public class ContestParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Contest contest;

    private int score = 0;

    public ContestParticipation() {}

    public ContestParticipation(User user, Contest contest) {
        this.user = user;
        this.contest = contest;
        this.score = 0;
    }

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Contest getContest() { return contest; }
    public int getScore() { return score; }

    public void setScore(int score) { this.score = score; }
}
