package com.fitness.aiservice.service;

import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.repository.RecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final RecommendationRepository recommendationRepository;

    public @Nullable List<Recommendation> getUserRecommendationsByUserId(String userId) {
    return recommendationRepository.findByUserId(userId);
    }

    public @Nullable Recommendation getRecommendationByActivityId(String activityId) {

    return recommendationRepository.findByActivityId(activityId)
            .orElseThrow(()-> new RuntimeException("Activity not found"));
    }
}
