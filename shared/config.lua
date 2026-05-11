-- Settings tunaveis pelo admin via /plugintest (aba Configurações). Lidos de
-- data/config.json no boot — se o arquivo nao existir ou tiver chave faltando,
-- usa estes defaults. Mexer aqui muda o comportamento out-of-the-box pra
-- novas instalacoes; servidores ja rodando tem o JSON proprio.
Config = Config or {}

local function loadFromDisk()
    local raw = LoadResourceFile(GetCurrentResourceName(), 'data/config.json')
    if not raw or raw == '' then return {} end
    local ok, parsed = pcall(json.decode, raw)
    return (ok and type(parsed) == 'table') and parsed or {}
end

local userConfig = loadFromDisk()

local function get(key, default)
    if userConfig[key] ~= nil then return userConfig[key] end
    return default
end

-- Tunavel pelo admin (data/config.json) ↓
Config.Debug = get('debug', false)
Config.WelcomeMessage = get('welcomeMessage', 'Hello, Plugin Test!')

-- Code-only (nao editavel via UI) ↓
-- Cor de destaque (header, item selecionado). Le primeiro da convar global
-- `mri:color` (suite MRI compartilha o tema) e cai no default abaixo.
Config.AccentColor = GetConvar('mri:color', '#00E699')

return Config
