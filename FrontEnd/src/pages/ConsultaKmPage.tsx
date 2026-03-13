import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { VeiculoKmResumo } from '@/types'

export default function ConsultaKmPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [dados, setDados] = useState<VeiculoKmResumo[]>([])
  const [loading, setLoading] = useState(true)

  async function carregar() {
    setLoading(true)
    try {
      const data = await api.get<VeiculoKmResumo[]>('/api/viagens/resumo-km')
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
        <h2 className="m-0">Consulta de KM Percorridos por Veículo</h2>
        <Button
          label="Atualizar"
          icon="pi pi-refresh"
          className="p-button-outlined"
          onClick={carregar}
        />
      </div>

      <DataTable
        value={dados}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        emptyMessage="Nenhum dado encontrado"
        sortMode="multiple"
        stripedRows
      >
        <Column field="placa" header="Placa" sortable />
        <Column field="modelo" header="Modelo" sortable />
        <Column field="totalViagens" header="Total de Viagens" sortable />
        <Column
          field="totalKmRodados"
          header="KM Percorridos"
          sortable
          body={(row: VeiculoKmResumo) =>
            row.totalKmRodados != null
              ? `${Number(row.totalKmRodados).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} km`
              : '—'
          }
        />
      </DataTable>
    </div>
  )
}
