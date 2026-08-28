package com.fitness.gateway;

// This file has been intentionally emptied.
// KeycloakUserSyncFilter was the filter that auto-synced Keycloak users to the local DB.
// It is no longer needed because Keycloak has been replaced with Spring JWT.
// User registration is now handled directly by POST /api/auth/register in UserService.
// The JWT validation and X-User-ID header injection is done by JwtAuthenticationFilter.
