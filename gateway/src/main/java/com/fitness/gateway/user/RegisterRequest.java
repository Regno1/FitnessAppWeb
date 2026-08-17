package com.fitness.gateway.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Email is Required")
    @Email(message = "fix Email format")
    private String email;
    @NotBlank(message = "Password required")
    @Size(min = 6, message = "Password Must have 6 characters")
    private String password;
    private String firstName;
    private String lastName;
    private String keycloakId;

}
