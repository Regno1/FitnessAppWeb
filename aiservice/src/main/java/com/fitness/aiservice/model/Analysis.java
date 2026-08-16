package com.fitness.aiservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Analysis {

    private String overall;
    private String pace;
    private String heartRate;
    private String caloriesBurned;
}
