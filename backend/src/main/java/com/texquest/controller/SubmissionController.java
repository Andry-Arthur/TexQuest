package com.texquest.controller;

import com.texquest.model.*;
import com.texquest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.texquest.repository.QuestionRepository;
import com.texquest.repository.SubmissionRepository;
import com.texquest.repository.ContestParticipationRepository;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/submit")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ContestRepository contestRepo;

    @Autowired
    private ContestParticipationRepository participationRepo;

    @PostMapping
    public Submission submitAnswer(@RequestParam Long userId,
                                   @RequestParam Long questionId,
                                   @RequestParam String latex) {
        User user = userRepo.findById(userId).orElse(null);
        Question question = questionRepo.findById(questionId).orElse(null);
        if (user == null || question == null) return null;

        boolean isCorrect = latex.trim().equals(question.getCorrectLatex().trim());

        Submission submission = new Submission(user, question, latex, isCorrect, LocalDateTime.now());
        submissionRepo.save(submission);

        if (isCorrect) {
            Contest contest = contestRepo.findTopByOrderByStartTimeDesc();
            ContestParticipation participation = participationRepo.findByUserAndContest(user, contest);

            if (participation == null) {
                participation = new ContestParticipation(user, contest);
            }

            participation.setScore(participation.getScore() + 1);
            participationRepo.save(participation);
        }

        return submission;
    }

    @GetMapping("/user/{userId}")
    public List<Submission> getUserSubmissions(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        return submissionRepo.findByUser(user);
    }
}