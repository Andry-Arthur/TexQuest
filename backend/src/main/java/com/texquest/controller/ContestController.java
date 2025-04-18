package com.texquest.controller;

import com.texquest.model.Contest;
import com.texquest.model.ContestParticipation;
import com.texquest.model.Submission;
import com.texquest.model.User;
import com.texquest.repository.ContestParticipationRepository;
import com.texquest.repository.ContestRepository;
import com.texquest.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contest")
public class ContestController {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private SubmissionRepository submissionRepo;

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
    public List<LeaderboardEntry> getLeaderboard(@RequestParam Long contestId) {
        Contest contest = contestRepository.findById(contestId).orElse(null);
        if (contest == null) return List.of();

        List<Submission> submissions = submissionRepo.findByQuestion_Contest(contest);

        // Map<QuestionId, Map<UserId, Submission>> => best score per user per question
        Map<Long, Map<Long, Submission>> bestSubmissions = new HashMap<>();

        for (Submission s : submissions) {
            long qid = s.getQuestion().getId();
            long uid = s.getUser().getId();

            bestSubmissions
                    .computeIfAbsent(qid, k -> new HashMap<>())
                    .merge(uid, s, (existing, incoming) -> {
                        if (incoming.getScore() > existing.getScore()) return incoming;
                        if (incoming.getScore() == existing.getScore()) {
                            return incoming.getTimestamp().isBefore(existing.getTimestamp()) ? incoming : existing;
                        }
                        return existing;
                    });
        }

        // Aggregate per user and find the latest of their best timestamps (for tiebreak)
        Map<User, List<Submission>> grouped = new HashMap<>();
        for (Map<Long, Submission> map : bestSubmissions.values()) {
            for (Submission s : map.values()) {
                grouped.computeIfAbsent(s.getUser(), k -> new ArrayList<>()).add(s);
            }
        }

        return grouped.entrySet().stream()
                .map(e -> {
                    double totalScore = e.getValue().stream().mapToDouble(Submission::getScore).sum();
                    LocalDateTime earliestBestTime = e.getValue().stream()
                            .map(Submission::getTimestamp)
                            .min(LocalDateTime::compareTo)
                            .orElse(LocalDateTime.MAX);
                    return new LeaderboardEntry(e.getKey(), totalScore, earliestBestTime);
                })
                .sorted((a, b) -> {
                    int cmp = Double.compare(b.score(), a.score());
                    if (cmp == 0) {
                        return a.timestamp().compareTo(b.timestamp()); // earlier comes first
                    }
                    return cmp;
                })
                .toList();
    }

    public record LeaderboardEntry(User user, double score, LocalDateTime timestamp) {}

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

    @GetMapping("/all-flat")
    public List<Contest> getAllContestsFlat() {
        return contestRepository.findAll();
    }
}
