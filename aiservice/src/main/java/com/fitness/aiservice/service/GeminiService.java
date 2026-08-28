package com.fitness.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class GeminiService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = new ObjectMapper();
    }

    public String getAnswer(String question) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of("text", question)
                                )
                        )
                )
        );

        try {
            String apiKey = geminiApiKey.trim();
            String rawResponse = webClient.post()
                    .uri(geminiApiUrl + "?key=" + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            log.debug("Raw Gemini response: {}", rawResponse);
            return extractTextFromResponse(rawResponse);

        } catch (WebClientResponseException e) {
            log.error("Gemini API error - Status: {}, Body: {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Gemini API call failed: " + e.getStatusCode(), e);
        } catch (Exception e) {
            log.error("Unexpected error calling Gemini API: {}", e.getMessage(), e);
            throw new RuntimeException("Gemini API call failed", e);
        }
    }

    /**
     * Gemini response structure:
     * { "candidates": [{ "content": { "parts": [{ "text": "actual answer" }] } }] }
     */
    private String extractTextFromResponse(String rawResponse) {
        try {
            JsonNode root = objectMapper.readTree(rawResponse);
            JsonNode textNode = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            if (textNode == null || textNode.isMissingNode() || textNode.isNull()) {
                log.warn("Could not extract text from Gemini response: {}", rawResponse);
                return rawResponse;
            }

            String text = textNode.asText().trim();

            // Strip markdown code fences (```json ... ```) that Gemini sometimes adds
            if (text.startsWith("```")) {
                text = text.replaceAll("^```[a-zA-Z]*\\n?", "").replaceAll("\\n?```$", "").trim();
            }

            return text;

        } catch (Exception e) {
            log.warn("Failed to parse Gemini response wrapper, returning raw: {}", e.getMessage());
            return rawResponse;
        }
    }
}