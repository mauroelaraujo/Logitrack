package br.com.logotrack.logitrack.dto;

public record AuthResponseDTO(
        String token,
        String tipo,
        String email,
        String role
) {}
