package com.fitness.activityservice.model;

import lombok.*;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.annotation.processing.Generated;
import java.time.LocalDateTime;
import java.util.Map;

@Document(collection= "activities")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Activity {

    @Id
    private String id;

    private String userId;
    private ActivityType type;
    private Integer duration;
    private Integer caloriesBurned;
    private LocalDateTime startTime;
    @Field("metrics")
    private Map<String,Object> additionalMatrics;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
