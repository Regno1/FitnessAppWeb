package com.fitness.gateway.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final WebClient userServiceWebClient;

    public Mono<Boolean> validateClient(String userId) {
        log.info("Calling User Validation Api for userID:{}", userId);

        return userServiceWebClient.get()
                .uri("/api/user/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                        log.warn("User not found: {}", userId);
                        return Mono.just(false);
                    }
                    log.error("User service error during validation: {}", e.getMessage());
                    return Mono.error(new RuntimeException("User service error: " + e.getMessage()));
                });
    }

    public Mono<UserResponse> registerUser(RegisterRequest registerRequest) {
        log.info("Calling User Registration Api for email:{}", registerRequest.getEmail());

        return userServiceWebClient.post()
                .uri("/api/user/register")
                .bodyValue(registerRequest)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class, e -> {
                    log.error("User service error during registration: {}", e.getMessage());
                    return Mono.error(new RuntimeException("User registration failed: " + e.getMessage()));
                });
    }
}
