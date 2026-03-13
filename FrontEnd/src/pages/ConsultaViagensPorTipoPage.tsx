import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { VeiculoQtdViagens } from '@/types'

export default function ConsultaViagensPorTipoPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [dados, setDados] = useState<VeiculoQtdViagens[]>([])
  const [loading, setLoading] = useState(true)

  async function carregar() {
    setLoading(true)
    try {
      const data = await api.get<VeiculoQtdViagens[]>('/api/viagens/resumo-por-tipo')
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
        <h2 className="m-0">Quantidade de Viagens por Tipo de Veículo</h2>
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
        <Column
          field="tipo"
          header="Tipo"
          sortable
          body={(row: VeiculoQtdViagens) => (
            <Tag
              value={row.tipo}
              severity={row.tipo === 'LEVE' ? 'info' : 'warning'}
            />
          )}
        />
        <Column field="qtdViagens" header="Qtd. Viagens" sortable />
      </DataTable>
    </div>
  )
}
