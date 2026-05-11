# Plugin Test — Template de plugin pro mri_Qadmin

Branch `react-qadmin-plugin` do template-fivem. Forka isso pra criar um plugin que:

- Aparece no sidebar do `mri_Qadmin` (icone + label).
- Roda dual-mode: standalone via NUI command **e** embedded num iframe do Qadmin.
- Tem aba "Configurações" persistida em `data/config.json`, com broadcast em runtime.
- Usa `@mriqbox/ui-kit` pré-baked com tema shadcn alinhado com o accent da suite (`mri:color` convar).

## Como rodar

1. **Renomeie** referencias `plugintest` → `meuplugin` em:
   - `fxmanifest.lua` (description)
   - `server/main.lua` (`id`, `label`, `icon`, `requiredPerms`)
   - `server/config.lua` (`isAdmin`, callbacks `plugintest:server:*`)
   - `client/main.lua` (callbacks + `RegisterCommand`)
2. **`pnpm install`** em `web/`.
3. **`pnpm build`** em `web/` — sai em `html/` (relativo a raiz do resource).
4. Inicia o resource. Vai aparecer no sidebar do Qadmin se ele estiver rodando + se o player tiver `meuplugin.admin` ou `command` ACE.
5. Standalone: `/plugintest` (renomeie pro seu nome).

## Arquitetura

```
client/main.lua          NUI command + callbacks (config get/save)
server/main.lua          Registro do plugin no Qadmin (export RegisterPlugin)
server/config.lua        Storage de data/config.json + broadcast
shared/config.lua        Defaults + GetConvar('mri:color') compartilhado
data/config.json         Persistencia (commit no repo como seed)
web/src/
├── App.tsx              Dual-mode: EmbeddedMode | StandaloneMode
├── plugin/
│   ├── types.ts                 Contrato do bridge (drift 1:1 com Qadmin)
│   ├── useIsEmbedded.ts         Detecta ?embedded=1 (NAO usar window.self)
│   └── usePluginBridgeGuest.ts  Bridge postMessage (ready/init/theme/close)
├── hooks/useAccentColor.ts      Aplica hex → --primary + --ring HSL
├── components/HelloPlugin.tsx   Conteudo da rota "home"
└── components/ConfigPanel.tsx   Conteudo da rota "config"
```

## Protocolo do bridge

Quando hosted no Qadmin:

1. Plugin monta → `usePluginBridgeGuest` manda `mri-plugin/ready` pro parent.
2. Host responde com `mri-plugin/init` (`accentColor`, `locale`, `perms`).
3. Runtime: convar `mri:color` muda → host manda `mri-plugin/theme-changed`.
4. User clica X interno → plugin manda `mri-plugin/request-close`.
5. Se host quer fechar o plugin (raro) → manda `mri-plugin/close`.

Standalone, o bridge fica sem parent — `sendToHost` retorna `false` silenciosamente.

## Manifest do plugin

```lua
exports['mri_Qadmin']:RegisterPlugin({
    id = 'meuplugin',                  -- kebab-case unico
    label = 'Meu Plugin',              -- texto no sidebar
    icon = 'box',                      -- nome lucide kebab-case
    resource = GetCurrentResourceName(),
    htmlPath = 'html/index.html',      -- nao omitir se voce builda pra html/
    requiredPerms = { 'meuplugin.admin', 'command' }, -- OR semantic
    description = 'Descricao curta',
})
```

Sem `htmlPath`, o host usa `web/build/index.html` por compat.

## Gotchas que ja foram pegos

- **`window.self !== window.top` da true sempre no CEF do FiveM** (NUI ja e iframed). Use `?embedded=1` como sinal.
- **`useNuiEvent` espera `event.data.data`** — o Lua precisa mandar `SendNUIMessage({ action='X', data={...} })`, nao o payload solto.
- **`--ring` precisa atualizar junto com `--primary`** quando o accent muda, senao o focus state dos inputs fica preso na cor antiga.
- **`no-scrollbar` nao e Tailwind built-in** — esta definido em `styles.css` (usado pelos MriTabs/MriTopbar do kit).
- **`backdrop-blur-*` nao renderiza no CEF do FiveM** — evite usar.
- **ACE com OR semantic** — listar `command` cobre god/console como fallback alem do ace especifico.

## CI/CD

A toolchain do template (semantic-release + generate-docs) continua identica. Veja `README.md` da raiz.

## Adicionando um novo setting na aba Configurações

1. **`server/config.lua`** — adiciona em `DEFAULTS`.
2. **`shared/config.lua`** — adiciona em `Config = { ... = get('chave', default) }`.
3. **`web/src/components/ConfigPanel.tsx`** — adiciona em `DEFAULTS` + cria um input/switch/select.

O `applyDefaults` no Lua e o spread `{ ...DEFAULTS, ...data }` no TS fazem forward-compat — installs antigos com JSON sem a chave nova caem nos defaults sem quebrar.
