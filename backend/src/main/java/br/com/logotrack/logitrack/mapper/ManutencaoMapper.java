package br.com.logotrack.logitrack.mapper;

import br.com.logotrack.logitrack.dto.ManutencaoResponseDTO;
import br.com.logotrack.logitrack.model.Manutencao;
import org.springframework.stereotype.Component;

@Component
public class ManutencaoMapper {

    public ManutencaoResponseDTO toResponseDTO(Manutencao entity) {
        return new ManutencaoResponseDTO(
                entity.getId(),
                entity.getVeiculo().getId(),
                entity.getVeiculo().getPlaca(),
                entity.getDataInicio(),
                entity.getDataFinalizacao(),
                entity.getTipoServico(),
                entity.getCustoEstimado(),
                entity.getStatus()
        );
    }
}
