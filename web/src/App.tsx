import { useEffect, useState } from 'react'
import { MriDashboardLayout, MriPageHeader, MriButton, MriTabs, MriTabletFrame } from '@mriqbox/ui-kit'
import { Box, X, Home, Settings } from 'lucide-react'

import { useIsEmbedded } from './plugin/useIsEmbedded'
import { usePluginBridgeGuest } from './plugin/usePluginBridgeGuest'
import { useAccentColor } from './hooks/useAccentColor'
import { useNuiEvent, fetchNui } from './context/NuiContext'
import { HelloPlugin } from './components/HelloPlugin'
import { ConfigPanel } from './components/ConfigPanel'

type Route = 'home' | 'config'

// Conteudo principal — compartilhado entre standalone e embedded. So muda o
// que esta ao redor (frame externo, dispatch de close).
function PluginContent({ onClose, route, onRouteChange, embedded }: {
    onClose?: () => void
    route: Route
    onRouteChange: (r: Route) => void
    embedded: boolean
}) {
    const subnav = (
        <MriTabs
            items={[
                { label: 'Home', icon: Home, route: 'home' },
                { label: 'Configurações', icon: Settings, route: 'config' },
            ]}
            activeRoute={route}
            onNavigate={(r) => onRouteChange(r as Route)}
            rightContent={!embedded && onClose ? (
                <MriButton variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4 mr-1" /> Fechar (ESC)
                </MriButton>
            ) : undefined}
        />
    )

    return (
        <MriDashboardLayout subnav={subnav}>
            {route === 'home' ? (
                <div className="p-6">
                    <MriPageHeader title="Plugin Test" icon={Box} />
                    <HelloPlugin />
                </div>
            ) : (
                <ConfigPanel />
            )}
        </MriDashboardLayout>
    )
}

// Modo embedded: roda hospedado pelo mri_Qadmin via iframe. Aceita init do
// host e re-aplica tema em runtime.
function EmbeddedMode() {
    const bridge = usePluginBridgeGuest({ defaultAccentColor: '#00E699' })
    const [route, setRoute] = useState<Route>('home')

    useAccentColor(bridge.accentColor)

    if (!bridge.initialized) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background text-muted-foreground text-sm">
                Carregando...
            </div>
        )
    }

    return (
        <PluginContent
            route={route}
            onRouteChange={setRoute}
            embedded
            onClose={() => bridge.requestClose()}
        />
    )
}

// Modo standalone: NUI propria, aberta via /plugintest. Sem bridge — aplica
// accentColor direto do payload do open.
function StandaloneMode() {
    const [open, setOpen] = useState(false)
    const [accentColor, setAccentColor] = useState('#00E699')
    const [route, setRoute] = useState<Route>('home')

    useAccentColor(accentColor)

    useNuiEvent<{ visible: boolean; config?: { accentColor?: string } }>('setVisible', (payload) => {
        setOpen(payload.visible)
        if (payload.config?.accentColor) setAccentColor(payload.config.accentColor)
    })

    useNuiEvent<{ accentColor: string }>('accentColorChanged', (payload) => {
        setAccentColor(payload.accentColor)
    })

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') fetchNui('closeUi', {})
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open])

    if (!open) return null

    return (
        <MriTabletFrame size="lg">
            <div className="flex w-full h-full">
                <PluginContent
                    route={route}
                    onRouteChange={setRoute}
                    embedded={false}
                    onClose={() => fetchNui('closeUi', {})}
                />
            </div>
        </MriTabletFrame>
    )
}

export default function App() {
    const isEmbedded = useIsEmbedded()
    return isEmbedded ? <EmbeddedMode /> : <StandaloneMode />
}
