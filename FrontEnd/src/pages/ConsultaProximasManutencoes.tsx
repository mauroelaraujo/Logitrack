import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { ManutencaoPendenteResumo } from '@/types'

export default function ConsultaProximasManutencoes() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [dados, setDados] = useState<ManutencaoPendenteResumo[]>([])
  const [loading, setLoading] = useState(true)

  async function carregar() {
    setLoading(true)
    try {
      const data = await api.get<ManutencaoPendenteResumo[]>('/api/manutencoes/pendentes-proximas')
      setDados(data)
    } catch (err) {
      const apiErr = normalizeApiError(err)
      handleError(apiErr)
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: apiErr.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregar() }, [])

  if (loading) {
    return (
      <div className="flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <ProgressSpinner />
      </div>
    )
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />

      <div className="flex align-items-center justify-content-between mb-4">
        <h2 className="m-0">Cronograma — Próximas 5 Manutenções Pendentes</h2>
        <Button
          label="Atualizar"
          icon="pi pi-refresh"
          className="p-button-outlined"
          onClick={carregar}
        />
      </div>

      <DataTable
        value={dados}
        emptyMessage="Nenhuma manutenção pendente encontrada"
        stripedRows
      >
        <Column field="modelo" header="Modelo" />
        <Column field="placa" header="Placa" />
        <Column
          field="dataInicio"
          header="Data Prevista"
          body={(row: ManutencaoPendenteResumo) =>
            row.dataInicio
              ? new Date(row.dataInicio + 'T00:00:00').toLocaleDateString('pt-BR')
              : '—'
          }
        />
        <Column field="tipoServico" header="Tipo de Serviço" />
        <Column
          field="custoEstimado"
          header="Custo Estimado"
          body={(row: ManutencaoPendenteResumo) =>
            row.custoEstimado != null
              ? Number(row.custoEstimado).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : '—'
          }
        />
        <Column
          header="Status"
          body={() => <Tag value="PENDENTE" severity="warning" />}
        />
      </DataTable>
    </div>
  )
}
