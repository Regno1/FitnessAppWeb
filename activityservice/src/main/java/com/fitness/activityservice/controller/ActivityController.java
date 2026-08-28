package com.fitness.activityservice.controller;

import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivtyResponse;
import com.fitness.activityservice.service.ActivityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@AllArgsConstructor

public class ActivityController {
    @Autowired
    private ActivityService activityService;

    @PostMapping()
    public ResponseEntity<ActivtyResponse>  trackActivty(
            @RequestHeader("X-User-ID") String userId,
            @RequestBody ActivityRequest request
    ){
        request.setUserId(userId);
        return ResponseEntity.ok(activityService.trackActivity(request));
    }

    @GetMapping()
    public ResponseEntity<List<ActivtyResponse>> getUserActivty(@RequestHeader("X-User-ID") String userId){
        return ResponseEntity.ok(activityService.getUserActivity(userId));
    }

    @GetMapping("/{activityId}")
    public ResponseEntity<ActivtyResponse> getActivity(@PathVariable String activityId){
        return ResponseEntity.ok(activityService.getActivityById(activityId));
    }
}
