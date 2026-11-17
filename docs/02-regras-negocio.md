# 02 - Regras de Negócio e Gerenciamento de Estado

Este documento especifica os critérios de avaliação acadêmica, fórmulas de cálculo e a organização dos estados reativos com React Hooks (`useState`) no **Portal Acadêmico**.

---

## 1. Critérios de Aprovação Acadêmica

Para que o estudante seja considerado **Aprovado** em uma disciplina no semestre, ele deve atender simultaneamente a dois critérios obrigatórios:

1. **Critério de Desempenho (Média Final)**:
   $$\text{Média} \ge 7.0$$
2. **Critério de Assiduidade (Frequência)**:
   $$\text{Frequência} \ge 75\%$$

### Tabela de Situação Acadêmica

| Condição | Situação | Indicador Visual (Cor Sugerida) |
| :--- | :--- | :--- |
| `media >= 7.0` **E** `frequencia >= 75` | **Aprovado** | Verde (`#16A34A`) |
| `media < 7.0` **E** `frequencia >= 75` | **Reprovado por Nota** | Vermelho (`#DC2626`) |
| `media >= 7.0` **E** `frequencia < 75` | **Reprovado por Falta** | Laranja/Vermelho (`#EA580C`) |
| `media < 7.0` **E** `frequencia < 75` | **Reprovado (Nota e Falta)** | Vermelho Escuro (`#991B1B`) |

> De forma simplificada para exibição rápida em badges:
> - **Aprovado**: `media >= 7.0 && frequencia >= 75`
> - **Reprovado**: Caso contrário (`media < 7.0 || frequencia < 75`).

---

## 2. Cálculo Automático de Média

A média de cada disciplina é calculada automaticamente de forma derivada (sem duplicar estado) a partir das duas avaliações parciais (`nota1` e `nota2`):

$$\text{Média} = \frac{\text{nota1} + \text{nota2}}{2}$$

### Função Utilitária de Referência

```ts
export function calcularMedia(nota1: number, nota2: number): number {
  return Number(((nota1 + nota2) / 2).toFixed(1));
}

export function verificarAprovacao(nota1: number, nota2: number, frequencia: number): boolean {
  const media = calcularMedia(nota1, nota2);
  return media >= 7.0 && frequencia >= 75;
}
```

- **Validação de Limites**:
  - `nota1` e `nota2`: valores numéricos no intervalo de `0.0` a `10.0`.
  - `frequencia`: percentual inteiro ou decimal no intervalo de `0` a `100` (%).

---

## 3. Estrutura de Estados com `useState`

O gerenciamento de estado da aplicação prioriza simplicidade, previsibilidade e imutabilidade utilizando o hook nativo `useState` do React.

### 3.1. Estado de Disciplinas
Inicializado a partir de `DISCIPLINAS_MOCK`:
```ts
const [disciplinas, setDisciplinas] = useState<Disciplina[]>(DISCIPLINAS_MOCK);
```
- Quando uma nota ou frequência é atualizada/simulada, o array é atualizado de forma imutável com `.map()`, recalculando instantaneamente a média e o status de aprovação na interface.

### 3.2. Estado de Atividades Acadêmicas
Inicializado a partir de `ATIVIDADES_MOCK`:
```ts
const [atividades, setAtividades] = useState<Atividade[]>(ATIVIDADES_MOCK);
```
- **Alternância de Status (`toggleAtividade`)**:
  ```ts
  const alternarConclusao = (id: string) => {
    setAtividades((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };
  ```
- **Filtro e Contadores Derivados**:
  - Total de atividades: `atividades.length`
  - Concluídas: `atividades.filter((a) => a.concluida).length`
  - Pendentes: `atividades.filter((a) => !a.concluida).length`

### 3.3. Estado de Autenticação e Formulários
- Na tela de `Login`:
  - `const [matricula, setMatricula] = useState<string>('');`
  - `const [senha, setSenha] = useState<string>('');`
  - `const [erro, setErro] = useState<string>('');`
