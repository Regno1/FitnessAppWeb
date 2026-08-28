package com.fitness.userservice;

import com.fitness.userservice.dto.AuthResponse;
import com.fitness.userservice.dto.LoginRequest;
import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.model.UserRole;
import com.fitness.userservice.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class UserServiceAuthTests {

    @Autowired
    private UserService userService;

    @Test
    void registerThenLoginReturnsJwtAndUserDetails() {
        String email = "login-test-" + System.nanoTime() + "@example.com";
        String password = "secret123";

        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail(email);
        registerRequest.setPassword(password);
        registerRequest.setFirstName("Login");
        registerRequest.setLastName("Test");

        AuthResponse registered = userService.register(registerRequest);

        assertThat(registered.getToken()).isNotBlank();
        assertThat(registered.getId()).isNotBlank();
        assertThat(registered.getEmail()).isEqualTo(email);
        assertThat(registered.getRole()).isEqualTo(UserRole.USER);

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        AuthResponse loggedIn = userService.login(loginRequest);

        assertThat(loggedIn.getToken()).isNotBlank();
        assertThat(loggedIn.getId()).isEqualTo(registered.getId());
        assertThat(loggedIn.getEmail()).isEqualTo(email);
        assertThat(loggedIn.getRole()).isEqualTo(UserRole.USER);
    }
}