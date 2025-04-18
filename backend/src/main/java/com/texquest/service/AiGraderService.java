package com.texquest.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AiGraderService {

    private final RestTemplate restTemplate = new RestTemplate();

    public GradingResult grade(String submittedLatex, String submittedImageUrl, String correctLatex, String correctImageUrl) {
        String endpoint = "http://localhost:5000/grade";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> payload = Map.of(
                "submittedLatex", submittedLatex,
                "correctLatex", correctLatex,
                "submittedImageUrl", submittedImageUrl,
                "correctImageUrl", correctImageUrl
        );

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(endpoint, entity, Map.class);
            Map body = response.getBody();

            int score = (int) body.get("score");
            String feedback = (String) body.get("feedback");

            return new GradingResult(score, feedback);
        } catch (Exception e) {
            e.printStackTrace();
            return new GradingResult(0, "AI grading failed.");
        }
    }

    public static class GradingResult {
        public int score;
        public String feedback;

        public GradingResult(int score, String feedback) {
            this.score = score;
            this.feedback = feedback;
        }
    }
}
