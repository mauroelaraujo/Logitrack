import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from 'primereact/button'

export default function MainLayout() {
  const { email, role, signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/login', { replace: true })
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="flex flex-column surface-100 border-right-1 surface-border" style={{ width: '220px', minWidth: '220px' }}>
        <div className="p-4 border-bottom-1 surface-border">
          <span className="text-xl font-bold text-primary">LogiTrack</span>
        </div>

        <nav className="flex flex-column gap-1 p-2 flex-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `p-3 border-round no-underline flex align-items-center gap-2 text-700 font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:surface-200'}`
            }
          >
            <i className="pi pi-home" />
            Dashboard
          </NavLink>
          <NavLink
            to="/veiculos"
            className={({ isActive }) =>
              `p-3 border-round no-underline flex align-items-center gap-2 text-700 font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:surface-200'}`
            }
          >
            <i className="pi pi-car" />
            Veículos
          </NavLink>
          <NavLink
            to="/viagens"
            className={({ isActive }) =>
              `p-3 border-round no-underline flex align-items-center gap-2 text-700 font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:surface-200'}`
            }
          >
            <i className="pi pi-map" />
            Viagens
          </NavLink>
          <NavLink
            to="/manutencoes"
            className={({ isActive }) =>
              `p-3 border-round no-underline flex align-items-center gap-2 text-700 font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:surface-200'}`
            }
          >
            <i className="pi pi-wrench" />
            Manutenções
          </NavLink>
        </nav>

        <div className="p-3 border-top-1 surface-border">
          <div className="text-sm text-600 mb-1 white-space-nowrap overflow-hidden text-overflow-ellipsis">{email}</div>
          {role && <div className="text-xs text-500 mb-2">{role}</div>}
          <Button
            label="Sair"
            icon="pi pi-sign-out"
            severity="secondary"
            size="small"
            className="w-full"
            onClick={handleSignOut}
          />
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-auto surface-ground">
        <Outlet />
      </main>
    </div>
  )
}
