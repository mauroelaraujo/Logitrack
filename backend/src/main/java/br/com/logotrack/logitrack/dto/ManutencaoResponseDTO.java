package br.com.logotrack.logitrack.dto;

import br.com.logotrack.logitrack.model.StatusManutencao;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ManutencaoResponseDTO(
        Long id,
        Long veiculoId,
        String veiculoPlaca,
        LocalDate dataInicio,
        LocalDate dataFinalizacao,
        String tipoServico,
        BigDecimal custoEstimado,
        StatusManutencao status
) {}
