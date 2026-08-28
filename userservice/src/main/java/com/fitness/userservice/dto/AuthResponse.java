package com.fitness.userservice.dto;

import com.fitness.userservice.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}
