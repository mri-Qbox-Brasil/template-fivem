import { useEffect, useState } from 'react'
import { MriCard } from '@mriqbox/ui-kit'
import { Sparkles } from 'lucide-react'
import { fetchNui } from '../context/NuiContext'

interface PluginConfig {
    welcomeMessage?: string
    debug?: boolean
}

/**
 * Hello-world do plugin. Em produção, troque por seu painel real.
 * Em dev (fora do FiveM), fetchNui falha e cai no fallback default.
 */
export function HelloPlugin() {
    const [config, setConfig] = useState<PluginConfig>({})

    useEffect(() => {
        fetchNui<PluginConfig>('adminGetConfig')
            .then((data) => setConfig(data || {}))
            .catch(() => { /* dev fallback */ })
    }, [])

    const message = config.welcomeMessage || 'Hello, Plugin Test!'

    return (
        <div className="mt-6 space-y-4">
            <MriCard className="p-8 flex flex-col items-center justify-center gap-4 text-center">
                <Sparkles className="w-12 h-12 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">{message}</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                    Este é o template base de plugin pro mri_Qadmin. Veja{' '}
                    <code className="font-mono text-primary">PLUGINS.md</code> pra
                    documentação do contrato (manifest, bridge, callbacks).
                </p>
            </MriCard>
        </div>
    )
}
