# 04 - Módulo de Minhas Atividades (`AtividadesScreen.tsx`)

Este documento descreve a arquitetura interna, o gerenciamento de estado reativo com `useState`, a estrutura da `FlatList` e o fluxo de exclusão segura via `Modal` implementados na tela **Minhas Atividades** (`src/screens/AtividadesScreen.tsx`).

---

## 1. Gerenciamento de Estado com `useState`

A tela utiliza estados locais fortemente tipados em TypeScript para controlar tanto a coleção de atividades quanto os campos do formulário e o estado de exclusão:

```ts
// 1. Lista principal de atividades (iniciada com 2 exemplos pré-cadastrados)
const [atividades, setAtividades] = useState<Atividade[]>(ATIVIDADES_INICIAIS);

// 2. Campos controlados do formulário de cadastro
const [titulo, setTitulo] = useState<string>('');
const [descricao, setDescricao] = useState<string>('');
const [disciplina, setDisciplina] = useState<string>('');
const [erroValidacao, setErroValidacao] = useState<string>('');

// 3. Controle do Modal de confirmação de exclusão
const [atividadeParaExcluir, setAtividadeParaExcluir] = useState<Atividade | null>(null);
```

### Operações Imutáveis sobre o Estado

1. **Cadastro (`handleAdicionarAtividade`)**:
   - Valida se `titulo.trim()` não está vazio. Caso esteja vazio, exibe um alerta visual inline (`erroValidacao`).
   - Cria um novo objeto `Atividade` com `concluida: false` e adiciona no início da lista usando spread operator:
     ```ts
     setAtividades((prev) => [novaAtividade, ...prev]);
     ```
   - Limpa os inputs após a inserção.

2. **Alternância de Status (`handleAlternarStatus`)**:
   - Percorre a lista com `.map()` invertendo a propriedade booleana `concluida` apenas do item correspondente:
     ```ts
     setAtividades((prev) =>
       prev.map((item) =>
         item.id === id ? { ...item, concluida: !item.concluida } : item
       )
     );
     ```
   - A interface reage imediatamente aplicando:
     - Ícone `checkbox` verde (`#16A34A`) vs `square-outline` azul marinho (`#0F2C59`).
     - Texto riscado (`textDecorationLine: 'line-through'`) no título e na descrição.
     - Badge verde **"Concluída"** (`#DCFCE7` / `#15803D`) vs badge laranja **"Pendente"** (`#FFF7ED` / `#C2410C`).
     - Atualização instantânea dos contadores no banner superior (*Total*, *Concluídas* e *Pendentes*).

---

## 2. Estrutura do Componente `FlatList`

Para garantir rolagem fluida e compatibilidade com o teclado em telas menores:
- O banner de progresso e o card do formulário de cadastro foram alocados na propriedade `ListHeaderComponent` da `FlatList`.
- Cada atividade é renderizada por `renderItem` em formato de Card estilizado.
- A propriedade `ListEmptyComponent` exibe um estado vazio amigável caso o usuário exclua todas as atividades da lista.
- O `contentContainerStyle` utiliza `useSafeAreaInsets` (`insets.bottom`) para respeitar a barra de navegação inferior do Android.

---

## 3. Fluxo do Modal de Confirmação de Exclusão

Para evitar exclusões acidentais, a remoção de uma atividade segue um fluxo em duas etapas:

1. **Solicitação de Exclusão**:
   - Ao tocar no botão de lixeira (`trash-outline`) de um card, a atividade não é removida imediatamente; ela é salva em `setAtividadeParaExcluir(item)`.
   - Como a propriedade `visible` do `<Modal>` é controlada por `atividadeParaExcluir !== null`, o modal centralizado é exibido com animação `fade`.

2. **Decisão no Modal**:
   - O modal exibe o título exato da atividade selecionada (`"{atividadeParaExcluir?.titulo}"`).
   - **Botão "Cancelar"**: Executa `setAtividadeParaExcluir(null)`, fechando o modal sem alterar a lista.
   - **Botão "Confirmar Exclusão"**: Filtra a lista de forma imutável (`prev.filter((item) => item.id !== atividadeParaExcluir.id)`) e redefine `setAtividadeParaExcluir(null)` para fechar o modal.
