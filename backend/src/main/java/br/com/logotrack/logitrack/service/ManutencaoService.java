package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.ManutencaoRequestDTO;
import br.com.logotrack.logitrack.dto.ManutencaoResponseDTO;
import br.com.logotrack.logitrack.mapper.ManutencaoMapper;
import br.com.logotrack.logitrack.model.Manutencao;
import br.com.logotrack.logitrack.model.StatusManutencao;
import br.com.logotrack.logitrack.repository.ManutencaoRepository;
import br.com.logotrack.logitrack.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManutencaoService {

    private final ManutencaoRepository manutencaoRepository;
    private final VeiculoRepository veiculoRepository;
    private final ManutencaoMapper manutencaoMapper;

    public List<ManutencaoResponseDTO> listarTodas() {
        log.info("Listando todas as manutenções");
        return manutencaoRepository.findAll().stream()
                .map(manutencaoMapper::toResponseDTO)
                .toList();
    }

    public ManutencaoResponseDTO buscarPorId(Long id) {
        log.info("Buscando manutenção com id {}", id);
        return manutencaoRepository.findById(id)
                .map(manutencaoMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Manutenção não encontrada com id: " + id));
    }

    public List<ManutencaoResponseDTO> listarPorVeiculo(Long veiculoId) {
        log.info("Listando manutenções do veículo {}", veiculoId);
        return manutencaoRepository.findByVeiculoId(veiculoId).stream()
                .map(manutencaoMapper::toResponseDTO)
                .toList();
    }

    public List<ManutencaoResponseDTO> listarPorStatus(StatusManutencao status) {
        log.info("Listando manutenções com status {}", status);
        return manutencaoRepository.findByStatus(status).stream()
                .map(manutencaoMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public ManutencaoResponseDTO criar(ManutencaoRequestDTO dto) {
        log.info("Criando manutenção para veículo {}", dto.veiculoId());
        var veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + dto.veiculoId()));
        Manutencao entity = Manutencao.builder()
                .veiculo(veiculo)
                .dataInicio(dto.dataInicio())
                .dataFinalizacao(dto.dataFinalizacao())
                .tipoServico(dto.tipoServico())
                .custoEstimado(dto.custoEstimado())
                .status(dto.status() != null ? dto.status() : StatusManutencao.PENDENTE)
                .build();
        return manutencaoMapper.toResponseDTO(manutencaoRepository.save(entity));
    }

    @Transactional
    public ManutencaoResponseDTO atualizar(Long id, ManutencaoRequestDTO dto) {
        log.info("Atualizando manutenção com id {}", id);
        Manutencao entity = manutencaoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Manutenção não encontrada com id: " + id));
        var veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + dto.veiculoId()));
        entity.setVeiculo(veiculo);
        entity.setDataInicio(dto.dataInicio());
        entity.setDataFinalizacao(dto.dataFinalizacao());
        entity.setTipoServico(dto.tipoServico());
        entity.setCustoEstimado(dto.custoEstimado());
        if (dto.status() != null) {
            entity.setStatus(dto.status());
        }
        return manutencaoMapper.toResponseDTO(manutencaoRepository.save(entity));
    }

    @Transactional
    public void deletar(Long id) {
        log.info("Deletando manutenção com id {}", id);
        if (!manutencaoRepository.existsById(id)) {
            throw new EntityNotFoundException("Manutenção não encontrada com id: " + id);
        }
        manutencaoRepository.deleteById(id);
    }
}
