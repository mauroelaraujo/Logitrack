package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.RankingUtilizacaoDTO;
import br.com.logotrack.logitrack.dto.VeiculoKmPercorridoDTO;
import br.com.logotrack.logitrack.dto.VeiculoKmResumoDTO;
import br.com.logotrack.logitrack.dto.VeiculoQtdViagensDTO;
import br.com.logotrack.logitrack.dto.ViagemRequestDTO;
import br.com.logotrack.logitrack.dto.ViagemResponseDTO;
import br.com.logotrack.logitrack.mapper.ViagemMapper;
import br.com.logotrack.logitrack.model.Viagem;
import br.com.logotrack.logitrack.repository.VeiculoRepository;
import br.com.logotrack.logitrack.repository.ViagemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ViagemService {

    private final ViagemRepository viagemRepository;
    private final VeiculoRepository veiculoRepository;
    private final ViagemMapper viagemMapper;

    public List<ViagemResponseDTO> listarTodas() {
        log.info("Listando todas as viagens");
        return viagemRepository.findAll().stream()
                .map(viagemMapper::toResponseDTO)
                .toList();
    }

    public ViagemResponseDTO buscarPorId(Long id) {
        log.info("Buscando viagem com id {}", id);
        return viagemRepository.findById(id)
                .map(viagemMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Viagem não encontrada com id: " + id));
    }

    public List<ViagemResponseDTO> listarPorVeiculo(Long veiculoId) {
        log.info("Listando viagens do veículo {}", veiculoId);
        return viagemRepository.findByVeiculoId(veiculoId).stream()
                .map(viagemMapper::toResponseDTO)
                .toList();
    }

    @Transactional
    public ViagemResponseDTO criar(ViagemRequestDTO dto) {
        log.info("Criando viagem para veículo {}", dto.veiculoId());
        var veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + dto.veiculoId()));
        Viagem entity = Viagem.builder()
                .veiculo(veiculo)
                .dataSaida(dto.dataSaida())
                .dataChegada(dto.dataChegada())
                .origem(dto.origem())
                .destino(dto.destino())
                .kmPercorrida(dto.kmPercorrida())
                .build();
        return viagemMapper.toResponseDTO(viagemRepository.save(entity));
    }

    @Transactional
    public ViagemResponseDTO atualizar(Long id, ViagemRequestDTO dto) {
        log.info("Atualizando viagem com id {}", id);
        Viagem entity = viagemRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Viagem não encontrada com id: " + id));
        var veiculo = veiculoRepository.findById(dto.veiculoId())
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + dto.veiculoId()));
        entity.setVeiculo(veiculo);
        entity.setDataSaida(dto.dataSaida());
        entity.setDataChegada(dto.dataChegada());
        entity.setOrigem(dto.origem());
        entity.setDestino(dto.destino());
        entity.setKmPercorrida(dto.kmPercorrida());
        return viagemMapper.toResponseDTO(viagemRepository.save(entity));
    }

    @Transactional
    public void deletar(Long id) {
        log.info("Deletando viagem com id {}", id);
        if (!viagemRepository.existsById(id)) {
            throw new EntityNotFoundException("Viagem não encontrada com id: " + id);
        }
        viagemRepository.deleteById(id);
    }

    public List<VeiculoKmResumoDTO> resumoKmPorVeiculo() {
        log.info("Consultando resumo de KM rodados por veículo");
        return veiculoRepository.findResumoKmPorVeiculo();
    }

    public List<VeiculoQtdViagensDTO> qtdViagensPorTipoModelo() {
        log.info("Consultando quantidade de viagens por tipo e modelo de veículo");
        return veiculoRepository.findQtdViagensPorTipoModelo();
    }

    public List<VeiculoKmPercorridoDTO> kmPercorridosPorVeiculo() {
        log.info("Consultando KM percorridos agrupados por veículo");
        return viagemRepository.findKmPercorridosPorVeiculo();
    }

    public Optional<RankingUtilizacaoDTO> rankingUtilizacao() {
        log.info("Consultando veículo com maior utilização (ranking de KM)");
        return viagemRepository.findRankingUtilizacao();
    }
}
