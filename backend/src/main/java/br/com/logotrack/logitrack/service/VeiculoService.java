package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.VeiculoRequestDTO;
import br.com.logotrack.logitrack.dto.VeiculoResponseDTO;
import br.com.logotrack.logitrack.mapper.VeiculoMapper;
import br.com.logotrack.logitrack.model.Veiculo;
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
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;
    private final VeiculoMapper veiculoMapper;

    public List<VeiculoResponseDTO> listarTodos() {
        log.info("Listando todos os veículos");
        return veiculoRepository.findAll().stream()
                .map(veiculoMapper::toResponseDTO)
                .toList();
    }

    public VeiculoResponseDTO buscarPorId(Long id) {
        log.info("Buscando veículo com id {}", id);
        return veiculoRepository.findById(id)
                .map(veiculoMapper::toResponseDTO)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + id));
    }

    @Transactional
    public VeiculoResponseDTO criar(VeiculoRequestDTO dto) {
        log.info("Criando veículo com placa {}", dto.placa());
        if (veiculoRepository.existsByPlaca(dto.placa())) {
            throw new IllegalArgumentException("Já existe um veículo com a placa: " + dto.placa());
        }
        Veiculo entity = veiculoMapper.toEntity(dto);
        return veiculoMapper.toResponseDTO(veiculoRepository.save(entity));
    }

    @Transactional
    public VeiculoResponseDTO atualizar(Long id, VeiculoRequestDTO dto) {
        log.info("Atualizando veículo com id {}", id);
        Veiculo entity = veiculoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Veículo não encontrado com id: " + id));
        entity.setPlaca(dto.placa());
        entity.setModelo(dto.modelo());
        entity.setTipo(dto.tipo());
        entity.setAno(dto.ano());
        return veiculoMapper.toResponseDTO(veiculoRepository.save(entity));
    }

    @Transactional
    public void deletar(Long id) {
        log.info("Deletando veículo com id {}", id);
        if (!veiculoRepository.existsById(id)) {
            throw new EntityNotFoundException("Veículo não encontrado com id: " + id);
        }
        veiculoRepository.deleteById(id);
    }
}
