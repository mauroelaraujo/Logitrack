package br.com.logotrack.logitrack.dto;

import br.com.logotrack.logitrack.model.TipoVeiculo;
import jakarta.validation.constraints.*;

public record VeiculoRequestDTO(
        @NotBlank @Size(max = 10) String placa,
        @NotBlank @Size(max = 50) String modelo,
        @NotNull TipoVeiculo tipo,
        @Min(1900) @Max(2100) Integer ano
) {}
