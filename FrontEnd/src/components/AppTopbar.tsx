import { useNavigate } from 'react-router-dom'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { Tag } from 'primereact/tag'
import { useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ThemeSelector } from './ThemeSelector'
import '../styles/AppTopbar.css'

interface AppTopbarProps {
  onToggleSidebar: () => void
}

export const AppTopbar = ({ onToggleSidebar }: AppTopbarProps) => {
  const navigate = useNavigate()
  const { user, isDevMode, toggleDevMode, logout } = useAuth()
  const menuRef = useRef<Menu>(null)

  const menuItems = [
    {
      label: isDevMode ? 'Desativar Modo Dev' : 'Ativar Modo Dev',
      icon: 'pi pi-cog',
      command: () => {
        toggleDevMode()
      },
    },
    { separator: true },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        logout()
        navigate('/login')
      },
    },
  ]

  const startContent = (
    <Button
      icon="pi pi-bars"
      rounded
      text
      onClick={onToggleSidebar}
      className="mr-2"
    />
  )

  const endContent = (
    <div className="flex align-items-center gap-3">
      {isDevMode && <Tag value="DEV" severity="warning" />}
      <ThemeSelector />
      <Menu model={menuItems} popup ref={menuRef} id="user_menu" />
      <Button
        onClick={(e) => menuRef.current?.toggle(e)}
        icon={
          <Avatar
            label={user?.name?.charAt(0).toUpperCase()}
            shape="circle"
            size="large"
            className="cursor-pointer"
          />
        }
        className="p-button-text"
      />
    </div>
  )

  return (
    <Toolbar
      className="app-topbar"
      start={startContent}
      center={<h2 className="m-0">LogiTrack Sistema</h2>}
      end={endContent}
    />
  )
}
