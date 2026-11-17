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
│   └── 06-guia-testes-entrega.md
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
├── babel.config.js                  # Preset Expo + plugin do Reanimated no final
├── package.json                     # Dependências e scripts
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

## 🛠️ Como Instalar e Executar no Expo Go

### Pré-requisitos
- **Node.js** (v20+ ou v22/v24 LTS)
- Aplicativo **Expo Go** instalado no dispositivo Android ou iOS

### Passo a Passo

1. **Acesse a pasta do projeto**:
   ```bash
   cd portal-academico
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **(Opcional) Verifique a tipagem TypeScript**:
   ```bash
   npx tsc --noEmit
   ```

4. **Inicie o servidor de desenvolvimento do Expo (limpando o cache)**:
   ```bash
   npx expo start -c
   ```

5. **Abra no celular**:
   - No **Android**: Abra o aplicativo **Expo Go** e escaneie o QR Code exibido no terminal.
   - No **iOS**: Abra a câmera nativa do iPhone e escaneie o QR Code para abrir no **Expo Go**.
