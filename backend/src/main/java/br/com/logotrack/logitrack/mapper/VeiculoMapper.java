package br.com.logotrack.logitrack.mapper;

import br.com.logotrack.logitrack.dto.VeiculoRequestDTO;
import br.com.logotrack.logitrack.dto.VeiculoResponseDTO;
import br.com.logotrack.logitrack.model.Veiculo;
import org.springframework.stereotype.Component;

@Component
public class VeiculoMapper {

    public Veiculo toEntity(VeiculoRequestDTO dto) {
        return Veiculo.builder()
                .placa(dto.placa())
                .modelo(dto.modelo())
                .tipo(dto.tipo())
                .ano(dto.ano())
                .build();
    }

    public VeiculoResponseDTO toResponseDTO(Veiculo entity) {
        return new VeiculoResponseDTO(
                entity.getId(),
                entity.getPlaca(),
                entity.getModelo(),
                entity.getTipo(),
                entity.getAno()
        );
    }
}
