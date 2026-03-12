package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.ViagemRequestDTO;
import br.com.logotrack.logitrack.dto.ViagemResponseDTO;
import br.com.logotrack.logitrack.mapper.ViagemMapper;
import br.com.logotrack.logitrack.model.TipoVeiculo;
import br.com.logotrack.logitrack.model.Veiculo;
import br.com.logotrack.logitrack.model.Viagem;
import br.com.logotrack.logitrack.repository.VeiculoRepository;
import br.com.logotrack.logitrack.repository.ViagemRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ViagemServiceTest {

    @Mock
    private ViagemRepository viagemRepository;

    @Mock
    private VeiculoRepository veiculoRepository;

    @Mock
    private ViagemMapper viagemMapper;

    @InjectMocks
    private ViagemService viagemService;

    private Veiculo veiculo() {
        return new Veiculo(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
    }

    @Test
    void listarTodas_deveRetornarLista() {
        var viagem = Viagem.builder().id(1L).veiculo(veiculo())
                .dataSaida(LocalDateTime.now()).origem("SP").destino("RJ").build();
        var dto = new ViagemResponseDTO(1L, 1L, "ABC-1234",
                LocalDateTime.now(), null, "SP", "RJ", BigDecimal.valueOf(435));
        when(viagemRepository.findAll()).thenReturn(List.of(viagem));
        when(viagemMapper.toResponseDTO(viagem)).thenReturn(dto);

        var resultado = viagemService.listarTodas();

        assertThat(resultado).hasSize(1);
    }

    @Test
    void buscarPorId_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(viagemRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> viagemService.buscarPorId(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void criar_quandoVeiculoNaoExistir_deveLancarEntityNotFoundException() {
        var dto = new ViagemRequestDTO(99L, LocalDateTime.now(), null, "SP", "RJ", null);
        when(veiculoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> viagemService.criar(dto))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void criar_deveSalvarERetornarDTO() {
        var dataSaida = LocalDateTime.now();
        var dto = new ViagemRequestDTO(1L, dataSaida, null, "SP", "RJ", BigDecimal.valueOf(435));
        var veiculo = veiculo();
        var viagem = Viagem.builder().id(1L).veiculo(veiculo).dataSaida(dataSaida)
                .origem("SP").destino("RJ").build();
        var responseDTO = new ViagemResponseDTO(1L, 1L, "ABC-1234",
                dataSaida, null, "SP", "RJ", BigDecimal.valueOf(435));

        when(veiculoRepository.findById(1L)).thenReturn(Optional.of(veiculo));
        when(viagemRepository.save(any())).thenReturn(viagem);
        when(viagemMapper.toResponseDTO(viagem)).thenReturn(responseDTO);

        var resultado = viagemService.criar(dto);

        assertThat(resultado.origem()).isEqualTo("SP");
        verify(viagemRepository).save(any());
    }

    @Test
    void deletar_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(viagemRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> viagemService.deletar(99L))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
