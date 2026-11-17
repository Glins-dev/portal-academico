# 01 - Arquitetura e Setup do Projeto (Portal Acadêmico)

Este documento descreve a arquitetura de pastas, dependências instaladas, configuração de módulos nativos (Reanimated e Gesture Handler) e a hierarquia de navegação híbrida do **Portal Acadêmico**.

---

## 1. Estrutura de Pastas (Clean Architecture Mobile)

```
portal-academico/
├── assets/                  # Ícones, splash screen e recursos estáticos
├── docs/                    # Documentação técnica e acompanhamento de requisitos
│   ├── 01-arquitetura-e-setup.md
│   ├── 01-arquitetura-navegacao.md
│   ├── 02-checklist-requisitos.md
│   ├── 02-regras-negocio.md
│   └── 03-changelog-etapas.md
├── src/
│   ├── components/          # Componentes visuais reutilizáveis (Cards, Badges, Headers, Inputs)
│   ├── data/                # Massa de dados inicial (mockData.ts)
│   ├── navigation/          # Configuração dos navegadores (RootStack, Drawer, BottomTabs, DisciplinasStack)
│   ├── screens/             # Telas de negócio da aplicação (Login, Home, Disciplinas, Detalhes, Atividades, Perfil, etc.)
│   └── types/               # Interfaces de domínio e tipagem estrita de rotas (index.ts, academic.ts, navigation.ts)
├── App.tsx                  # Componente raiz da aplicação
├── babel.config.js          # Configuração do Babel com preset Expo e plugin do Reanimated
├── index.ts                 # Ponto de entrada (entry point) com import prioritário do Gesture Handler
├── package.json             # Manifesto de dependências e scripts
└── tsconfig.json            # Configuração estrita do TypeScript (strict: true)
```

---

## 2. Dependências Instaladas

| Pacote | Finalidade |
| :--- | :--- |
| `expo` / `react` / `react-native` | Core da aplicação mobile compatível com Expo Go |
| `@react-navigation/native` | Núcleo de gerenciamento de estado de navegação e `NavigationContainer` |
| `@react-navigation/native-stack` | Navegação em pilha nativa (`RootStack` e `DisciplinasStack`) |
| `@react-navigation/bottom-tabs` | Navegação por abas inferiores (`TabParamList`) |
| `@react-navigation/drawer` | Menu lateral deslizante (`DrawerParamList`) |
| `react-native-gesture-handler` | Reconhecimento nativo de gestos (obrigatório para Drawer e Stack) |
| `react-native-reanimated` | Motor de animações de alta performance na UI Thread (obrigatório para Drawer) |
| `react-native-screens` | Otimização nativa de memória e ciclo de vida para telas |
| `react-native-safe-area-context` | Tratamento seguro de áreas de recorte (Notch, StatusBar, Home Indicator) |
| `@expo/vector-icons` | Biblioteca de ícones (`Ionicons`, `MaterialIcons`, etc.) |
| `typescript` / `@types/react` | Tipagem estática estrita em tempo de desenvolvimento |

---

## 3. Configuração do Reanimated e Gesture Handler

### 3.1. `babel.config.js`
O plugin `'react-native-reanimated/plugin'` está configurado obrigatoriamente como o **último item** do array `plugins`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 3.2. `index.ts` e `App.tsx` (Gesture Handler)
O pacote `'react-native-gesture-handler'` é importado na **primeira linha** tanto do `index.ts` quanto do `App.tsx` (antes de qualquer outro import), além do encapsulamento da árvore visual com `<GestureHandlerRootView style={{ flex: 1 }}>`.

---

## 4. Diagrama da Hierarquia de Navegação

Fluxo: **`Stack -> Drawer -> Bottom Tabs -> Stack`**

```text
RootStackNavigator (createNativeStackNavigator<RootStackParamList>)
├── Login (Tela de Autenticação)
├── MainDrawer (createDrawerNavigator<DrawerParamList>)
│   ├── MainTabs (createBottomTabNavigator<TabParamList>)
│   │   ├── Home (Dashboard Geral do Aluno)
│   │   ├── DisciplinasTab (createNativeStackNavigator<DisciplinasStackParamList>)
│   │   │   ├── ListaDisciplinas (Listagem das Disciplinas do Semestre)
│   │   │   └── Detalhes (Parâmetro: { disciplina: Disciplina })
│   │   ├── Atividades (Gerenciamento de Tarefas e Entregas)
│   │   └── Perfil (Dados do Estudante e Logout)
│   ├── Calendario (Calendário Letivo)
│   ├── Secretaria (Serviços Acadêmicos)
│   └── Sobre (Informações Institucionais)
└── Detalhes (Acesso rápido via Stack com { disciplina: Disciplina })
```
