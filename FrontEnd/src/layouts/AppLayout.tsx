import { Outlet, useNavigate } from 'react-router-dom'
import { AppTopbar } from '../components/AppTopbar'
import { Sidebar } from 'primereact/sidebar'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { useAuth } from '../hooks/useAuth'
import '../styles/AppLayout.css'

export const AppLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(() => window.innerWidth >= 992)
  const navigate = useNavigate()
  useAuth()

  function navigateTo(path: string) {
    navigate(path)
    setSidebarVisible(false)
  }



  return (
    <div className="app-layout">
      <AppTopbar onToggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      <div className="layout-main">
        <Sidebar
          visible={sidebarVisible}
          onHide={() => setSidebarVisible(false)}
          className="layout-sidebar"
        >
          <div className="sidebar-menu">
            <Button
              label="Inicio"
              icon="pi pi-home"
              className="p-button-text w-full justify-content-start"
              onClick={() => navigateTo('/')}
            />
            



            <Accordion multiple className="mt-3" activeIndex={null}>
              <AccordionTab header="Cadastros">
                <Button
                  label="Veiculos"
                  icon="pi pi-database"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/veiculos')}
                />
                <Accordion multiple className="mt-3" activeIndex={null}>
                  
                </Accordion>
              </AccordionTab>
            </Accordion>

<Accordion multiple className="mt-3" activeIndex={null}>
              <AccordionTab header="Operações">
                <Button
                  label="Viagens"
                  icon="pi pi-building"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/viagens')}
                />
                <Button
                  label="Manutenções"
                  icon="pi pi-box"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/manutencoes')}
                />
                <Accordion multiple className="mt-3" activeIndex={null}>
                  
                </Accordion>
              </AccordionTab>
            </Accordion>
<Accordion multiple className="mt-3" activeIndex={null}>
              <AccordionTab header="Consultas">
                <Button
                  label="KM Percorridos"
                  icon="pi pi-chart-bar"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/consulta-km')}
                />
                <Button
                  label="Viagens por Tipo"
                  icon="pi pi-car"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/consulta-viagens-por-tipo')}
                />
                <Button
                  label="Próximas Manutenções"
                  icon="pi pi-wrench"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/consulta-proximas-manutencoes')}
                />
                <Button
                  label="Projeção Financeira"
                  icon="pi pi-dollar"
                  className="p-button-text w-full justify-content-start"
                  onClick={() => navigateTo('/consulta-projecao-financeira')}
                />
                <Accordion multiple className="mt-3" activeIndex={null}>
                  
                </Accordion>
              </AccordionTab>
            </Accordion>
          </div>
        </Sidebar>
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
