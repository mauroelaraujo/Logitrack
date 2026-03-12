package br.com.logotrack.logitrack.dto;

import jakarta.validation.constraints.*;

public record RegisterRequestDTO(
        @NotBlank @Size(max = 100) String nome,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(min = 6) String senha
) {}
