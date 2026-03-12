package br.com.logotrack.logitrack.mapper;

import br.com.logotrack.logitrack.dto.ViagemResponseDTO;
import br.com.logotrack.logitrack.model.Viagem;
import org.springframework.stereotype.Component;

@Component
public class ViagemMapper {

    public ViagemResponseDTO toResponseDTO(Viagem entity) {
        return new ViagemResponseDTO(
                entity.getId(),
                entity.getVeiculo().getId(),
                entity.getVeiculo().getPlaca(),
                entity.getDataSaida(),
                entity.getDataChegada(),
                entity.getOrigem(),
                entity.getDestino(),
                entity.getKmPercorrida()
        );
    }
}
