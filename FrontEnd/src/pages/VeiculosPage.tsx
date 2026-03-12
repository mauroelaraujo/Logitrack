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
import type { Veiculo, VeiculoRequest, TipoVeiculo } from '@/types'

const tipoOptions = [
  { label: 'Leve', value: 'LEVE' },
  { label: 'Pesado', value: 'PESADO' },
]

const emptyForm: VeiculoRequest = { placa: '', modelo: '', tipo: 'LEVE', ano: new Date().getFullYear() }

export default function VeiculosPage() {
  const toast = useRef<Toast>(null)
  const { handleError } = useApiErrorNavigation()

  const [veiculos, setVeiculos] = useState<Veiculo[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogVisivel, setDialogVisivel] = useState(false)
  const [editando, setEditando] = useState<Veiculo | null>(null)
  const [form, setForm] = useState<VeiculoRequest>(emptyForm)
  const [saving, setSaving] = useState(false)

  async function carregar() {
    setLoading(true)
    try {
      const data = await api.get<Veiculo[]>('/api/veiculos')
      setVeiculos(data)
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

  function abrirEditar(v: Veiculo) {
    setEditando(v)
    setForm({ placa: v.placa, modelo: v.modelo, tipo: v.tipo, ano: v.ano })
    setDialogVisivel(true)
  }

  async function salvar() {
    setSaving(true)
    try {
      if (editando) {
        await api.put<Veiculo>(`/api/veiculos/${editando.id}`, form)
        toast.current?.show({ severity: 'success', summary: 'Atualizado', detail: 'Veículo atualizado com sucesso' })
      } else {
        await api.post<Veiculo>('/api/veiculos', form)
        toast.current?.show({ severity: 'success', summary: 'Criado', detail: 'Veículo criado com sucesso' })
      }
      setDialogVisivel(false)
      carregar()
    } catch (err) {
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
    } finally {
      setSaving(false)
    }
  }

  function confirmarDelete(v: Veiculo) {
    confirmDialog({
      message: `Deseja excluir o veículo ${v.placa}?`,
      header: 'Confirmar exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Excluir',
      rejectLabel: 'Cancelar',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await api.delete(`/api/veiculos/${v.id}`)
          toast.current?.show({ severity: 'success', summary: 'Excluído', detail: 'Veículo removido' })
          carregar()
        } catch (err) {
          toast.current?.show({ severity: 'error', summary: 'Erro', detail: normalizeApiError(err).message })
        }
      },
    })
  }

  const tipoTemplate = (rowData: Veiculo) => (
    <Tag value={rowData.tipo} severity={rowData.tipo === 'LEVE' ? 'info' : 'warning'} />
  )

  const acoesTemplate = (rowData: Veiculo) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => abrirEditar(rowData)} />
      <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmarDelete(rowData)} />
    </div>
  )

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="flex justify-content-between align-items-center mb-4">
        <h2 className="text-2xl font-bold m-0">Veículos</h2>
        <Button label="Novo Veículo" icon="pi pi-plus" onClick={abrirNovo} />
      </div>

      <DataTable
        value={veiculos}
        loading={loading}
        paginator
        rows={10}
        emptyMessage="Nenhum veículo encontrado"
        className="shadow-1"
      >
        <Column field="id" header="ID" style={{ width: '5rem' }} />
        <Column field="placa" header="Placa" />
        <Column field="modelo" header="Modelo" />
        <Column field="tipo" header="Tipo" body={tipoTemplate} />
        <Column field="ano" header="Ano" />
        <Column header="Ações" body={acoesTemplate} style={{ width: '8rem' }} />
      </DataTable>

      <Dialog
        header={editando ? 'Editar Veículo' : 'Novo Veículo'}
        visible={dialogVisivel}
        onHide={() => setDialogVisivel(false)}
        style={{ width: '32rem' }}
        modal
      >
        <div className="flex flex-column gap-3 pt-2">
          <div className="flex flex-column gap-1">
            <label htmlFor="placa" className="font-medium">Placa</label>
            <InputText
              id="placa"
              value={form.placa}
              onChange={e => setForm(f => ({ ...f, placa: e.target.value }))}
              placeholder="ABC-1234"
              maxLength={10}
            />
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="modelo" className="font-medium">Modelo</label>
            <InputText
              id="modelo"
              value={form.modelo}
              onChange={e => setForm(f => ({ ...f, modelo: e.target.value }))}
              placeholder="Ex: Fiorino"
              maxLength={50}
            />
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="tipo" className="font-medium">Tipo</label>
            <Dropdown
              inputId="tipo"
              value={form.tipo}
              options={tipoOptions}
              onChange={e => setForm(f => ({ ...f, tipo: e.value as TipoVeiculo }))}
              placeholder="Selecione o tipo"
            />
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="ano" className="font-medium">Ano</label>
            <InputText
              id="ano"
              type="number"
              value={String(form.ano)}
              onChange={e => setForm(f => ({ ...f, ano: parseInt(e.target.value) }))}
              placeholder="2024"
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
