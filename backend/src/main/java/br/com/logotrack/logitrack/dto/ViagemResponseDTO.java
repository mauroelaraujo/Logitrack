package br.com.logotrack.logitrack.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ViagemResponseDTO(
        Long id,
        Long veiculoId,
        String veiculoPlaca,
        LocalDateTime dataSaida,
        LocalDateTime dataChegada,
        String origem,
        String destino,
        BigDecimal kmPercorrida
) {}
