# 🎓 Portal Acadêmico Mobile

Aplicativo mobile completo desenvolvido em **React Native com Expo e TypeScript**, utilizando arquitetura de **Navegação Híbrida (Stack + Drawer + Bottom Tabs)** com **React Navigation v7**.

Projetado para estudantes do curso de **Análise e Desenvolvimento de Sistemas**, o aplicativo permite consultar disciplinas matriculadas, ementas, cálculo automático de médias e frequência (com validação de aprovação), gerenciamento interativo de atividades acadêmicas (CRUD em memória) e personalização de perfil.

---

## 🚀 Tecnologias Utilizadas

- **React Native** (`0.88.1`) & **Expo SDK 58** (Compatível com **Expo Go**)
- **TypeScript** (Configuração estrita `strict: true`)
- **React Navigation v7**:
  - `@react-navigation/native`
  - `@react-navigation/native-stack` (Fluxo de Login e Master-Detail de Disciplinas)
  - `@react-navigation/drawer` (Menu lateral institucional e Logout com Modal)
  - `@react-navigation/bottom-tabs` (Navegação principal: *Início*, *Disciplinas*, *Notas* e *Perfil*)
- **Módulos Nativos & UI**:
  - `react-native-gesture-handler` & `react-native-reanimated`
  - `react-native-safe-area-context` (`useSafeAreaInsets` para suporte Android Edge-to-Edge)
  - `react-native-screens`
  - `@expo/vector-icons` (`Ionicons`)

---

## 📂 Estrutura de Pastas

```text
portal-academico/
├── assets/                          # Ícones e recursos visuais do app
├── docs/                            # Documentação técnica detalhada por etapa
│   ├── 01-arquitetura-e-setup.md
│   ├── 01-arquitetura-navegacao.md
│   ├── 02-checklist-requisitos.md
│   ├── 02-regras-negocio.md
│   ├── 03-changelog-etapas.md
│   ├── 03-fluxo-navegacao.md
│   ├── 04-modulo-atividades.md
│   ├── 05-regras-notas-frequencia.md
│   ├── 06-guia-testes-entrega.md
│   ├── 07-guia-atividade-2-manuscrita.md
│   └── relatorio-erro-portabilidade.md
├── src/
│   ├── components/                  # Diretório reservado para componentes reutilizáveis
│   ├── data/
│   │   ├── mockDisciplinas.ts       # 6 disciplinas reais com notas, frequência e ementas
│   │   └── mockData.ts              # Dados iniciais de apoio
│   ├── navigation/
│   │   ├── RootNavigator.tsx        # Stack Raiz (Login -> MainDrawer -> Detalhes)
│   │   ├── MainDrawer.tsx           # Drawer lateral customizado + Modal de Logout
│   │   ├── MainTabs.tsx             # Bottom Tabs (Início, Disciplinas, Notas, Perfil)
│   │   └── DisciplinasStack.tsx     # Stack interno (DisciplinasList -> Detalhes)
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Autenticação institucional com validação
│   │   ├── HomeScreen.tsx           # Dashboard com indicadores e atalhos rápidos
│   │   ├── DisciplinasScreen.tsx    # Lista de disciplinas em FlatList
│   │   ├── DetalhesScreen.tsx       # Ementa, notas, barra de frequência e diagnóstico
│   │   ├── NotasScreen.tsx          # Boletim com cálculo automático de aprovação
│   │   ├── AtividadesScreen.tsx     # CRUD de atividades com checkbox e Modal de exclusão
│   │   ├── PerfilScreen.tsx         # Edição de nome em tempo real, Switch e Logout
│   │   ├── ConfiguracoesScreen.tsx  # Preferências do sistema
│   │   └── SobreScreen.tsx          # Informações institucionais e ficha técnica
│   └── types/
│       ├── index.ts                 # Interfaces (Disciplina, Atividade) e ParamLists
│       ├── academic.ts              # Re-exportação de tipos de domínio
│       └── navigation.ts            # Re-exportação de tipos de rotas
├── App.tsx                          # Componente raiz (GestureHandlerRootView + SafeAreaProvider)
├── index.ts                         # Ponto de entrada com import prioritário do Gesture Handler
├── babel.config.js                  # Preset Expo (o plugin do Reanimated/Worklets é automático)
├── .nvmrc / .npmrc                  # Versão do Node e validação estrita de engines
├── .env.example                     # Documenta que nenhuma variável de ambiente é necessária
├── package.json                     # Dependências, scripts e engines (Node)
└── tsconfig.json                    # Configuração do TypeScript
```

---

## 📐 Principais Funcionalidades e Regras de Negócio

1. **Navegação Híbrida Completa**:
   - Hierarquia `RootStack -> MainDrawer -> MainTabs -> DisciplinasStack`.
   - Passagem de parâmetros fortemente tipada para `Detalhes: { disciplina: Disciplina }` tanto pela aba **Disciplinas** quanto pela aba **Notas**.
