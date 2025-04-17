package com.texquest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private boolean isActive;

    // Constructors
    public Contest() {}
    public Contest(LocalDateTime startTime, LocalDateTime endTime, boolean isActive) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.isActive = isActive;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }

    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    @Override
    public String toString() {
        return "Contest{id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", isActive=" + isActive + "}";
    }
}
