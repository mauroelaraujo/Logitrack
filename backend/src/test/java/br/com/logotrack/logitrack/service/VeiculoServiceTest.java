package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.VeiculoRequestDTO;
import br.com.logotrack.logitrack.dto.VeiculoResponseDTO;
import br.com.logotrack.logitrack.mapper.VeiculoMapper;
import br.com.logotrack.logitrack.model.TipoVeiculo;
import br.com.logotrack.logitrack.model.Veiculo;
import br.com.logotrack.logitrack.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VeiculoServiceTest {

    @Mock
    private VeiculoRepository veiculoRepository;

    @Mock
    private VeiculoMapper veiculoMapper;

    @InjectMocks
    private VeiculoService veiculoService;

    @Test
    void listarTodos_deveRetornarListaDeVeiculos() {
        var veiculo = new Veiculo(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        var responseDTO = new VeiculoResponseDTO(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        when(veiculoRepository.findAll()).thenReturn(List.of(veiculo));
        when(veiculoMapper.toResponseDTO(veiculo)).thenReturn(responseDTO);

        var resultado = veiculoService.listarTodos();

        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).placa()).isEqualTo("ABC-1234");
    }

    @Test
    void buscarPorId_quandoExistir_deveRetornarDTO() {
        var veiculo = new Veiculo(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        var responseDTO = new VeiculoResponseDTO(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        when(veiculoRepository.findById(1L)).thenReturn(Optional.of(veiculo));
        when(veiculoMapper.toResponseDTO(veiculo)).thenReturn(responseDTO);

        var resultado = veiculoService.buscarPorId(1L);

        assertThat(resultado.id()).isEqualTo(1L);
    }

    @Test
    void buscarPorId_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(veiculoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> veiculoService.buscarPorId(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void criar_comPlacaDuplicada_deveLancarIllegalArgumentException() {
        var dto = new VeiculoRequestDTO("ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        when(veiculoRepository.existsByPlaca("ABC-1234")).thenReturn(true);

        assertThatThrownBy(() -> veiculoService.criar(dto))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ABC-1234");
    }

    @Test
    void criar_deveSalvarERetornarDTO() {
        var dto = new VeiculoRequestDTO("ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        var entity = new Veiculo(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
        var responseDTO = new VeiculoResponseDTO(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);

        when(veiculoRepository.existsByPlaca("ABC-1234")).thenReturn(false);
        when(veiculoMapper.toEntity(dto)).thenReturn(entity);
        when(veiculoRepository.save(entity)).thenReturn(entity);
        when(veiculoMapper.toResponseDTO(entity)).thenReturn(responseDTO);

        var resultado = veiculoService.criar(dto);

        assertThat(resultado.placa()).isEqualTo("ABC-1234");
        verify(veiculoRepository).save(entity);
    }

    @Test
    void deletar_quandoExistir_deveExecutarDeleteById() {
        when(veiculoRepository.existsById(1L)).thenReturn(true);

        veiculoService.deletar(1L);

        verify(veiculoRepository).deleteById(1L);
    }

    @Test
    void deletar_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(veiculoRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> veiculoService.deletar(99L))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
