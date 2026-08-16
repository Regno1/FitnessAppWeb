package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAiService {
    private final GeminiService geminiService;
    private final RecommendationRepository recommendationRepository;
    private final ObjectMapper objectMapper;

    public Recommendation  generateRecomendation(Activity activity){
        String prompt= createPromptForActivity(activity);
        String aiResponse= geminiService.getAnswer(prompt);
        log.info("Response From Ai: {}", aiResponse);

        try {
            Recommendation recommendation=objectMapper.readValue(aiResponse,Recommendation.class);
            recommendation.setActivityId(activity.getId());
            recommendation.setUserId(activity.getUserId());
            recommendation.setActivityType(activity.getType());
            return recommendationRepository.save(recommendation);
        }catch (Exception e) {
            log.error("Error passing Ai recommendation", e);
            throw new RuntimeException("Failed to process Ai Recommendation");
        }
    }


    private String createPromptForActivity(Activity activity){
         return String.format("""
                          Analyze this fitness activity and give personalized, actionable advice.
                         
                                 Type:%s Duration:%dm Calories:%d Metrics:%s
                         
                                 Return ONLY valid JSON:
                                 {
                                   "analysis":{"overall":"","pace":"","heartRate":"","caloriesBurned":""},
                                   "improvements":[{"area":"","recommendation":""}],
                                   "suggestions":[{"workout":"","description":""}],
                                   "safety":["",""]
                                 }
                         
                                 Be concise, accurate, metric-based, and practical. Do not invent missing data.
                 """,
                 activity.getType(),
                 activity.getDuration(),
                 activity.getCaloriesBurned(),
                 activity.getAdditionalMatrics()
         );
    }
}
