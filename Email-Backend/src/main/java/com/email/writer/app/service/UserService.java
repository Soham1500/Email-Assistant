package com.email.writer.app.service;

import com.email.writer.app.repository.UserRepository;
import com.email.writer.entity.User;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class UserService {

    private final WebClient.Builder webClientBuilder;
    private final UserRepository userRepository;

    public void saveUserFromClerk(String token) {
        try {
            JsonNode clerkUser = webClientBuilder.build()
                    .get()
                    .uri("https://api.clerk.dev/v1/me")
                    .header("Authorization", "Bearer " + token)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();

            if (clerkUser != null && !clerkUser.isEmpty()) {
                String id = clerkUser.path("id").asText();
                String email = clerkUser.path("primary_email_address").path("email_address").asText();
                String username = clerkUser.path("username").asText();

                if (!userRepository.existsById(id)) {
                    User user = User.builder()
                            .id(id)
                            .email(email)
                            .username(username)
                            .build();
                    userRepository.save(user);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Clerk user fetch failed: " + e.getMessage());
        }
    }
}
