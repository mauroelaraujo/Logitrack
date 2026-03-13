package br.com.logotrack.logitrack.repository;

import br.com.logotrack.logitrack.dto.VeiculoKmPercorridoDTO;
import br.com.logotrack.logitrack.model.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {

    List<Viagem> findByVeiculoId(Long veiculoId);

    @Query(value = """
            SELECT v.modelo                AS modelo,
                   v.tipo                  AS tipo,
                   SUM(vg.km_percorrida)   AS kmPercorridos
            FROM viagens vg
            INNER JOIN veiculos v ON v.id = vg.veiculo_id
            GROUP BY vg.veiculo_id
            ORDER BY kmPercorridos DESC
            """,
            nativeQuery = true)
    List<VeiculoKmPercorridoDTO> findKmPercorridosPorVeiculo();
}
