package com.texquest.repository;

import com.texquest.model.Submission;
import com.texquest.model.User;
import com.texquest.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUser(User user);
    List<Submission> findByQuestion(Question question);
    List<Submission> findByUserAndQuestionOrderByTimestampDesc(User user, Question question);
    List<Submission> findByQuestion_Contest(com.texquest.model.Contest contest);
}