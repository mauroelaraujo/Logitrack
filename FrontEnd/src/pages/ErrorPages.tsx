import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

interface ErrorPageProps {
  status: number
  title: string
  description: string
}

function ErrorPage({ status, title, description }: ErrorPageProps) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen surface-ground gap-3">
      <span className="text-8xl font-bold text-primary">{status}</span>
      <h2 className="text-2xl font-semibold m-0">{title}</h2>
      <p className="text-500">{description}</p>
      <Button label="Voltar ao início" icon="pi pi-home" onClick={() => navigate('/')} />
    </div>
  )
}

export function NotFoundPage() {
  return <ErrorPage status={404} title="Página não encontrada" description="O recurso solicitado não existe." />
}

export function ForbiddenPage() {
  return <ErrorPage status={403} title="Acesso negado" description="Você não tem permissão para acessar esta página." />
}

export function ServerErrorPage() {
  return <ErrorPage status={500} title="Erro interno" description="Ocorreu um erro no servidor. Tente novamente mais tarde." />
}
