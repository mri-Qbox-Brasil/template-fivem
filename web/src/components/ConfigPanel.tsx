import { useCallback, useEffect, useState } from 'react'
import { Settings, Save, RotateCcw } from 'lucide-react'
import {
    MriPageHeader,
    MriCard,
    MriButton,
    MriInput,
    MriSwitch,
    MriSpinner,
} from '@mriqbox/ui-kit'
import { fetchNui } from '../context/NuiContext'

export interface PluginConfig {
    debug: boolean
    welcomeMessage: string
}

const DEFAULTS: PluginConfig = {
    debug: false,
    welcomeMessage: 'Hello, Plugin Test!',
}

/**
 * Aba "Configurações" do plugin. Carrega config persistida em
 * data/config.json via callback Lua, edita em draft, e persiste via save
 * com broadcast pra clients reaplicarem em runtime.
 *
 * Para adicionar settings novos:
 *   1. Bump DEFAULTS aqui
 *   2. Bump DEFAULTS no server/config.lua e shared/config.lua
 *   3. Adicione o input correspondente
 */
export function ConfigPanel() {
    const [config, setConfig] = useState<PluginConfig>(DEFAULTS)
    const [draft, setDraft] = useState<PluginConfig>(DEFAULTS)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const dirty = JSON.stringify(config) !== JSON.stringify(draft)

    useEffect(() => {
        fetchNui<PluginConfig>('adminGetConfig')
            .then((data) => {
                const next = { ...DEFAULTS, ...(data || {}) }
                setConfig(next)
                setDraft(next)
            })
            .catch((err) => console.error('[ConfigPanel] fetch falhou:', err))
            .finally(() => setLoading(false))
    }, [])

    const handleSave = useCallback(async () => {
        setSaving(true)
        try {
            const result = await fetchNui<{ success: boolean; config?: PluginConfig }>(
                'adminSaveConfig',
                draft
            )
            if (result?.success && result.config) {
                setConfig(result.config)
                setDraft(result.config)
            }
        } catch (err) {
            console.error('[ConfigPanel] save falhou:', err)
        } finally {
            setSaving(false)
        }
    }, [draft])

    const handleReset = useCallback(() => setDraft(config), [config])

    const updateField = <K extends keyof PluginConfig>(key: K, value: PluginConfig[K]) => {
        setDraft((prev) => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <MriSpinner />
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            <MriPageHeader title="Configurações" icon={Settings}>
                <MriButton variant="outline" onClick={handleReset} disabled={!dirty || saving}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetar
                </MriButton>
                <MriButton onClick={handleSave} disabled={!dirty || saving} isLoading={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                </MriButton>
            </MriPageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MriCard className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-sm">Modo debug</p>
                            <p className="text-xs text-muted-foreground">
                                Habilita logs de diagnostico no console F8.
                            </p>
                        </div>
                        <MriSwitch
                            checked={draft.debug}
                            onCheckedChange={(v: boolean) => updateField('debug', v)}
                            aria-label="Modo debug"
                        />
                    </div>
                </MriCard>

                <MriCard className="p-4 space-y-2">
                    <p className="font-semibold text-sm mb-1">Mensagem de boas-vindas</p>
                    <p className="text-xs text-muted-foreground mb-2">
                        Texto exibido na tela inicial do plugin.
                    </p>
                    <MriInput
                        value={draft.welcomeMessage}
                        onChange={(e) => updateField('welcomeMessage', e.target.value)}
                        placeholder="Hello, Plugin Test!"
                    />
                </MriCard>
            </div>
        </div>
    )
}
