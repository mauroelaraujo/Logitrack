import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { ManutencaoCustoMensal } from '@/types'

export default function ConsultaProjecaoFinanceiraPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [dados, setDados] = useState<ManutencaoCustoMensal[]>([])
  const [loading, setLoading] = useState(true)

  async function carregar() {
    setLoading(true)
    try {
      const data = await api.get<ManutencaoCustoMensal[]>('/api/manutencoes/custo-por-mes')
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

  const totalGeral = dados.reduce((acc, row) => acc + (row.custo ?? 0), 0)

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
        <h2 className="m-0">Projeção Financeira de Manutenções por Mês</h2>
        <Button
          label="Atualizar"
          icon="pi pi-refresh"
          className="p-button-outlined"
          onClick={carregar}
        />
      </div>

      <div className="mb-4">
        <Card className="text-center" style={{ maxWidth: '260px' }}>
          <div className="text-500 font-medium mb-1">Total Geral</div>
          <div className="text-2xl font-bold text-primary">
            {totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </div>
        </Card>
      </div>

      <DataTable
        value={dados}
        emptyMessage="Nenhum dado encontrado"
        stripedRows
        showGridlines
      >
        <Column field="mesAno" header="Mês/Ano" />
        <Column
          field="custo"
          header="Custo Estimado"
          body={(row: ManutencaoCustoMensal) =>
            row.custo != null
              ? Number(row.custo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              : '—'
          }
        />
      </DataTable>
    </div>
  )
}
