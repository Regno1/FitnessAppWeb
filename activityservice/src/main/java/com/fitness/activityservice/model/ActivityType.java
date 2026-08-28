package com.fitness.activityservice.model;

public enum ActivityType {
    RUNNING,
    WALKING,
    CYCLING,
    SWIMMING,
    WEIGHT_TRAINING,
    YOGA,
    HIIT,
    PILATES,
    HIKING,
    DANCING,
    SPORTS,
    // Legacy values kept for backward compatibility
    HIKE,
    CARDIO,
    STRETCHING,
    STREACHING,  // kept to avoid breaking existing MongoDB data
    OTHER
}
