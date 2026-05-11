-- NUI command standalone (modo "abrir a UI sozinho", sem passar pelo Qadmin).
-- Quando embedded dentro do Qadmin, o iframe abre direto via URL — esse
-- comando aqui nao e necessario, mas mantemos por compat e dev/debug.

local isOpen = false

local function openUi()
    if isOpen then return end
    isOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({ action = 'setVisible', data = { visible = true, config = GetPluginConfig and GetPluginConfig() or {} } })
end

local function closeUi()
    if not isOpen then return end
    isOpen = false
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'setVisible', data = { visible = false } })
end

RegisterCommand('plugintest', openUi, false)

RegisterNUICallback('closeUi', function(_, cb)
    closeUi()
    cb({ ok = true })
end)

-- Aba "Configurações" do painel admin — fetch + save dos settings.
RegisterNUICallback('adminGetConfig', function(_, cb)
    local cfg = lib.callback.await('plugintest:server:getConfig', false)
    cb(cfg or {})
end)

RegisterNUICallback('adminSaveConfig', function(payload, cb)
    local ok, result = lib.callback.await('plugintest:server:saveConfig', false, payload)
    cb({ success = ok == true, config = ok and result or nil })
end)

-- Runtime: server broadcasta quando config muda. Apenas log por padrao —
-- substitua aqui pela logica do seu plugin (eg recarregar caches, blips, etc).
RegisterNetEvent('plugintest:client:configChanged', function(newConfig)
    if type(newConfig) ~= 'table' then return end
    if Config and Config.Debug then
        print('[plugintest] Config atualizado em runtime: ' .. json.encode(newConfig))
    end
end)

-- Runtime: convar `mri:color` mudou — repassa pra NUI re-aplicar o tema.
RegisterNetEvent('plugintest:client:accentColorChanged', function(newColor)
    SendNUIMessage({ action = 'accentColorChanged', data = { accentColor = newColor } })
end)
