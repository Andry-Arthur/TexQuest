package com.texquest.controller;

import com.texquest.model.Contest;
import com.texquest.model.Question;
import com.texquest.repository.ContestRepository;
import com.texquest.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private ContestRepository contestRepo;

    // ✅ Get all questions for a specific contest
    @GetMapping
    public List<Question> getQuestions(@RequestParam Long contestId) {
        Contest contest = contestRepo.findById(contestId).orElse(null);
        return questionRepo.findByContest(contest);
    }

    // ✅ Add a question to a contest
    @PostMapping
    public Question createQuestion(@RequestParam Long contestId, @RequestBody Question question) {
        Contest contest = contestRepo.findById(contestId).orElse(null);
        question.setContest(contest);
        return questionRepo.save(question);
    }
}
