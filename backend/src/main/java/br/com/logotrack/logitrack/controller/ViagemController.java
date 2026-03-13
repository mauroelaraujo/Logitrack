package br.com.logotrack.logitrack.controller;

import br.com.logotrack.logitrack.dto.RankingUtilizacaoDTO;
import br.com.logotrack.logitrack.dto.ViagemRequestDTO;
import br.com.logotrack.logitrack.dto.ViagemResponseDTO;
import br.com.logotrack.logitrack.dto.VeiculoKmPercorridoDTO;
import br.com.logotrack.logitrack.dto.VeiculoKmResumoDTO;
import br.com.logotrack.logitrack.dto.VeiculoQtdViagensDTO;
import br.com.logotrack.logitrack.service.ViagemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/viagens")
@RequiredArgsConstructor
@Tag(name = "Viagens", description = "Gerenciamento de viagens")
@SecurityRequirement(name = "bearerAuth")
public class ViagemController {

    private final ViagemService viagemService;

    @GetMapping
    @Operation(summary = "Listar todas as viagens")
    public ResponseEntity<List<ViagemResponseDTO>> listarTodas() {
        return ResponseEntity.ok(viagemService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar viagem por ID")
    public ResponseEntity<ViagemResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(viagemService.buscarPorId(id));
    }

    @GetMapping("/veiculo/{veiculoId}")
    @Operation(summary = "Listar viagens por veículo")
    public ResponseEntity<List<ViagemResponseDTO>> listarPorVeiculo(@PathVariable Long veiculoId) {
        return ResponseEntity.ok(viagemService.listarPorVeiculo(veiculoId));
    }

    @PostMapping
    @Operation(summary = "Criar viagem")
    public ResponseEntity<ViagemResponseDTO> criar(@Valid @RequestBody ViagemRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(viagemService.criar(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar viagem")
    public ResponseEntity<ViagemResponseDTO> atualizar(@PathVariable Long id,
                                                        @Valid @RequestBody ViagemRequestDTO dto) {
        return ResponseEntity.ok(viagemService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar viagem")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        viagemService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/resumo-km")
    @Operation(summary = "Resumo de KM rodados por veículo")
    public ResponseEntity<List<VeiculoKmResumoDTO>> resumoKmPorVeiculo() {
        return ResponseEntity.ok(viagemService.resumoKmPorVeiculo());
    }

    @GetMapping("/resumo-por-tipo")
    @Operation(summary = "Quantidade de viagens por tipo e modelo de veículo")
    public ResponseEntity<List<VeiculoQtdViagensDTO>> qtdViagensPorTipoModelo() {
        return ResponseEntity.ok(viagemService.qtdViagensPorTipoModelo());
    }

    @GetMapping("/km-percorridos")
    @Operation(summary = "KM percorridos agrupados por veículo, ordenado do maior para o menor")
    public ResponseEntity<List<VeiculoKmPercorridoDTO>> kmPercorridosPorVeiculo() {
        return ResponseEntity.ok(viagemService.kmPercorridosPorVeiculo());
    }

    @GetMapping("/ranking-utilizacao")
    @Operation(summary = "Veículo com maior utilização (maior KM total percorrida)")
    public ResponseEntity<RankingUtilizacaoDTO> rankingUtilizacao() {
        return viagemService.rankingUtilizacao()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
