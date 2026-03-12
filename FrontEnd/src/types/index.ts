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

export interface AuthResponse {
  token: string
  tipo: string
  email: string
  role: Role
}
