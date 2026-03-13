package br.com.logotrack.logitrack.controller;

import br.com.logotrack.logitrack.dto.ManutencaoCustoMensalDTO;
import br.com.logotrack.logitrack.dto.ManutencaoRequestDTO;
import br.com.logotrack.logitrack.dto.ManutencaoPendenteResumoDTO;
import br.com.logotrack.logitrack.dto.ManutencaoResponseDTO;
import br.com.logotrack.logitrack.model.StatusManutencao;
import br.com.logotrack.logitrack.service.ManutencaoService;
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
@RequestMapping("/api/manutencoes")
@RequiredArgsConstructor
@Tag(name = "Manutenções", description = "Gerenciamento de manutenções")
@SecurityRequirement(name = "bearerAuth")
public class ManutencaoController {

    private final ManutencaoService manutencaoService;

    @GetMapping
    @Operation(summary = "Listar todas as manutenções")
    public ResponseEntity<List<ManutencaoResponseDTO>> listarTodas() {
        return ResponseEntity.ok(manutencaoService.listarTodas());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar manutenção por ID")
    public ResponseEntity<ManutencaoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(manutencaoService.buscarPorId(id));
    }

    @GetMapping("/veiculo/{veiculoId}")
    @Operation(summary = "Listar manutenções por veículo")
    public ResponseEntity<List<ManutencaoResponseDTO>> listarPorVeiculo(@PathVariable Long veiculoId) {
        return ResponseEntity.ok(manutencaoService.listarPorVeiculo(veiculoId));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Listar manutenções por status")
    public ResponseEntity<List<ManutencaoResponseDTO>> listarPorStatus(@PathVariable StatusManutencao status) {
        return ResponseEntity.ok(manutencaoService.listarPorStatus(status));
    }

    @PostMapping
    @Operation(summary = "Criar manutenção")
    public ResponseEntity<ManutencaoResponseDTO> criar(@Valid @RequestBody ManutencaoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(manutencaoService.criar(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar manutenção")
    public ResponseEntity<ManutencaoResponseDTO> atualizar(@PathVariable Long id,
                                                            @Valid @RequestBody ManutencaoRequestDTO dto) {
        return ResponseEntity.ok(manutencaoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar manutenção")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        manutencaoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pendentes-proximas")
    @Operation(summary = "Listar as 5 próximas manutenções pendentes")
    public ResponseEntity<List<ManutencaoPendenteResumoDTO>> listarTop5PendentesPorDataInicio() {
        return ResponseEntity.ok(manutencaoService.listarTop5PendentesPorDataInicio());
    }

    @GetMapping("/custo-por-mes")
    @Operation(summary = "Custo total de manutenções agrupado por mês/ano")
    public ResponseEntity<List<ManutencaoCustoMensalDTO>> custoPorMes() {
        return ResponseEntity.ok(manutencaoService.custoPorMes());
    }
}
