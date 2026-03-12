package br.com.logotrack.logitrack.repository;

import br.com.logotrack.logitrack.model.Manutencao;
import br.com.logotrack.logitrack.model.StatusManutencao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

    List<Manutencao> findByVeiculoId(Long veiculoId);

    List<Manutencao> findByStatus(StatusManutencao status);
}
