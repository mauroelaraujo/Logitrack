import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Card } from 'primereact/card'
import { useAuth } from '@/contexts/AuthContext'
import { api, normalizeApiError } from '@/utils/api'
import type { AuthResponse } from '@/types'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)
    setLoading(true)
    try {
      const data = await api.post<AuthResponse>('/api/auth/login', { email, senha })
      signIn(data)
      navigate('/', { replace: true })
    } catch (err) {
      setErro(normalizeApiError(err).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
      <Card className="w-full md:w-4 p-4 shadow-4">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-primary m-0">LogiTrack</h2>
          <p className="text-500 mt-2">Entre com sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-column gap-3">
          <div className="flex flex-column gap-1">
            <label htmlFor="email" className="font-medium">E-mail</label>
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-1">
            <label htmlFor="senha" className="font-medium">Senha</label>
            <Password
              inputId="senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••"
              feedback={false}
              toggleMask
              required
              className="w-full"
              inputClassName="w-full"
            />
          </div>

          {erro && <Message severity="error" text={erro} className="w-full" />}

          <Button
            type="submit"
            label="Entrar"
            icon="pi pi-sign-in"
            loading={loading}
            className="w-full mt-2"
          />
        </form>

        <p className="text-center mt-3 text-sm">
          Não tem conta?{' '}
          <Link to="/registrar" className="text-primary font-medium">
            Cadastre-se
          </Link>
        </p>
      </Card>
    </div>
  )
}
