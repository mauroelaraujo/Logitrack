import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { AuthProvider } from '@/contexts/AuthContext'
import PrivateRoute from '@/components/PrivateRoute'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import { AppLayout } from '@/layouts/AppLayout'
import VeiculosPage from '@/pages/VeiculosPage'
import ViagensPage from '@/pages/ViagensPage'
import ManutencoesPage from '@/pages/ManutencoesPage'
import { NotFoundPage, ForbiddenPage, ServerErrorPage } from '@/pages/ErrorPages'
import { ThemeProvider } from '@/contexts/ThemeContext'
export default function App() {
  return (
    <PrimeReactProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registrar" element={<RegisterPage />} />
              <Route path="/403" element={<ForbiddenPage />} />
              <Route path="/500" element={<ServerErrorPage />} />

              {/* Rotas protegidas */}

              <Route element={<PrivateRoute />}>
                <Route element={<AppLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="veiculos" element={<VeiculosPage />} />
                  <Route path="viagens" element={<ViagensPage />} />
                  <Route path="manutencoes" element={<ManutencoesPage />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </PrimeReactProvider>
  )
}
