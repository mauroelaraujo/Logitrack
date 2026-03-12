package br.com.logotrack.logitrack.dto;

import br.com.logotrack.logitrack.model.StatusManutencao;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ManutencaoRequestDTO(
        @NotNull Long veiculoId,
        @NotNull LocalDate dataInicio,
        LocalDate dataFinalizacao,
        @Size(max = 100) String tipoServico,
        @DecimalMin("0.0") BigDecimal custoEstimado,
        StatusManutencao status
) {}
