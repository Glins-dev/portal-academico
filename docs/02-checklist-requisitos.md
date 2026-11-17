# 02 - Checklist Técnico de Requisitos (Portal Acadêmico)

Este checklist acompanha o cumprimento de todos os requisitos arquiteturais, funcionais e de regras de negócio do projeto **Portal Acadêmico**.

---

## 1. Setup, Arquitetura e Tipagem (Etapa 1)
- [x] `babel.config.js` configurado com `babel-preset-expo` e `'react-native-reanimated/plugin'` como último plugin.
- [x] `import 'react-native-gesture-handler';` na primeira linha de `index.ts` e `App.tsx`.
- [x] Estrutura de pastas limpa criada (`src/types/`, `src/data/`, `src/components/`, `src/screens/`, `src/navigation/`, `docs/`).
- [x] Interfaces `Disciplina` (`id`, `nome`, `professor`, `cargaHoraria`, `ementa`, `nota1`, `nota2`, `frequencia`) e `Atividade` (`id`, `titulo`, `descricao`, `disciplina`, `concluida`) definidas em `src/types/index.ts`.
- [x] Tipagem completa das rotas (`RootStackParamList`, `DrawerParamList`, `TabParamList` e `DisciplinasStackParamList`) com `Detalhes: { disciplina: Disciplina }`.
- [x] `App.tsx` temporário de validação com TypeScript e `GestureHandlerRootView` funcionando sem erros.

---

## 2. Arquitetura de Navegação Híbrida
- [x] **Stack Navigator Raiz (`RootStack`)**: Controle de transição entre `Login` e `MainDrawer`.
- [x] **Drawer Navigator (`Drawer`)**: Menu lateral contendo acesso às `Bottom Tabs` (`Principal`), `Atividades`, `Configuracoes`, `Sobre` e opção `Sair` com Modal de confirmação.
- [x] **Bottom Tabs Navigator (`Tabs`)**: Abas inferiores para `Inicio`, `Disciplinas`, `Notas` e `Perfil`, estilizadas com ícones do `@expo/vector-icons`.
- [x] **Stack Navigator de Disciplinas (`DisciplinasStack`)**: Fluxo `DisciplinasList -> Detalhes`.

---

## 3. Passagem de Parâmetros entre Telas
- [x] Navegação para a tela `Detalhes` enviando o objeto completo tipado `{ disciplina: Disciplina }`.
- [x] Leitura segura dos parâmetros via `route.params.disciplina` utilizando `NativeStackScreenProps`.
- [x] Exibição de nome, professor, carga horária, ementa completa, notas, frequência e situação na tela `Detalhes`, com botão explícito de voltar (`navigation.goBack()`).

---

## 4. Notas, Frequência e Regras de Negócio Acadêmicas
- [x] Cálculo automático da média: $\text{Média} = \frac{\text{nota1} + \text{nota2}}{2}$.
- [x] Aplicação estrita da regra de aprovação:
  - **Aprovado**: $\text{Média} \ge 7.0$ **E** $\text{Frequência} \ge 75\%$.
  - **Reprovado**: $\text{Média} < 7.0$ **OU** $\text{Frequência} < 75\%$.
- [x] Listagem completa em `FlatList` na `NotasScreen` com badges coloridos (Verde para Aprovado / Vermelho para Reprovado) e integração direta com `DetalhesScreen` via `route.params`.

---

## 5. Gerenciamento (CRUD) de Atividades com `useState`
- [x] Listagem de atividades acadêmicas com título, descrição, disciplina vinculada e status (`concluida`).
- [x] Criação/adição de nova atividade na lista em memória (`useState`) com validação de título obrigatório.
- [x] Alternância de estado (marcar como concluída / pendente) com texto riscado e badge verde.
- [x] Remoção/exclusão de atividade protegida por Modal de confirmação e contadores atualizados em tempo real.

---

## 6. Perfil do Aluno e Logout
- [x] Exibição dos dados acadêmicos do estudante (Nome gerenciado via `useState`, Matrícula `2026014892`, Curso de ADS, Semestre e resumo de desempenho).
- [x] Edição do nome do aluno em tempo real (`Editar Nome`) e `Switch` funcional de notificações acadêmicas exibindo o status atual.
- [x] Funcionalidade de **Logout** com Modal de confirmação redefinindo a pilha de navegação (`navigation.reset({ index: 0, routes: [{ name: 'Login' }] })`) para retornar à tela de Login com segurança.

---

## 7. Testes e Validação no Expo Go
- [x] Validação estática do TypeScript (`npx tsc --noEmit`) sem erros.
- [x] Teste de renderização, áreas seguras (`useSafeAreaInsets`) e gestos no aplicativo **Expo Go** (Android/iOS).
- [x] Verificação de cenários de alunos aprovados e reprovados (por nota, por falta e por ambos) e guia final de entrega (`docs/06-guia-testes-entrega.md` e `README.md`).
