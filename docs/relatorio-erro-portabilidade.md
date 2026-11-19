# Relatório Técnico — Falha de Portabilidade (app não roda em outros computadores)

**Projeto:** Portal Acadêmico Mobile (Expo SDK 58 · React Native 0.88.1 · React 19.3)
**Data da auditoria:** 19/11/2026

---

## 1. Metodologia

Foram verificados: caminhos absolutos, variáveis de ambiente/credenciais, consistência do `package-lock.json` (`npm ci` limpo), compatibilidade das versões com o SDK 58 (`expo/bundledNativeModules.json`), `engines` dos pacotes instalados, scripts específicos de SO, sensibilidade a maiúsculas/minúsculas nos imports (Linux/macOS), `.gitignore`, configuração de rede do Expo e o `babel.config.js`. Também foi executado `tsc --noEmit`.

### O que **não** era problema

| Item | Resultado |
| :--- | :--- |
| Caminhos absolutos (`C:\Users`, `/home`) | Nenhum no código ou nas configs |
| `.env` / chaves de API / banco | Não há uso de `process.env`; app 100% mock, sem backend |
| Lockfile × `package.json` | Consistente (`npm ci` instala 496 pacotes sem erro) |
| Versões vs. SDK 58 | Todas compatíveis com `bundledNativeModules.json` |
| Scripts específicos de SO | Nenhum (`expo start ...`) |
| Imports com caixa diferente do arquivo | Nenhum |
| Arquivos necessários bloqueados no `.gitignore` | Nenhum (assets e fontes versionados) |
| Erros de tipagem | Nenhum |

---

## 2. Causa raiz

**Incompatibilidade de versão do Node.js, não documentada nem validada pelo projeto.**

- O Expo `58.0.25` exige Node `^22.13.0 || ^24.3.0 || ^26.0.0 || >=27`; o React Native `0.88.1` e o Metro `0.87.1` exigem `^22.13.0 || ^24.3.0 || >=26`.
- O desenvolvedor usa Node **24.21**, por isso funcionava localmente.
- O `README.md` informava "Node.js v20+", o que induzia a instalar versões que o Metro/Expo CLI não suportam (Node 18, 20 ou 22.0–22.12), resultando em falha na instalação (`EBADENGINE`) ou na inicialização do bundler.
- O projeto não tinha `engines`, `.nvmrc` nem `.npmrc`, então nada impedia ou avisava sobre o problema.

### Fatores contribuintes

1. **Plugin Babel redundante:** `babel.config.js` declarava `react-native-reanimated/plugin`. Com Expo SDK 58 + Reanimated 4, o `babel-preset-expo` já configura o plugin do Worklets automaticamente; o caminho manual é apenas um alias legado (`require('react-native-worklets/plugin')`) e pode duplicar a transformação.
2. **Rede:** `expo start` usa o IP da LAN. Em redes diferentes, Wi-Fi com isolamento de clientes (comum em faculdades) ou firewall, o celular não alcança o servidor. Não havia script/orientação para `--tunnel`.
3. **Dependências duplicadas:** `typescript` e `@types/react` estavam em `dependencies` **e** `devDependencies`.
4. **README incompleto:** sem `git clone`, sem versão correta de Node, sem requisito de versão do Expo Go (SDK 58), sem seção de troubleshooting, sem menção às variáveis de ambiente, árvore de pastas desatualizada.
5. **Sem `.env.example`/regras de `.env` no `.gitignore`:** só `.env*.local` era ignorado (um `.env` poderia ser commitado por engano) e não havia documentação de que nenhuma variável é necessária.
6. **Fins de linha:** sem `.gitattributes`, risco de CRLF/LF divergente entre Windows e Linux/macOS.

---

## 3. Arquivos afetados

| Arquivo | Problema |
| :--- | :--- |
| `package.json` | Sem `engines`; dependências duplicadas; sem scripts de túnel/typecheck |
| `package-lock.json` | Metadados do pacote raiz desatualizados em relação ao `package.json` |
| `babel.config.js` | Plugin do Reanimated declarado manualmente (redundante) |
| `README.md` | Pré-requisito de Node incorreto e instruções incompletas |
| `.gitignore` | Regra de `.env` insuficiente |
| `docs/01-arquitetura-e-setup.md` | Documentava o plugin Babel manual |
| *(ausentes)* `.nvmrc`, `.npmrc`, `.env.example`, `.gitattributes` | Não existiam |

---

## 4. Solução aplicada

| Arquivo | Alteração |
| :--- | :--- |
| `package.json` | Adicionado `"engines": { "node": "^22.13.0 \|\| ^24.3.0 \|\| >=26.0.0" }`; removidas duplicatas (`typescript`, `@types/react` ficam só em `devDependencies`); novos scripts `start:clear`, `start:lan`, `start:tunnel`, `typecheck`, `doctor` |
| `package-lock.json` | Regenerado com `npm install --package-lock-only`: **somente** metadados do pacote raiz mudaram, nenhuma versão foi alterada |
| `babel.config.js` | Removido o plugin manual; mantido apenas `babel-preset-expo` |
| `.nvmrc` *(novo)* | `24` |
| `.npmrc` *(novo)* | `engine-strict=true` — `npm install`/`npm ci` falham cedo com Node incompatível |
| `.env.example` *(novo)* | Documenta que nenhuma variável é necessária; orienta o uso de `EXPO_PUBLIC_*` sem segredos |
| `.gitignore` | `.env`, `.env.*` ignorados, com exceção de `!.env.example` |
| `.gitattributes` *(novo)* | `* text=auto eol=lf` e arquivos de imagem como binários |
| `README.md` | Seção "Como Instalar e Executar" reescrita: pré-requisitos de versão, clone, `npm ci`, variáveis de ambiente, scripts, solução de problemas; árvore de pastas atualizada |
| `docs/01-arquitetura-e-setup.md` | Seção do Babel atualizada |

Nenhuma credencial foi criada, lida ou exposta.

---

## 5. Observações

- O arquivo `.claude/settings.json` (configuração local de ferramenta do desenvolvedor, não do app) foi removido do índice do Git (`git rm --cached`, o arquivo local foi mantido) e `.claude/` foi adicionado ao `.gitignore`. A mudança precisa de commit.
- Se o app for testado em um celular com Expo Go desatualizado, aparecerá "incompatible with this version of Expo Go"; basta atualizar o Expo Go (documentado no README).
