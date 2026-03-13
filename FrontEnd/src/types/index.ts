// Tipos compartilhados do domínio Logitrack

export type TipoVeiculo = 'LEVE' | 'PESADO'
export type StatusManutencao = 'PENDENTE' | 'EM_REALIZACAO' | 'CONCLUIDA'
export type Role = 'USER' | 'ADMIN'

export interface Veiculo {
  id: number
  placa: string
  modelo: string
  tipo: TipoVeiculo
  ano: number
}

export interface VeiculoRequest {
  placa: string
  modelo: string
  tipo: TipoVeiculo
  ano: number
}

export interface Viagem {
  id: number
  veiculoId: number
  veiculoPlaca: string
  dataSaida: string
  dataChegada?: string
  origem: string
  destino: string
  kmPercorrida?: number
}

export interface ViagemRequest {
  veiculoId: number
  dataSaida: string
  dataChegada?: string
  origem: string
  destino: string
  kmPercorrida?: number
}

export interface Manutencao {
  id: number
  veiculoId: number
  veiculoPlaca: string
  dataInicio: string
  dataFinalizacao?: string
  tipoServico: string
  custoEstimado?: number
  status: StatusManutencao
}

export interface ManutencaoRequest {
  veiculoId: number
  dataInicio: string
  dataFinalizacao?: string
  tipoServico: string
  custoEstimado?: number
  status?: StatusManutencao
}

export interface VeiculoKmResumo {
  placa: string
  modelo: string
  totalViagens: number
  totalKmRodados: number
}

export interface VeiculoQtdViagens {
  tipo: string
  qtdViagens: number
}

export interface ManutencaoPendenteResumo {
  modelo: string
  placa: string
  dataInicio: string
  tipoServico: string
  custoEstimado: number | null
}

export interface ManutencaoCustoMensal {
  mesAno: string
  custo: number | null
}

export interface AuthResponse {
  token: string
  tipo: string
  email: string
  role: Role
}
