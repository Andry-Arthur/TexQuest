package com.texquest.repository;

import com.texquest.model.Contest;
import com.texquest.model.ContestParticipation;
import com.texquest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContestParticipationRepository extends JpaRepository<ContestParticipation, Long> {

    // Find one record for a given user + contest
    ContestParticipation findByUserAndContest(User user, Contest contest);

    // Get all participants for a contest (useful for leaderboard)
    List<ContestParticipation> findByContestOrderByScoreDesc(Contest contest);
}
