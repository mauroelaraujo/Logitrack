package br.com.logotrack.logitrack.dto;

import jakarta.validation.constraints.*;

public record AuthRequestDTO(
        @NotBlank @Email String email,
        @NotBlank String senha
) {}
