# 03 - Changelog de Etapas (Diário Técnico)

Registro cronológico da evolução técnica do projeto **Portal Acadêmico**.

---

## [Etapa 1] Setup de Dependências Nativas, Estrutura Limpa, Tipagem Estrita e App de Validação
**Data:** 16/11/2026  
**Status:** ✅ Concluída

### Entregas Realizadas:
1. **Configuração de Dependências Nativas (`package.json`, `babel.config.js`, `index.ts`, `App.tsx`)**:
   - Configurado `babel.config.js` com `babel-preset-expo` e `'react-native-reanimated/plugin'` como o último item do array de plugins.
   - Garantido `import 'react-native-gesture-handler';` na primeira linha de `index.ts` e `App.tsx`.
2. **Estrutura Limpa de Pastas**:
   - Criadas as pastas `src/types/`, `src/data/`, `src/components/`, `src/screens/`, `src/navigation/` e `docs/`.
3. **Tipagem Estrita (`src/types/index.ts`)**:
   - Criadas as interfaces `Disciplina` (`id`, `nome`, `professor`, `cargaHoraria`, `ementa`, `nota1`, `nota2`, `frequencia`) e `Atividade` (`id`, `titulo`, `descricao`, `disciplina`, `concluida`).
   - Criada a tipagem completa das rotas do React Navigation (`RootStackParamList`, `DrawerParamList`, `TabParamList` e `DisciplinasStackParamList`), garantindo `Detalhes: { disciplina: Disciplina }`.
4. **Documentação Técnica (`docs/`)**:
   - `docs/01-arquitetura-e-setup.md`: Estrutura de pastas, pacotes instalados, setup do Reanimated/Gesture Handler e diagrama em texto da hierarquia `Stack -> Drawer -> Bottom Tabs -> Stack`.
   - `docs/02-checklist-requisitos.md`: Checklist técnico completo dos requisitos do projeto.
5. **Tela Temporária de Validação (`App.tsx`)**:
   - Criado `App.tsx` funcional mínimo encapsulado com `GestureHandlerRootView` e `SafeAreaProvider` confirmando que o TypeScript e o GestureHandler estão ativos sem erros.

---

## [Etapa 2] Espinha Dorsal de Navegação Híbrida, Telas Estruturais e Passagem de Parâmetros
**Data:** 16/11/2026  
**Status:** ✅ Concluída

### Entregas Realizadas:
1. **Dados Mockados (`src/data/mockDisciplinas.ts`)**:
   - Criada lista tipada `MOCK_DISCIPLINAS` com 6 disciplinas acadêmicas reais (*Desenvolvimento Mobile*, *Banco de Dados*, *Engenharia de Software*, *Design de Interação*, *Estruturas de Dados* e *Redes de Computadores*) contemplando professores, ementas, carga horária, `nota1`, `nota2` e frequência variadas.
2. **Telas Estruturais (`src/screens/`)**:
   - Implementadas com a paleta institucional (`#0F2C59`, `#F97316`, `#F8FAFC` e `#1E293B`):
     - `LoginScreen.tsx`: Autenticação navegando para `MainDrawer` com `navigation.replace('MainDrawer')`.
     - `HomeScreen.tsx`: Dashboard de boas-vindas, indicadores acadêmicos e atalhos rápidos.
     - `DisciplinasScreen.tsx`: Listagem em `FlatList` navegando para `Detalhes` com `{ disciplina: item }`.
     - `DetalhesScreen.tsx`: Leitura de `const { disciplina } = route.params`, exibição completa de dados/média/situação e botão explícito `navigation.goBack()`.
     - `NotasScreen.tsx`, `AtividadesScreen.tsx`, `PerfilScreen.tsx`: Placeholders estruturados (com suporte a abrir `Detalhes` a partir de `NotasScreen`).
     - `ConfiguracoesScreen.tsx` e `SobreScreen.tsx`: Telas completas e funcionais com `ScrollView`.
3. **Navegadores (`src/navigation/`) e `App.tsx`**:
   - Criados `DisciplinasStack.tsx`, `MainTabs.tsx`, `MainDrawer.tsx` (incluindo item customizado `Sair` com Modal de confirmação de logout) e `RootNavigator.tsx`.
   - `App.tsx` atualizado para renderizar `RootNavigator`.
4. **Documentação (`docs/03-fluxo-navegacao.md`)**:
   - Documentada a conexão entre `RootStack`, `Drawer`, `Bottom Tabs` e `DisciplinasStack`, bem como a tipagem estrita da passagem de parâmetros.

