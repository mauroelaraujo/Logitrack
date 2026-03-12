package br.com.logotrack.logitrack.repository;

import br.com.logotrack.logitrack.model.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {

    List<Viagem> findByVeiculoId(Long veiculoId);
}
