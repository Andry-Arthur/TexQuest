package com.texquest.repository;

import com.texquest.model.Contest;
import com.texquest.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByContest(Contest contest);
}
