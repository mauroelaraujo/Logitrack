import { useEffect, useState, useRef } from 'react'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { Veiculo, Viagem, Manutencao } from '@/types'

export default function DashboardPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [viagens, setViagens] = useState<Viagem[]>([])
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const [v, vi, m] = await Promise.all([
          api.get<Veiculo[]>('/api/veiculos'),
          api.get<Viagem[]>('/api/viagens'),
          api.get<Manutencao[]>('/api/manutencoes'),
        ])
        setVeiculos(v)
        setViagens(vi)
        setManutencoes(m)
      } catch (err) {
        const error = handleError(err)
        toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(error).message })
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  const pendentes = manutencoes.filter(m => m.status === 'PENDENTE').length
  const emRealizacao = manutencoes.filter(m => m.status === 'EM_REALIZACAO').length

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {loading ? (
        <div className="flex justify-content-center py-6">
          <i className="pi pi-spin pi-spinner text-4xl text-primary" />
        </div>
      ) : (
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3">
            <Card className="shadow-2" style={{ borderTop: '4px solid var(--blue-500)' }}>
              <div className="flex align-items-center gap-3">
                <div className="flex align-items-center justify-content-center border-round bg-blue-100" style={{ width: 56, height: 56 }}>
                  <i className="pi pi-car text-3xl text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-500">{veiculos.length}</div>
                  <div className="text-500">Veículos</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <Card className="shadow-2" style={{ borderTop: '4px solid var(--green-500)' }}>
              <div className="flex align-items-center gap-3">
                <div className="flex align-items-center justify-content-center border-round bg-green-100" style={{ width: 56, height: 56 }}>
                  <i className="pi pi-map text-3xl text-green-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-500">{viagens.length}</div>
                  <div className="text-500">Viagens</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <Card className="shadow-2" style={{ borderTop: '4px solid var(--orange-500)' }}>
              <div className="flex align-items-center gap-3">
                <div className="flex align-items-center justify-content-center border-round bg-orange-100" style={{ width: 56, height: 56 }}>
                  <i className="pi pi-exclamation-triangle text-3xl text-orange-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">{pendentes}</div>
                  <div className="text-500">Manutenções Pendentes</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <Card className="shadow-2" style={{ borderTop: '4px solid var(--yellow-600)' }}>
              <div className="flex align-items-center gap-3">
                <div className="flex align-items-center justify-content-center border-round bg-yellow-100" style={{ width: 56, height: 56 }}>
                  <i className="pi pi-wrench text-3xl text-yellow-600" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600">{emRealizacao}</div>
                  <div className="text-500">Em Realização</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