2. **Cálculo Automático de Média e Critério de Aprovação**:
   - Fórmula: `media = (nota1 + nota2) / 2`.
   - Regra estrita: **Aprovado** se `media >= 7.0` **E** `frequencia >= 75%`; caso contrário, **Reprovado**.
3. **Gerenciador de Atividades (`useState` + `FlatList` + `Modal`)**:
   - Cadastro de novas atividades com validação de título obrigatório.
   - Alternância entre *Pendente* e *Concluída* com texto riscado e badge verde.
   - Exclusão protegida por `Modal` de confirmação exibindo o título da atividade.
4. **Perfil do Estudante e Segurança de Sessão**:
   - Edição de nome em tempo real via `useState` e `Modal`.
   - `Switch` funcional de notificações acadêmicas com feedback visual de status.
   - Encerramento de sessão (**Sair**) com confirmação via `Modal` e limpeza da pilha de rotas (`navigation.reset({ index: 0, routes: [{ name: 'Login' }] })`).

---

## 🛠️ Como Instalar e Executar (do zero, em máquina limpa)

### Pré-requisitos

| Item | Versão exigida | Observação |
| :--- | :--- | :--- |
| **Node.js** | `^22.13.0`, `^24.3.0` ou `>=26` (recomendado: **24 LTS**) | Exigência do Expo SDK 58, React Native 0.88 e Metro. **Node 18/20 não funcionam.** |
| **npm** | 10 ou superior (vem com o Node) | Use **somente npm** (o projeto tem `package-lock.json`). |
| **Git** | Qualquer versão recente | Para clonar o repositório. |
| **Expo Go** | Versão que suporte o **SDK 58** | Instale/atualize pela Play Store ou App Store. |

Verifique suas versões:

```bash
node -v   # deve ser v22.13+ / v24.3+ / v26+
npm -v
```

Se usa `nvm` (Linux/macOS) ou `nvm-windows`, o arquivo `.nvmrc` já indica a versão:

```bash
nvm install 24
nvm use 24
```

> O `.npmrc` ativa `engine-strict=true`: com Node incompatível o `npm install` falha logo, com mensagem clara, em vez de quebrar depois no Metro.

### Variáveis de ambiente

**Nenhuma é necessária.** O app usa apenas dados mock (`src/data/`), sem backend, API ou banco de dados. O arquivo [`.env.example`](.env.example) apenas documenta isso; não é preciso criar `.env`.

### Passo a passo

1. **Clone o repositório e entre na pasta**:
   ```bash
   git clone <URL-DO-REPOSITORIO> portal-academico
   cd portal-academico
   ```

2. **Instale as dependências** (usa o `package-lock.json`, garantindo versões idênticas):
   ```bash
   npm ci
   ```
   > Use `npm install` apenas se estiver adicionando pacotes. Para novos pacotes use `npx expo install <pacote>`.

3. **(Opcional) Verifique a tipagem TypeScript**:
   ```bash
   npm run typecheck
   ```

4. **Inicie o servidor de desenvolvimento do Expo (limpando o cache)**:
   ```bash
   npm run start:clear
   ```

5. **Abra no celular**:
   - **Android**: abra o **Expo Go** e escaneie o QR Code exibido no terminal.
   - **iOS**: abra a câmera nativa do iPhone e escaneie o QR Code para abrir no **Expo Go**.
   - **Web (opcional)**: `npm run web`.

### Scripts disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm start` | Inicia o Expo (modo padrão, rede local/LAN) |
| `npm run start:clear` | Inicia limpando o cache do Metro |
| `npm run start:lan` | Força o modo LAN (celular e PC na mesma rede Wi-Fi) |
| `npm run start:tunnel` | Usa túnel (funciona em redes diferentes ou com firewall) |
| `npm run android` / `ios` / `web` | Inicia e abre na plataforma indicada |
| `npm run typecheck` | Verifica a tipagem (`tsc --noEmit`) |
| `npm run doctor` | Diagnostica dependências e configuração (`expo-doctor`) |

### 🩺 Solução de Problemas

| Sintoma | Causa provável | Solução |
| :--- | :--- | :--- |
| `npm ERR! code EBADENGINE` / erro do Metro ao iniciar | Node.js desatualizado | Instale Node 24 LTS (ver `.nvmrc`) e rode `npm ci` novamente |
| O QR Code abre, mas o celular fica em "carregando" ou dá timeout | Celular e PC em redes diferentes, Wi-Fi com isolamento de clientes (comum em faculdades) ou firewall | Use `npm run start:tunnel`. No Windows, libere o Node.js no firewall em redes privadas |
| "Project is incompatible with this version of Expo Go" | Expo Go desatualizado (não suporta SDK 58) | Atualize o Expo Go na loja de aplicativos |
| Tela vermelha com módulo não encontrado após atualizar/trocar de branch | Cache do Metro ou `node_modules` desatualizado | `npm ci` e depois `npm run start:clear` |
| Erros de dependência após adicionar pacotes manualmente | Versão incompatível com o SDK | `npx expo install --fix` e `npm run doctor` |
