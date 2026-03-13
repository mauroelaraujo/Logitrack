package br.com.logotrack.logitrack.repository;

import br.com.logotrack.logitrack.dto.ManutencaoCustoMensalDTO;
import br.com.logotrack.logitrack.dto.ManutencaoPendenteResumoDTO;
import br.com.logotrack.logitrack.model.Manutencao;
import br.com.logotrack.logitrack.model.StatusManutencao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

    List<Manutencao> findByVeiculoId(Long veiculoId);

    List<Manutencao> findByStatus(StatusManutencao status);

    @Query(value = """
            SELECT v.modelo         AS modelo,
                   v.placa          AS placa,
                   m.data_inicio    AS dataInicio,
                   m.tipo_servico   AS tipoServico,
                   m.custo_estimado AS custoEstimado
            FROM manutencoes m
            INNER JOIN veiculos v ON v.id = m.veiculo_id
            WHERE m.status = 'PENDENTE'
            ORDER BY m.data_inicio
            LIMIT 5
            """,
            nativeQuery = true)
    List<ManutencaoPendenteResumoDTO> findTop5PendentesPorDataInicio();

    @Query(value = """
            SELECT DATE_FORMAT(data_inicio, '%m/%y') AS mesAno,
                   SUM(custo_estimado)               AS custo
            FROM manutencoes
            GROUP BY mesAno
            ORDER BY MIN(data_inicio)
            """,
            nativeQuery = true)
    List<ManutencaoCustoMensalDTO> findCustoAgrupadoPorMes();
}
