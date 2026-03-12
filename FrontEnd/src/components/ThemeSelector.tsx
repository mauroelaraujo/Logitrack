import { useRef } from 'react'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import type { MenuItem } from 'primereact/menuitem'
import { useTheme } from '../hooks/useTheme'

//type Theme = 'lara-light-blue' | 'lara-light-indigo' | 'lara-light-purple' | 'lara-light-teal' | 'lara-dark-blue' | 'lara-dark-indigo' | 'lara-dark-purple' | 'lara-dark-teal'

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  const menuRef = useRef<Menu>(null)

  const themes: MenuItem[] = [
    {
      label: 'Lara Light Blue',
      command: () => setTheme('lara-light-blue'),
      icon: theme === 'lara-light-blue' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Light Indigo',
      command: () => setTheme('lara-light-indigo'),
      icon: theme === 'lara-light-indigo' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Light Purple',
      command: () => setTheme('lara-light-purple'),
      icon: theme === 'lara-light-purple' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Light Teal',
      command: () => setTheme('lara-light-teal'),
      icon: theme === 'lara-light-teal' ? 'pi pi-check' : undefined,
    },
    { separator: true },
    {
      label: 'Lara Dark Blue',
      command: () => setTheme('lara-dark-blue'),
      icon: theme === 'lara-dark-blue' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Dark Indigo',
      command: () => setTheme('lara-dark-indigo'),
      icon: theme === 'lara-dark-indigo' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Dark Purple',
      command: () => setTheme('lara-dark-purple'),
      icon: theme === 'lara-dark-purple' ? 'pi pi-check' : undefined,
    },
    {
      label: 'Lara Dark Teal',
      command: () => setTheme('lara-dark-teal'),
      icon: theme === 'lara-dark-teal' ? 'pi pi-check' : undefined,
    },
  ]

  return (
    <>
      <Button
        icon="pi pi-palette"
        rounded
        text
        onClick={(e) => menuRef.current?.toggle(e)}
        tooltip="Selecionar Tema"
      />
      <Menu model={themes} popup ref={menuRef} id="theme_menu" />
    </>
  )
}
