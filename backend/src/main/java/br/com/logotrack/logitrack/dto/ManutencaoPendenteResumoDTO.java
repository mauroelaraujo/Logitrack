package br.com.logotrack.logitrack.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface ManutencaoPendenteResumoDTO {
    String getModelo();
    String getPlaca();
    LocalDate getDataInicio();
    String getTipoServico();
    BigDecimal getCustoEstimado();
}
