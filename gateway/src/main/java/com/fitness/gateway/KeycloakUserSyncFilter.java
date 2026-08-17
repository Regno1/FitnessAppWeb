package com.fitness.gateway;

import com.fitness.gateway.user.RegisterRequest;
import com.fitness.gateway.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserSyncFilter implements WebFilter {

    private final UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        return ReactiveSecurityContextHolder.getContext()
                .filter(ctx -> ctx.getAuthentication() != null
                        && ctx.getAuthentication().isAuthenticated()
                        && ctx.getAuthentication().getPrincipal() instanceof Jwt)
                .map(ctx -> (Jwt) ctx.getAuthentication().getPrincipal())
                .flatMap(jwt -> {
                    String keycloakId = jwt.getSubject();
                    log.info("KeycloakUserSyncFilter: processing keycloakId={}", keycloakId);

                    return userService.validateClient(keycloakId)
                            .flatMap(exists -> {
                                if (!exists) {
                                    RegisterRequest req = buildRegisterRequest(jwt);
                                    if (req == null) {
                                        // Email missing from token — skip sync, continue request
                                        log.warn("Cannot sync user keycloakId={}: email claim is missing from JWT. " +
                                                "Configure Keycloak to include 'email' in access token claims.", keycloakId);
                                        return Mono.empty();
                                    }
                                    log.info("User not found locally, syncing from Keycloak token: {}", keycloakId);
                                    return userService.registerUser(req)
                                            .doOnSuccess(r -> log.info("User synced successfully: {}", keycloakId))
                                            // ✅ FIX: Sync failure must NOT crash the request
                                            // If registration fails (e.g. duplicate, validation error),
                                            // just log and continue — the user still gets their response
                                            .onErrorResume(err -> {
                                                log.error("Failed to sync user keycloakId={} — continuing request anyway. Error: {}",
                                                        keycloakId, err.getMessage());
                                                return Mono.empty();
                                            })
                                            .then();
                                } else {
                                    log.debug("User already exists locally: {}", keycloakId);
                                    return Mono.empty();
                                }
                            })
                            // ✅ FIX: If validate itself fails, still continue the request
                            .onErrorResume(err -> {
                                log.error("User validation failed for keycloakId={} — continuing request anyway. Error: {}",
                                        keycloakId, err.getMessage());
                                return Mono.empty();
                            })
                            .then(Mono.defer(() -> forwardWithUserId(exchange, chain, keycloakId)));
                })
                .switchIfEmpty(chain.filter(exchange));
    }

    /**
     * Adds X-User-ID header and forwards to the next filter/service.
     */
    private Mono<Void> forwardWithUserId(ServerWebExchange exchange, WebFilterChain chain, String keycloakId) {
        ServerHttpRequest mutatedRequest = exchange.getRequest()
                .mutate()
                .header("X-User-ID", keycloakId)
                .build();
        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    /**
     * Builds RegisterRequest from the validated Keycloak JWT claims.
     * Returns null if email is missing (can't register without email due to @NotBlank constraint).
     */
    private RegisterRequest buildRegisterRequest(Jwt jwt) {
        String email = jwt.getClaimAsString("email");

        if (email == null || email.isBlank()) {
            return null; // Caller handles this case
        }

        RegisterRequest request = new RegisterRequest();
        request.setKeycloakId(jwt.getSubject());
        request.setEmail(email);
        request.setFirstName(jwt.getClaimAsString("given_name"));
        request.setLastName(jwt.getClaimAsString("family_name"));
        request.setPassword("KEYCLOAK_MANAGED"); // Not used for auth — Keycloak manages passwords
        return request;
    }
}
