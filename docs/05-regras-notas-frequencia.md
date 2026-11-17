# 05 - Regras de Notas, Frequência e Reutilização da Tela de Detalhes

Este documento especifica a implementação da lógica matemática de avaliação na tela **Notas** (`src/screens/NotasScreen.tsx`), a cobertura de casos de borda em `src/data/mockDisciplinas.ts` e o padrão de reutilização da tela **Detalhes** (`src/screens/DetalhesScreen.tsx`).

---

## 1. Lógica Matemática de Cálculo e Aprovação

Para cada disciplina carregada de `MOCK_DISCIPLINAS` (6 disciplinas no total), o cálculo de média e a verificação de situação acadêmica são executados de forma determinística:

```ts
const media = (item.nota1 + item.nota2) / 2;
const aprovado = media >= 7.0 && item.frequencia >= 75;
const situacao = aprovado ? 'Aprovado' : 'Reprovado';
```

### Fórmulas e Critérios:
1. **Média Final**:
   $$\text{Média} = \frac{\text{Nota 1} + \text{Nota 2}}{2}$$
   Exibida na interface formatada com 1 casa decimal (`media.toFixed(1)`).
2. **Condição Lógica Composta (`AND` / `&&`)**:
   - **Aprovado**: $\text{Média} \ge 7.0 \land \text{Frequência} \ge 75\%$ (Badge Verde `#DCFCE7` / `#15803D`).
   - **Reprovado**: $\text{Média} < 7.0 \lor \text{Frequência} < 75\%$ (Badge Vermelho `#FEE2E2` / `#B91C1C`).

---

## 2. Casos de Borda Testados (`MOCK_DISCIPLINAS`)

A massa de dados em `src/data/mockDisciplinas.ts` foi projetada especificamente para testar todos os quadrantes da tabela-verdade da regra de negócio:

| ID | Disciplina | Nota 1 | Nota 2 | Média | Frequência | Resultado Esperado | Caso de Borda Testado |
| :-: | :--- | :-: | :-: | :-: | :-: | :---: | :--- |
| `1` | Desenvolvimento Mobile | `8.5` | `9.0` | **`8.8`** | **`92%`** | **Aprovado** | Notas e frequência altas |
| `2` | Banco de Dados | `8.0` | `7.5` | **`7.8`** | **`70%`** | **Reprovado** | **Caso de borda crítico**: Média acima de 7.0 (`7.8`), mas frequência abaixo de 75% (`70%`) |
| `3` | Engenharia de Software | `7.5` | `8.0` | **`7.8`** | **`88%`** | **Aprovado** | Aprovação regular próxima ao limite de nota |
| `4` | Design de Interação | `9.0` | `9.5` | **`9.3`** | **`95%`** | **Aprovado** | Excelência em nota e presença |
| `5` | Estruturas de Dados | `5.5` | `6.0` | **`5.8`** | **`85%`** | **Reprovado** | **Caso de borda crítico**: Frequência adequada (`85% >= 75%`), mas média insuficiente (`5.8 < 7.0`) |
| `6` | Redes de Computadores | `4.5` | `5.5` | **`5.0`** | **`68%`** | **Reprovado** | Reprovação simultânea por média (`< 7.0`) e por frequência (`< 75%`) |

---

## 3. Reutilização da `DetalhesScreen.tsx` via Passagem de Parâmetros

A tela `DetalhesScreen.tsx` é reutilizada por múltiplos fluxos de navegação sem duplicação de código:

1. **A partir da Aba Disciplinas (`DisciplinasScreen.tsx`)**:
   - Navega dentro da pilha interna `DisciplinasStack` (`navigation.navigate('Detalhes', { disciplina: item })`).
2. **A partir da Aba Notas (`NotasScreen.tsx`)**:
   - Utiliza `CompositeScreenProps<BottomTabScreenProps<TabParamList, 'Notas'>, NativeStackScreenProps<RootStackParamList>>` para acionar `navigation.navigate('Detalhes', { disciplina: item })`.
3. **Leitura e Exibição em `DetalhesScreen.tsx`**:
   - Desestrutura `const { disciplina } = route.params;`.
   - Renderiza em `ScrollView` todos os indicadores acadêmicos (Nome, Professor, Carga Horária, Nota 1, Nota 2, Média calculada, barra de progresso de Frequência, diagnóstico detalhado de Aprovação/Reprovação e Ementa completa).
   - Disponibiliza o botão explícito **Voltar** (`navigation.goBack()`), retornando exatamente para a tela de origem (`Disciplinas` ou `Notas`).
