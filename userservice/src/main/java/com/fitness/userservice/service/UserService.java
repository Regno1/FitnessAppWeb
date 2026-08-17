package com.fitness.userservice.service;


import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.User;
import com.fitness.userservice.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public @Nullable UserResponse register(@Valid RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            User existingUser= userRepository.findByEmail(request.getEmail());
            UserResponse userResponse= new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeycloakId(existingUser.getKeycloakId());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastname(existingUser.getLastname());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());
            return userResponse;  // was missing — caused fall-through to duplicate save
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setKeycloakId(request.getKeycloakId());
        user.setFirstName(request.getFirstName());
        user.setLastname(request.getLastName());
        User savedUser= userRepository.save(user);


        UserResponse userResponse= new UserResponse();
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setId(savedUser.getId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastname(savedUser.getLastname());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());
        return userResponse;
    }


    public @Nullable UserResponse getUserProfile(String userId) {
      User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("USer not found"));

        UserResponse userResponse= new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setEmail(user.getEmail());
        userResponse.setPassword(user.getPassword());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastname(user.getLastname());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        return userResponse;
     }

    public @Nullable Boolean existsByUserId(String userId) {
    log.info("Calling User Validation Api for userID:{}",userId);
        return userRepository.existsByKeycloakId(userId);
    }
}
