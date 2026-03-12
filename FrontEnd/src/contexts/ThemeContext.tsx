import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export type Theme =
  | 'lara-light-blue'
  | 'lara-light-indigo'
  | 'lara-light-purple'
  | 'lara-light-teal'
  | 'lara-dark-blue'
  | 'lara-dark-indigo'
  | 'lara-dark-purple'
  | 'lara-dark-teal'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  return ctx
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    return savedTheme || 'lara-light-blue'
  })

  useEffect(() => {
    // Remove o tema anterior
    const link = document.querySelector('link[rel="stylesheet"][href*="theme.css"]') as HTMLLinkElement
    if (link) {
      link.remove()
    }

    // Adiciona o novo tema
    const themeLink = document.createElement('link')
    themeLink.rel = 'stylesheet'
    themeLink.href = `/node_modules/primereact/resources/themes/${theme}/theme.css`
    document.head.appendChild(themeLink)

    // Salva no localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
