package com.fitness.userservice.dto;


import com.fitness.userservice.model.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class UserResponse {


    private String id;
    private String email;
    private String password;

    private String firstName;

    private String lastname;

    private UserRole role= UserRole.USER;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
