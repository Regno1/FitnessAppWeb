package com.fitness.aiservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAiService {

    private final GeminiService geminiService;
    private final RecommendationRepository recommendationRepository;
    private final ObjectMapper objectMapper;

    public Recommendation generateRecommendation(Activity activity) {
        String prompt = createPromptForActivity(activity);
        String aiResponse = geminiService.getAnswer(prompt);
        log.info("Response From AI: {}", aiResponse);

        try {
            // Strip markdown code fences if Gemini wraps the JSON in ```json ... ```
            String cleanJson = aiResponse.trim();
            if (cleanJson.startsWith("```")) {
                cleanJson = cleanJson.replaceAll("^```[a-zA-Z]*\\n?", "").replaceAll("```$", "").trim();
            }

            Recommendation recommendation = objectMapper.readValue(cleanJson, Recommendation.class);
            recommendation.setActivityId(activity.getId());
            recommendation.setUserId(activity.getUserId());
            recommendation.setActivityType(activity.getType());
            return recommendationRepository.save(recommendation);
        } catch (Exception e) {
            log.error("Error parsing AI recommendation response: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to process AI Recommendation", e);
        }
    }

    private String createPromptForActivity(Activity activity) {
        return String.format("""
                Analyze this fitness activity and give personalized, actionable advice.

                Type: %s  Duration: %d minutes  Calories: %d  Additional Metrics: %s

                Return ONLY valid JSON (no markdown, no code fences):
                {
                  "analysis": {"overall": "", "pace": "", "heartRate": "", "caloriesBurned": ""},
                  "improvements": [{"area": "", "recommendation": ""}],
                  "suggestions": [{"workout": "", "description": ""}],
                  "safety": ["", ""]
                }

                Be concise, accurate, metric-based, and practical. Do not invent missing data.
                """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()
        );
    }
}
