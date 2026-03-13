package br.com.logotrack.logitrack.repository;

import br.com.logotrack.logitrack.dto.VeiculoKmResumoDTO;
import br.com.logotrack.logitrack.dto.VeiculoQtdViagensDTO;
import br.com.logotrack.logitrack.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    Optional<Veiculo> findByPlaca(String placa);

    boolean existsByPlaca(String placa);

    @Query(value = """
            SELECT v.placa        AS placa,
                   v.modelo       AS modelo,
                   COUNT(vg.id)   AS totalViagens,
                   COALESCE(SUM(vg.km_percorrida), 0) AS totalKmRodados
            FROM veiculos v
            LEFT JOIN viagens vg ON v.id = vg.veiculo_id
            GROUP BY v.id, v.placa, v.modelo
            ORDER BY totalKmRodados DESC
            """,
            nativeQuery = true)
    List<VeiculoKmResumoDTO> findResumoKmPorVeiculo();

    @Query(value = """
            SELECT v.tipo                             AS tipo,
                   COALESCE(COUNT(vj.veiculo_id), 0) AS qtdViagens
            FROM veiculos v
            LEFT JOIN viagens vj ON vj.veiculo_id = v.id
            GROUP BY v.tipo
            ORDER BY v.tipo, qtdViagens DESC
            """,
            nativeQuery = true)
    List<VeiculoQtdViagensDTO> findQtdViagensPorTipoModelo();
}
