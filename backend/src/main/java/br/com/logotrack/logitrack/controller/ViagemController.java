package br.com.logotrack.logitrack.controller;

import br.com.logotrack.logitrack.dto.ViagemRequestDTO;
import br.com.logotrack.logitrack.dto.ViagemResponseDTO;
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
}
