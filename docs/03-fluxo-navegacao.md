# 03 - Fluxo de Navegação Híbrida e Tipagem de Parâmetros

Este documento detalha como os navegadores **RootStack**, **MainDrawer**, **MainTabs** e **DisciplinasStack** foram implementados e conectados na **Etapa 2** do **Portal Acadêmico**, além da estratégia de tipagem estrita de parâmetros com TypeScript.

---

## 1. Arquitetura Conectada dos Navegadores

```text
App.tsx (GestureHandlerRootView + SafeAreaProvider)
└── RootNavigator.tsx (NavigationContainer + NativeStackNavigator<RootStackParamList>)
    ├── Login (LoginScreen.tsx)
    ├── MainDrawer (MainDrawer.tsx - createDrawerNavigator<DrawerParamList>)
    │   ├── Principal (MainTabs.tsx - createBottomTabNavigator<TabParamList>)
    │   │   ├── Inicio (HomeScreen.tsx)
    │   │   ├── Disciplinas (DisciplinasStack.tsx - createNativeStackNavigator<DisciplinasStackParamList>)
    │   │   │   ├── DisciplinasList (DisciplinasScreen.tsx)
    │   │   │   └── Detalhes (DetalhesScreen.tsx)
    │   │   ├── Notas (NotasScreen.tsx -> também navega para Detalhes)
    │   │   └── Perfil (PerfilScreen.tsx)
    │   ├── Atividades (AtividadesScreen.tsx)
    │   ├── Configuracoes (ConfiguracoesScreen.tsx)
    │   ├── Sobre (SobreScreen.tsx)
    │   └── [Ação Customizada: Sair] -> Abre Modal de Confirmação -> navigation.replace('Login')
    └── Detalhes (DetalhesScreen.tsx - disponível globalmente a partir de NotasScreen)
```

---

## 2. Papel de Cada Navegador (`src/navigation/`)

### 2.1. `RootNavigator.tsx` (`RootStackParamList`)
- Encapsula toda a árvore no `<NavigationContainer>`.
- Inicia em `Login` (`LoginScreen`).
- Quando o estudante autentica na `LoginScreen`, é executado `navigation.replace('MainDrawer')`. O uso de `.replace()` substitui a tela de Login na pilha raiz, impedindo o retorno acidental ao formulário de login pelo botão físico de voltar do Android ou gesto de swipe do iOS.
- Também registra a rota `Detalhes` para permitir navegação direta a partir de abas fora da `DisciplinasStack` (como a `NotasScreen`).

### 2.2. `MainDrawer.tsx` (`DrawerParamList`)
- Implementa o menu lateral deslizante com cabeçalho institucional customizado (`CustomDrawerContent`).
- Contém 4 rotas declaradas:
  1. `Principal` (renderiza `MainTabs`)
  2. `Atividades` (`AtividadesScreen`)
  3. `Configuracoes` (`ConfiguracoesScreen`)
  4. `Sobre` (`SobreScreen`)
- No rodapé do menu lateral, exibe o botão customizado **Sair**, que aciona um `<Modal>` de confirmação de logout. Ao confirmar, fecha o Drawer e executa `rootNavigation.replace('Login')`.

### 2.3. `MainTabs.tsx` (`TabParamList`)
- Gerencia as 4 abas principais do cotidiano do aluno:
  1. `Inicio` (`HomeScreen`)
  2. `Disciplinas` (`DisciplinasStack`)
  3. `Notas` (`NotasScreen`)
  4. `Perfil` (`PerfilScreen`)
- Utiliza ícones dinâmicos do `@expo/vector-icons` (`Ionicons`), alternando entre a variante preenchida (aba ativa) e `outline` (aba inativa), com destaque visual na cor laranja institucional (`#F97316`) e badge de fundo suave (`#FFF7ED`).
- Inclui no cabeçalho superior o botão de abertura do menu lateral (`navigation.dispatch(DrawerActions.openDrawer())`).

### 2.4. `DisciplinasStack.tsx` (`DisciplinasStackParamList`)
- Gerencia a navegação Master-Detail na aba de Disciplinas:
  - `DisciplinasList` (`DisciplinasScreen`): Lista as 6 disciplinas de `MOCK_DISCIPLINAS` em `FlatList`.
  - `Detalhes` (`DetalhesScreen`): Exibe todas as informações da disciplina selecionada e configura dinamicamente o título do cabeçalho com `route.params.disciplina.nome`.

---

## 3. Tipagem Estrita e Passagem de Parâmetros (`src/types/index.ts`)

### 3.1. Uso de `NavigatorScreenParams`
Para permitir navegação aninhada tipada (por exemplo, ir da `HomeScreen` direto para uma tela interna de `DisciplinasStack`), utilizamos `NavigatorScreenParams` do `@react-navigation/native`:

```ts
export type DisciplinasStackParamList = {
  DisciplinasList: undefined;
  Detalhes: { disciplina: Disciplina };
};

export type TabParamList = {
  Inicio: undefined;
  Disciplinas: NavigatorScreenParams<DisciplinasStackParamList> | undefined;
  Notas: undefined;
  Perfil: undefined;
};
```

### 3.2. Envio e Recebimento Tipado em `DetalhesScreen`
1. **Envio (`DisciplinasScreen.tsx` / `NotasScreen.tsx`)**:
   ```ts
   navigation.navigate('Detalhes', { disciplina: item });
   ```
   O compilador TypeScript exige obrigatoriamente que o objeto `disciplina` respeite a interface `Disciplina` (`id`, `nome`, `professor`, `cargaHoraria`, `ementa`, `nota1`, `nota2`, `frequencia`).

2. **Recebimento (`DetalhesScreen.tsx`)**:
   ```ts
   type Props =
     | NativeStackScreenProps<DisciplinasStackParamList, 'Detalhes'>
     | NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

   export default function DetalhesScreen({ route, navigation }: Props) {
     const { disciplina } = route.params;
     // ...
   }
   ```
   A desestruturação `const { disciplina } = route.params;` possui inferência completa de tipos, garantindo acesso seguro às propriedades e acionamento de `navigation.goBack()` no botão explícito de voltar.
