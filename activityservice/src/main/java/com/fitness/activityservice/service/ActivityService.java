package com.fitness.activityservice.service;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivtyResponse;
import com.fitness.activityservice.model.Activity;
import com.fitness.activityservice.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;


    public ActivtyResponse trackActivity(ActivityRequest request) {
        boolean isValidUser= userValidationService.validateClient(request.getUserId());
        if(!isValidUser){
            throw new RuntimeException("Invalid User does  Not exist" + request.getUserId());

        }
        Activity activity = Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMatrics(request.getAdditionalMetrics())
                .build();
        Activity savedActivity = activityRepository.save(activity);


        return mapToResponse(savedActivity);

    }
    private ActivtyResponse mapToResponse(Activity activity){
     ActivtyResponse response= new ActivtyResponse();
     response.setId(activity.getId());
     response.setUserId(activity.getUserId());
     response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMatrics(activity.getAdditionalMatrics());
        response.setCreatedAt(activity.getCreatedAt());
    response.setUpdatedAt(activity.getUpdatedAt());
return response;
    }


    public @Nullable List<ActivtyResponse> getUserActivity(String userId) {
        List<Activity> activities=activityRepository.findByUserId(userId);
        return activities.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public @Nullable ActivtyResponse getActivityById(String activityId) {
    return activityRepository.findById(activityId)
            .map(this::mapToResponse)
            .orElseThrow(()-> new RuntimeException("Activity Not Found" + activityId));

    }
}
