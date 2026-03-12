package br.com.logotrack.logitrack.dto;

import br.com.logotrack.logitrack.model.TipoVeiculo;

public record VeiculoResponseDTO(
        Long id,
        String placa,
        String modelo,
        TipoVeiculo tipo,
        Integer ano
) {}
