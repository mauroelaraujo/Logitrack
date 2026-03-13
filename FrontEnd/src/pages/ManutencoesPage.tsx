import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Tag } from 'primereact/tag'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { Manutencao, ManutencaoRequest, StatusManutencao, Veiculo } from '@/types'

const statusOptions = [
  { label: 'Pendente', value: 'PENDENTE' },
  { label: 'Em realização', value: 'EM_REALIZACAO' },
  { label: 'Concluída', value: 'CONCLUIDA' },
]

const statusSeverity: Record<StatusManutencao, 'danger' | 'warning' | 'success'> = {
  PENDENTE: 'danger',
  EM_REALIZACAO: 'warning',
  CONCLUIDA: 'success',
}

const statusLabel: Record<StatusManutencao, string> = {
  PENDENTE: 'Pendente',
  EM_REALIZACAO: 'Em realização',
  CONCLUIDA: 'Concluída',
}

const emptyForm: ManutencaoRequest = {
  veiculoId: 0,
  dataInicio: '',
  tipoServico: '',
  status: 'PENDENTE',
}

export default function ManutencoesPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [manutencoes, setManutencoes] = useState<Manutencao[]>([])
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogVisivel, setDialogVisivel] = useState(false)
  const [editando, setEditando] = useState<Manutencao | null>(null)
  const [form, setForm] = useState<ManutencaoRequest>(emptyForm)
  const [saving, setSaving] = useState(false)

  async function carregar() {
    setLoading(true)
    try {
      const [man, veic] = await Promise.all([
        api.get<Manutencao[]>('/api/manutencoes'),
        api.get<Veiculo[]>('/api/veiculos'),
      ])
      setManutencoes(man)
      setVeiculos(veic)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregar() }, [])

  function abrirNovo() {
    setEditando(null)
    setForm(emptyForm)
    setDialogVisivel(true)
  }

  function abrirEditar(m: Manutencao) {
    setEditando(m)
    setForm({
      veiculoId: m.veiculoId,
      dataInicio: m.dataInicio,
      dataFinalizacao: m.dataFinalizacao,
      tipoServico: m.tipoServico,
      custoEstimado: m.custoEstimado,
      status: m.status,
    })
    setDialogVisivel(true)
  }

  async function salvar() {
    setSaving(true)
    try {
      if (editando) {
        await api.put<Manutencao>(`/api/manutencoes/${editando.id}`, form)
        toast.current?.show({ severity: 'success', summary: 'Atualizado', detail: 'Manutenção atualizada' })
      } else {
        await api.post<Manutencao>('/api/manutencoes', form)
        toast.current?.show({ severity: 'success', summary: 'Criado', detail: 'Manutenção criada' })
      }
      setDialogVisivel(false)
      carregar()
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
    } finally {
      setSaving(false)
    }
  }

  function confirmarDelete(m: Manutencao) {
    confirmDialog({
      message: `Deseja excluir a manutenção de ${m.tipoServico}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await api.delete(`/api/manutencoes/${m.id}`)
          toast.current?.show({ severity: 'success', summary: 'Excluído', detail: 'Manutenção removida' })
          carregar()
        } catch (err) {
          toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
        }
      },
    })
  }

  const statusTemplate = (rowData: Manutencao) => (
    <Tag value={statusLabel[rowData.status]} severity={statusSeverity[rowData.status]} />
  )

  const custoTemplate = (rowData: Manutencao) =>
    rowData.custoEstimado != null
      ? rowData.custoEstimado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : '—'

  const acoesTemplate = (rowData: Manutencao) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => abrirEditar(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmarDelete(rowData)} />
    </div>
  )

  const veiculoOptions = veiculos.map(v => ({ label: `${v.placa} — ${v.modelo}`, value: v.id }))

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-2xl font-bold m-0">Manutenções</h2>
        <Button label="Nova Manutenção" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <div className="overflow-x-auto">
      <DataTable
        value={manutencoes}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="Nenhuma manutenção encontrada"
        className="shadow-1"
        scrollable
        stripedRows
      >
        <Column field="id" header="ID" style={{ width: '5rem' }} />
        <Column field="veiculoPlaca" header="Veículo" />
        <Column field="tipoServico" header="Serviço" />
        <Column field="dataInicio" header="Início" />
        <Column field="dataFinalizacao" header="Finalização" body={(r: Manutencao) => r.dataFinalizacao ?? '—'} />
        <Column field="custoEstimado" header="Custo" body={custoTemplate} />
        <Column field="status" header="Status" body={statusTemplate} />
        <Column header="Ações" body={acoesTemplate} style={{ width: '8rem' }} />
      </DataTable>
      </div>

      <Dialog
        header={editando ? 'Editar Manutenção' : 'Nova Manutenção'}
        visible={dialogVisivel}
        onHide={() => setDialogVisivel(false)}
        style={{ width: '36rem' }}
        breakpoints={{ '576px': '95vw' }}
        modal
      >
        <div className="flex flex-column gap-3 pt-2">
          <div className="flex flex-column gap-1">
            <label className="font-medium">Veículo</label>
            <Dropdown
              value={form.veiculoId || null}
              options={veiculoOptions}
              onChange={e => setForm(f => ({ ...f, veiculoId: e.value as number }))}
              placeholder="Selecione o veículo"
            />
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="tipoServico" className="font-medium">Tipo de Serviço</label>
            <InputText
              id="tipoServico"
              value={form.tipoServico}
              onChange={e => setForm(f => ({ ...f, tipoServico: e.target.value }))}
              placeholder="Ex: Troca de Óleo"
              maxLength={100}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="dataInicio" className="font-medium">Data Início</label>
              <InputText
                id="dataInicio"
                type="date"
                value={form.dataInicio}
                onChange={e => setForm(f => ({ ...f, dataInicio: e.target.value }))}
              />
            </div>
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="dataFim" className="font-medium">Data Finalização</label>
              <InputText
                id="dataFim"
                type="date"
                value={form.dataFinalizacao ?? ''}
                onChange={e => setForm(f => ({ ...f, dataFinalizacao: e.target.value || undefined }))}
              />
            </div>
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="custo" className="font-medium">Custo Estimado (R$)</label>
            <InputText
              id="custo"
              type="number"
              value={form.custoEstimado != null ? String(form.custoEstimado) : ''}
              onChange={e => setForm(f => ({ ...f, custoEstimado: e.target.value ? parseFloat(e.target.value) : undefined }))}
              placeholder="0.00"
            />
          </div>

          <div className="flex flex-column gap-1">
            <label className="font-medium">Status</label>
            <Dropdown
              value={form.status}
              options={statusOptions}
              onChange={e => setForm(f => ({ ...f, status: e.value as StatusManutencao }))}
              placeholder="Selecione o status"
            />
          </div>

          <div className="flex justify-content-end gap-2 mt-2">
            <Button label="Cancelar" severity="secondary" onClick={() => setDialogVisivel(false)} />
            <Button label="Salvar" icon="pi pi-check" loading={saving} onClick={salvar} />
          </div>
        </div>
      </Dialog>
    </div>
  )
}
