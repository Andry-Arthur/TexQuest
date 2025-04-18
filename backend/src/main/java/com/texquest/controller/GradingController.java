package com.texquest.controller;

import com.texquest.model.*;
import com.texquest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/grade")
public class GradingController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ContestParticipationRepository participationRepo;

    @Autowired
    private SubmissionRepository submissionRepo;

    @PostMapping
    public Submission gradeSubmission(@RequestBody Map<String, String> body) {
        Long userId = Long.parseLong(body.get("userId"));
        Long questionId = Long.parseLong(body.get("questionId"));
        String latex = body.get("submittedLatex");
        String imageUrl = body.get("submittedImageUrl");

        User user = userRepo.findById(userId).orElse(null);
        Question question = questionRepo.findById(questionId).orElse(null);
        if (user == null || question == null) return null;

        // 🧠 Placeholder AI grading logic
        double score = gradeWithAI(latex, imageUrl, question.getCorrectLatex(), question.getImageUrl());

        // Save submission
        boolean isCorrect = score == 1.0;
        Submission submission = new Submission(user, question, latex, isCorrect, LocalDateTime.now());
        submission.setSubmittedImageUrl(imageUrl);
        submission.setScore(score);
        submissionRepo.save(submission);

        // Update ContestParticipation score
        Contest contest = question.getContest();
        ContestParticipation cp = participationRepo.findByUserAndContest(user, contest);
        if (cp == null) {
            cp = new ContestParticipation(user, contest, 0);
        }
        cp.setScore(cp.getScore() + score);
        participationRepo.save(cp);

        return submission;
    }

    // Stub grading function — replace with actual AI later
    private double gradeWithAI(String submittedLatex, String submittedImageUrl, String correctLatex, String correctImageUrl) {
        // TODO: Send to external AI service
        if (submittedLatex.trim().equals(correctLatex.trim())) {
            return 1.0;
        }
        return 0.5; // placeholder partial score
    }
}