---

## [Etapa 3] Módulo Completo de Minhas Atividades (CRUD com `useState`, `FlatList` e `Modal`)
**Data:** 16/11/2026  
**Status:** ✅ Concluída

### Entregas Realizadas:
1. **Tela `AtividadesScreen.tsx` (`src/screens/AtividadesScreen.tsx`)**:
   - Formulário de cadastro com três campos `TextInput` (Título, Disciplina e Descrição), validação de título vazio e botão `TouchableOpacity` com ícone.
   - Gerenciamento de estado reativo com `useState` iniciado com 2 atividades pré-cadastradas, contadores em tempo real (Total, Concluídas, Pendentes) e listagem via `FlatList`.
   - Alternância de status (pendente/concluída) via checkbox com estilo visual diferenciado (texto riscado, fundo suave e badge verde).
   - Exclusão segura com ícone de lixeira acionando um `Modal` centralizado de confirmação exibindo o título da atividade e botões *Cancelar* e *Confirmar Exclusão*.
2. **Documentação (`docs/04-modulo-atividades.md`)**:
   - Documentado o gerenciamento de estado com `useState`, a arquitetura da `FlatList` e o fluxo do `Modal` de confirmação de exclusão.

---

## [Etapa 4] Tela Completa de Notas, Cálculo Automático de Aprovação e Integração com Detalhes
**Data:** 16/11/2026  
**Status:** ✅ Concluída

### Entregas Realizadas:
1. **Tela `NotasScreen.tsx` (`src/screens/NotasScreen.tsx`)**:
   - Implementada `FlatList` utilizando as 6 disciplinas de `src/data/mockDisciplinas.ts`.
   - Cálculo automático de média `const media = (item.nota1 + item.nota2) / 2` e aplicação estrita da regra `media >= 7.0 && item.frequencia >= 75`.
   - Cards exibindo Nome da disciplina, Professor, Nota 1, Nota 2, Média formatada com 1 casa decimal, Percentual de frequência, diagnóstico rápido e badge colorido (*Aprovado* em verde / *Reprovado* em vermelho).
   - Ao tocar em qualquer card, executa `navigation.navigate('Detalhes', { disciplina: item })`.
2. **Refinamento de `DetalhesScreen.tsx` (`src/screens/DetalhesScreen.tsx`)**:
   - Aprimorada a exibição dos indicadores recebidos via `route.params` com barra visual de progresso de frequência (meta de 75%), diagnóstico detalhado do motivo de aprovação/reprovação, `ScrollView` e botão *Voltar* funcional (`navigation.goBack()`).
3. **Documentação (`docs/05-regras-notas-frequencia.md`)**:
   - Documentada a lógica matemática, tabela-verdade dos casos de borda testados e reutilização da `DetalhesScreen`.

---

## [Etapa 5, 6 e 7] Módulo de Perfil, Polimento Geral de UI, Guia de Testes e Documentação Final
**Data:** 16/11/2026  
**Status:** ✅ Concluída

### Entregas Realizadas:
1. **Tela Completa de Perfil (`src/screens/PerfilScreen.tsx`)**:
   - Estrutura em `ScrollView` com avatar do estudante, curso (*Análise e Desenvolvimento de Sistemas*), matrícula `2026014892` e nome gerenciado via `useState`.
   - Botão `TouchableOpacity` (*Editar Nome*) abrindo `Modal` para atualizar o nome do aluno em tempo real na tela.
   - Componente `Switch` funcional para ativar/desativar notificações acadêmicas com exibição dinâmica do status atual.
   - Botão *Sair do Aplicativo* abrindo `Modal` de confirmação e redirecionando para a `LoginScreen` com `navigation.reset({ index: 0, routes: [{ name: 'Login' }] })`.
2. **Polimento Geral de UI (Etapa 6)**:
   - Consistência da paleta institucional (`#0F2C59`, `#F97316`, `#F8FAFC` e `#1E293B`), cards com sombras suaves, ícones `Ionicons` em botões e menus, e suporte completo a áreas seguras (`useSafeAreaInsets`).
3. **Documentação Final e Entrega**:
   - Criado `docs/06-guia-testes-entrega.md` com o roteiro dos 10 testes obrigatórios e instruções de geração do `.zip` sem `node_modules`.
   - Criado `README.md` na raiz do projeto com visão geral, tecnologias, estrutura de pastas e comandos de instalação/execução.
