package com.fitness.gateway.user;

// This package was used to call UserService from the gateway during Keycloak user sync.
// It is no longer needed — Keycloak has been replaced with Spring JWT.
// The gateway now only validates the JWT and injects X-User-ID; it does not call UserService.
