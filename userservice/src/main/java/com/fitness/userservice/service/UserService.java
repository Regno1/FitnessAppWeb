package com.fitness.userservice.service;

import com.fitness.userservice.dto.AuthResponse;
import com.fitness.userservice.dto.LoginRequest;
import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.model.UserRole;
import com.fitness.userservice.repository.UserRepository;
import com.fitness.userservice.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already registered: " + request.getEmail());
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(UserRole.USER);

        User savedUser = userRepository.save(user);
        log.info("New user registered: id={} email={}", savedUser.getId(), savedUser.getEmail());

        String token = generateToken(savedUser);
        return buildAuthResponse(savedUser, token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (user.getRole() == null) {
            user.setRole(UserRole.USER);
            user = userRepository.save(user);
        }

        log.info("User logged in: id={} email={}", user.getId(), user.getEmail());
        String token = generateToken(user);
        return buildAuthResponse(user, token);
    }

    public UserResponse getUserProfile(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        return toUserResponse(user);
    }

    public boolean existsByUserId(String userId) {
        log.info("Validating user existence for id={}", userId);
        return userRepository.existsById(userId);
    }

    private String generateToken(User user) {
        Map<String, Object> claims = Map.of(
                "email", user.getEmail(),
                "role", resolveRole(user).name(),
                "firstName", user.getFirstName() != null ? user.getFirstName() : ""
        );
        return jwtService.generateToken(user.getId(), claims);
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(resolveRole(user))
                .build();
    }

    private UserResponse toUserResponse(User user) {
        UserResponse r = new UserResponse();
        r.setId(user.getId());
        r.setEmail(user.getEmail());
        r.setFirstName(user.getFirstName());
        r.setLastName(user.getLastName());
        r.setRole(resolveRole(user));
        r.setCreatedAt(user.getCreatedAt());
        r.setUpdatedAt(user.getUpdatedAt());
        return r;
    }

    private UserRole resolveRole(User user) {
        return user.getRole() != null ? user.getRole() : UserRole.USER;
    }
}