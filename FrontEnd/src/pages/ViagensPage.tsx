import { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { api, normalizeApiError } from '@/utils/api'
import { useApiErrorNavigation } from '@/hooks/useApiErrorNavigation'
import type { Viagem, ViagemRequest, Veiculo } from '@/types'

const emptyForm: ViagemRequest = {
  veiculoId: 0,
  dataSaida: '',
  origem: '',
  destino: '',
}

export default function ViagensPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [viagens, setViagens] = useState<Viagem[]>([])
  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogVisivel, setDialogVisivel] = useState(false)
  const [editando, setEditando] = useState<Viagem | null>(null)
  const [form, setForm] = useState<ViagemRequest>(emptyForm)
  const [saving, setSaving] = useState(false)

  async function carregar() {
    setLoading(true)
    try {
      const [viag, veic] = await Promise.all([
        api.get<Viagem[]>('/api/viagens'),
        api.get<Veiculo[]>('/api/veiculos'),
      ])
      setViagens(viag)
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

  function abrirEditar(v: Viagem) {
    setEditando(v)
    setForm({
      veiculoId: v.veiculoId,
      dataSaida: v.dataSaida.slice(0, 16),
      dataChegada: v.dataChegada?.slice(0, 16),
      origem: v.origem,
      destino: v.destino,
      kmPercorrida: v.kmPercorrida,
    })
    setDialogVisivel(true)
  }

  async function salvar() {
    setSaving(true)
    try {
      if (editando) {
        await api.put<Viagem>(`/api/viagens/${editando.id}`, form)
        toast.current?.show({ severity: 'success', summary: 'Atualizado', detail: 'Viagem atualizada' })
      } else {
        await api.post<Viagem>('/api/viagens', form)
        toast.current?.show({ severity: 'success', summary: 'Criado', detail: 'Viagem criada' })
      }
      setDialogVisivel(false)
      carregar()
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
    } finally {
      setSaving(false)
    }
  }

  function confirmarDelete(v: Viagem) {
    confirmDialog({
      message: `Deseja excluir a viagem de ${v.origem} para ${v.destino}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await api.delete(`/api/viagens/${v.id}`)
          toast.current?.show({ severity: 'success', summary: 'Excluído', detail: 'Viagem removida' })
          carregar()
        } catch (err) {
          toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
        }
      },
    })
  }

  const formatarData = (valor?: string) => {
    if (!valor) return '—'
    return new Date(valor).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const kmTemplate = (rowData: Viagem) =>
    rowData.kmPercorrida != null ? `${rowData.kmPercorrida.toLocaleString('pt-BR')} km` : '—'

  const acoesTemplate = (rowData: Viagem) => (
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
        <h2 className="text-2xl font-bold m-0">Viagens</h2>
        <Button label="Nova Viagem" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <div className="overflow-x-auto">
      <DataTable
        value={viagens}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="Nenhuma viagem encontrada"
        className="shadow-1"
        scrollable
        stripedRows
      >
        <Column field="id" header="ID" style={{ width: '5rem' }} />
        <Column field="veiculoPlaca" header="Veículo" />
        <Column field="origem" header="Origem" />
        <Column field="destino" header="Destino" />
        <Column field="dataSaida" header="Saída" body={(r: Viagem) => formatarData(r.dataSaida)} />
        <Column field="dataChegada" header="Chegada" body={(r: Viagem) => formatarData(r.dataChegada)} />
        <Column field="kmPercorrida" header="KM" body={kmTemplate} />
        <Column header="Ações" body={acoesTemplate} style={{ width: '8rem' }} />
      </DataTable>
      </div>

      <Dialog
        header={editando ? 'Editar Viagem' : 'Nova Viagem'}
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

          <div className="flex gap-3">
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="origem" className="font-medium">Origem</label>
              <InputText
                id="origem"
                value={form.origem}
                onChange={e => setForm(f => ({ ...f, origem: e.target.value }))}
                placeholder="Ex: São Paulo"
                maxLength={100}
              />
            </div>
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="destino" className="font-medium">Destino</label>
              <InputText
                id="destino"
                value={form.destino}
                onChange={e => setForm(f => ({ ...f, destino: e.target.value }))}
                placeholder="Ex: Rio de Janeiro"
                maxLength={100}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="dataSaida" className="font-medium">Data Saída</label>
              <InputText
                id="dataSaida"
                type="datetime-local"
                value={form.dataSaida}
                onChange={e => setForm(f => ({ ...f, dataSaida: e.target.value }))}
              />
            </div>
            <div className="flex flex-column gap-1 flex-1">
              <label htmlFor="dataChegada" className="font-medium">Data Chegada</label>
              <InputText
                id="dataChegada"
                type="datetime-local"
                value={form.dataChegada ?? ''}
                onChange={e => setForm(f => ({ ...f, dataChegada: e.target.value || undefined }))}
              />
            </div>
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="km" className="font-medium">KM Percorrida</label>
            <InputText
              id="km"
              type="number"
              value={form.kmPercorrida != null ? String(form.kmPercorrida) : ''}
              onChange={e => setForm(f => ({ ...f, kmPercorrida: e.target.value ? parseFloat(e.target.value) : undefined }))}
              placeholder="0.00"
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
