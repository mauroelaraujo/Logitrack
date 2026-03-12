package br.com.logotrack.logitrack.service;

import br.com.logotrack.logitrack.dto.ManutencaoRequestDTO;
import br.com.logotrack.logitrack.dto.ManutencaoResponseDTO;
import br.com.logotrack.logitrack.mapper.ManutencaoMapper;
import br.com.logotrack.logitrack.model.*;
import br.com.logotrack.logitrack.repository.ManutencaoRepository;
import br.com.logotrack.logitrack.repository.VeiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ManutencaoServiceTest {

    @Mock
    private ManutencaoRepository manutencaoRepository;

    @Mock
    private VeiculoRepository veiculoRepository;

    @Mock
    private ManutencaoMapper manutencaoMapper;

    @InjectMocks
    private ManutencaoService manutencaoService;

    private Veiculo veiculo() {
        return new Veiculo(1L, "ABC-1234", "Fiorino", TipoVeiculo.LEVE, 2022);
    }

    @Test
    void listarTodas_deveRetornarLista() {
        var man = Manutencao.builder().id(1L).veiculo(veiculo())
                .dataInicio(LocalDate.now()).status(StatusManutencao.PENDENTE).build();
        var dto = new ManutencaoResponseDTO(1L, 1L, "ABC-1234", LocalDate.now(), null,
                "Troca de Óleo", BigDecimal.valueOf(350), StatusManutencao.PENDENTE);
        when(manutencaoRepository.findAll()).thenReturn(List.of(man));
        when(manutencaoMapper.toResponseDTO(man)).thenReturn(dto);

        var resultado = manutencaoService.listarTodas();

        assertThat(resultado).hasSize(1);
    }

    @Test
    void buscarPorId_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(manutencaoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> manutencaoService.buscarPorId(99L))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void criar_quandoVeiculoNaoExistir_deveLancarEntityNotFoundException() {
        var dto = new ManutencaoRequestDTO(99L, LocalDate.now(), null, "Troca", null, null);
        when(veiculoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> manutencaoService.criar(dto))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void criar_semStatus_deveUsarStatusPendentePorPadrao() {
        var dto = new ManutencaoRequestDTO(1L, LocalDate.now(), null, "Troca", BigDecimal.valueOf(100), null);
        var veiculo = veiculo();
        var man = Manutencao.builder().id(1L).veiculo(veiculo)
                .dataInicio(LocalDate.now()).status(StatusManutencao.PENDENTE).build();
        var responseDTO = new ManutencaoResponseDTO(1L, 1L, "ABC-1234", LocalDate.now(), null,
                "Troca", BigDecimal.valueOf(100), StatusManutencao.PENDENTE);

        when(veiculoRepository.findById(1L)).thenReturn(Optional.of(veiculo));
        when(manutencaoRepository.save(any())).thenReturn(man);
        when(manutencaoMapper.toResponseDTO(man)).thenReturn(responseDTO);

        var resultado = manutencaoService.criar(dto);

        assertThat(resultado.status()).isEqualTo(StatusManutencao.PENDENTE);
    }

    @Test
    void deletar_quandoNaoExistir_deveLancarEntityNotFoundException() {
        when(manutencaoRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> manutencaoService.deletar(99L))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    void listarPorStatus_deveRetornarFiltrado() {
        var man = Manutencao.builder().id(1L).veiculo(veiculo())
                .dataInicio(LocalDate.now()).status(StatusManutencao.CONCLUIDA).build();
        var dto = new ManutencaoResponseDTO(1L, 1L, "ABC-1234", LocalDate.now(), null,
                "Pneus", BigDecimal.valueOf(2200), StatusManutencao.CONCLUIDA);
        when(manutencaoRepository.findByStatus(StatusManutencao.CONCLUIDA)).thenReturn(List.of(man));
        when(manutencaoMapper.toResponseDTO(man)).thenReturn(dto);

        var resultado = manutencaoService.listarPorStatus(StatusManutencao.CONCLUIDA);

        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).status()).isEqualTo(StatusManutencao.CONCLUIDA);
    }
}
