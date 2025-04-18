package com.texquest.controller;

import com.texquest.model.*;
import com.texquest.repository.*;
import com.texquest.service.AiGraderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    private ContestParticipationRepository participationRepo;

    @Autowired
    private AiGraderService aiGraderService;

    @PostMapping
    public Submission submitAnswer(@RequestParam Long userId,
                                   @RequestParam Long questionId,
                                   @RequestParam String submittedLatex,
                                   @RequestParam String submittedImageUrl) {
        User user = userRepo.findById(userId).orElse(null);
        Question question = questionRepo.findById(questionId).orElse(null);
        if (user == null || question == null) return null;

        String correctLatex = question.getCorrectLatex();
        String correctImageUrl = question.getImageUrl();

        // Grade the submission
        AiGraderService.GradingResult result = aiGraderService.grade(submittedLatex, submittedImageUrl, correctLatex, correctImageUrl);
        int score = result.score;
        String feedback = result.feedback;

        // Save submission
        Submission submission = new Submission();
        submission.setUser(user);
        submission.setQuestion(question);
        submission.setSubmittedLatex(submittedLatex);
        submission.setSubmittedImageUrl(submittedImageUrl);
        submission.setTimestamp(LocalDateTime.now());
        submission.setScore(score);
        submission.setFeedback(feedback);
        submissionRepo.save(submission);

        // Update contest score
        Contest contest = question.getContest();
        ContestParticipation cp = participationRepo.findByUserAndContest(user, contest);
        if (cp == null) {
            cp = new ContestParticipation(user, contest, score);
        } else {
            cp.setScore(cp.getScore() + score);
        }
        participationRepo.save(cp);

        return submission;
    }

    @GetMapping("/user/{userId}")
    public List<Submission> getUserSubmissions(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        return submissionRepo.findByUser(user);
    }

    @GetMapping("/history")
    public List<Submission> getUserSubmissionsForQuestion(
            @RequestParam Long userId,
            @RequestParam Long questionId
    ) {
        User user = userRepo.findById(userId).orElse(null);
        Question question = questionRepo.findById(questionId).orElse(null);

        if (user == null || question == null) return List.of();
        return submissionRepo.findByUserAndQuestionOrderByTimestampDesc(user, question);
    }
}
