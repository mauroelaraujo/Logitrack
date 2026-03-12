package br.com.logotrack.logitrack.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemRequestDTO(
        @NotNull Long veiculoId,
        @NotNull LocalDateTime dataSaida,
        LocalDateTime dataChegada,
        @Size(max = 100) String origem,
        @Size(max = 100) String destino,
        @DecimalMin("0.0") BigDecimal kmPercorrida
) {}
