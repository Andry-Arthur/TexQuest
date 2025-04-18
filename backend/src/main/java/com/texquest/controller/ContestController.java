package com.texquest.controller;

import com.texquest.model.Contest;
import com.texquest.model.ContestParticipation;
import com.texquest.repository.ContestParticipationRepository;
import com.texquest.repository.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contest")
public class ContestController {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private ContestParticipationRepository participationRepository;

    @PostMapping
    public Contest createContest(@RequestBody Contest contest) {
        contest.setActive(false); // not active until started
        return contestRepository.save(contest);
    }

    @PostMapping("/start")
    public Contest startContest() {
        Contest contest = new Contest();
        contest.setName("Untitled Contest"); // or fetch from request later
        contest.setDescription("No description yet");
        contest.setStartTime(LocalDateTime.now());
        contest.setEndTime(null);
        contest.setActive(true);
        return contestRepository.save(contest);
    }

    // ✅ End the latest contest
    @PostMapping("/end")
    public Contest endContest() {
        Contest latest = contestRepository.findTopByOrderByStartTimeDesc();
        if (latest != null && latest.isActive()) {
            latest.setEndTime(LocalDateTime.now());
            latest.setActive(false);
            return contestRepository.save(latest);
        }
        return null;
    }

    // ✅ Check if current contest is active
    @GetMapping("/active")
    public boolean isContestActive() {
        Contest latest = contestRepository.findTopByOrderByStartTimeDesc();
        return latest != null && latest.isActive();
    }

    // ✅ Get the latest contest info
    @GetMapping("/latest")
    public Contest getLatestContest() {
        return contestRepository.findTopByOrderByStartTimeDesc();
    }

    // ✅ Get leaderboard for a specific contest
    @GetMapping("/leaderboard")
    public List<ContestParticipation> getLeaderboard(@RequestParam Long contestId) {
        Contest contest = contestRepository.findById(contestId).orElse(null);
        if (contest == null) return List.of();
        return participationRepository.findByContestOrderByScoreDesc(contest);
    }

    @GetMapping("/all")
    public Map<String, List<Contest>> getAllContests() {
        List<Contest> all = contestRepository.findAll();
        LocalDateTime now = LocalDateTime.now();

        Map<String, List<Contest>> grouped = new HashMap<>();
        grouped.put("ongoing", new ArrayList<>());
        grouped.put("upcoming", new ArrayList<>());
        grouped.put("past", new ArrayList<>());

        for (Contest c : all) {
            if (c.isActive()) {
                grouped.get("ongoing").add(c);
            } else if (c.getStartTime().isAfter(now)) {
                grouped.get("upcoming").add(c);
            } else {
                grouped.get("past").add(c);
            }
        }

        return grouped;
    }
}
