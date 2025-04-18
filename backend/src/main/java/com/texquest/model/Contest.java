package com.texquest.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;              // 👈 Add this
    private String description;       // 👈 Add this

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isActive;

    public Contest() {}

    public Contest(String name, String description, LocalDateTime startTime, LocalDateTime endTime, boolean isActive) {
        this.name = name;
        this.description = description;
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

    public String getName() { return name; } // 👈 Add this
    public void setName(String name) { this.name = name; } // 👈 Add this

    public String getDescription() { return description; } // 👈 Add this
    public void setDescription(String description) { this.description = description; } // 👈 Add this

    @Override
    public String toString() {
        return "Contest{id=" + id + ", startTime=" + startTime + ", endTime=" + endTime + ", isActive=" + isActive + "}";
    }
}
