# 01 - Arquitetura de Navegação (Portal Acadêmico)

Este documento descreve a arquitetura de navegação híbrida do aplicativo **Portal Acadêmico**, construída com **React Navigation v7** e **TypeScript** (compatível com **Expo Go**).

---

## 1. Visão Geral da Hierarquia

A navegação do aplicativo segue um fluxo hierárquico em quatro níveis:

```
RootStackNavigator (Native Stack)
├── LoginScreen (Fluxo de Autenticação)
└── MainDrawer (Drawer Navigator)
    ├── PortalTabs (Bottom Tabs Navigator)
    │   ├── Home (Dashboard Acadêmico)
    │   ├── DisciplinasTab (Native Stack Navigator)
    │   │   ├── ListaDisciplinas (Listagem de Disciplinas)
    │   │   └── Detalhes (Detalhes da Disciplina, Notas e Ementa)
    │   ├── Atividades (Controle de Entregas e Tarefas)
    │   └── Perfil (Dados do Aluno e Desempenho Geral)
    ├── Calendario (Calendário Acadêmico)
    ├── Secretaria (Requerimentos e Documentos)
    └── Sobre (Informações Institucionais do App)
```

Fluxo resumido:
**`Login -> Drawer -> Bottom Tabs -> Stack`**

---

## 2. Detalhamento dos Navegadores

### 2.1. Nível 1: Autenticação e Raiz (`RootStack`)
- **Tipo**: `@react-navigation/native-stack` (`createNativeStackNavigator`)
- **Responsabilidade**: Controlar a transição entre a tela pública de autenticação (`Login`) e o ambiente autenticado do aluno (`MainDrawer`), além de permitir acesso rápido à tela de `Detalhes` quando acionada globalmente.
- **Comportamento**: Ao realizar login, utiliza `navigation.replace('MainDrawer')` para impedir o retorno acidental à tela de login pelo botão físico de voltar.

### 2.2. Nível 2: Menu Lateral (`MainDrawer`)
- **Tipo**: `@react-navigation/drawer` (`createDrawerNavigator`)
- **Responsabilidade**: Fornecer acesso global às seções institucionais e administrativas do portal, mantendo as abas principais (`PortalTabs`) como tela inicial do Drawer.
- **Rotas**:
  - `PortalTabs`: Container das abas inferiores do dia a dia do estudante.
  - `Calendario`: Datas de provas, feriados e eventos letivos.
  - `Secretaria`: Solicitações acadêmicas e histórico escolar.
  - `Sobre`: Informações de versão, curso e instituição.

### 2.3. Nível 3: Abas Principais (`PortalTabs`)
- **Tipo**: `@react-navigation/bottom-tabs` (`createBottomTabNavigator`)
- **Responsabilidade**: Navegação rápida entre os módulos mais utilizados pelo estudante.
- **Rotas**:
  - `Home`: Resumo geral (CRA/Média Global, alertas de frequência e atalhos).
  - `DisciplinasTab`: Pilha dedicada à consulta e simulação de notas das disciplinas.
  - `Atividades`: Lista interativa de tarefas acadêmicas com marcação de conclusão.
  - `Perfil`: Identificação do estudante do curso de Análise e Desenvolvimento de Sistemas (ADS) e opção de encerramento de sessão (Logout).

### 2.4. Nível 4: Pilha de Disciplinas (`DisciplinasStack`)
- **Tipo**: `@react-navigation/native-stack` (`createNativeStackNavigator`)
- **Responsabilidade**: Permitir a navegação em profundidade (Master-Detail) dentro da aba de disciplinas.
- **Rotas**:
  - `ListaDisciplinas`: Exibe os cards de todas as disciplinas matriculadas no semestre com status visual imediato.
  - `Detalhes`: Recebe `{ disciplina: Disciplina }` via `route.params`, exibindo professor, ementa completa, notas parciais (`nota1`, `nota2`), média calculada, frequência e situação final.

---

## 3. Tipagem Estática (`src/types/navigation.ts`)

Todas as rotas utilizam tipagem estrita em TypeScript por meio de `ParamList` dedicados (`RootStackParamList`, `MainDrawerParamList`, `MainTabParamList` e `DisciplinasStackParamList`), garantindo autocompletar e validação em tempo de compilação para `navigation.navigate` e `route.params`.
