package com.texquest.repository;

import com.texquest.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContestRepository extends JpaRepository<Contest, Long> {
    Contest findTopByOrderByStartTimeDesc();  // Get latest contest
}