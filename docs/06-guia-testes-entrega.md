# 06 - Guia de Testes Obrigatórios (Etapa 7) e Empacotamento para Entrega

Este documento apresenta o roteiro completo para validação dos **10 cenários de teste obrigatórios** do aplicativo **Portal Acadêmico** no **Expo Go**, seguido das instruções para geração do arquivo `.zip` de entrega sem a pasta `node_modules`.

---

## 1. Roteiro Passo a Passo — 10 Testes Obrigatórios (Etapa 7)

### Teste 01 — Autenticação e Bloqueio de Retorno (`LoginScreen`)
1. Abra o aplicativo no Expo Go.
2. Tente tocar em **"Entrar no Portal"** apagando a matrícula ou a senha -> **Resultado esperado**: Exibe um banner vermelho de validação impedindo o acesso vazio.
3. Preencha a matrícula (`2026014892`) e senha (`123456`) e toque em **"Entrar no Portal"**.
4. Pressione o botão físico de "Voltar" no Android -> **Resultado esperado**: O app não retorna para a tela de Login (graças ao `navigation.replace('MainDrawer')`).

### Teste 02 — Navegação por Abas Inferiores (`MainTabs`)
1. Na tela principal (`Início`), observe a barra inferior com as 4 abas: **Início**, **Disciplinas**, **Notas** e **Perfil**.
2. Alterne entre as 4 abas -> **Resultado esperado**: O ícone e o rótulo da aba ativa ficam destacados em laranja (`#F97316`) com badge suave (`#FFF7ED`), sem sobreposição com os botões nativos do sistema operacional.

### Teste 03 — Menu Lateral Deslizante (`MainDrawer`)
1. Toque no ícone de menu hambúrguer (`☰`) no canto superior esquerdo ou deslize da borda esquerda para a direita.
2. Navegue pelas opções **Principal**, **Atividades**, **Configurações** e **Sobre** -> **Resultado esperado**: Todas as rotas abrem telas completas e estilizadas com `ScrollView` / `FlatList`.

### Teste 04 — Listagem de Disciplinas e Passagem de Parâmetros (`DisciplinasStack`)
1. Acesse a aba **Disciplinas**.
2. Toque no card de **"Desenvolvimento Mobile"** -> **Resultado esperado**: Abre a tela `Detalhes` exibindo no cabeçalho o nome da disciplina e, no corpo, professor, carga horária (`80h`), notas (`8.5` e `9.0`), média (`8.8`), frequência (`92%`), badge **Aprovado** e a ementa completa.
3. Toque no botão explícito **"Voltar"** -> **Resultado esperado**: Retorna imediatamente para a listagem de disciplinas (`navigation.goBack()`).

### Teste 05 — Cálculo Automático de Média e Regra Composta (`NotasScreen`)
1. Acesse a aba **Notas**.
2. Verifique os cards das 6 disciplinas:
   - **Aprovados** (`Média >= 7.0` **E** `Frequência >= 75%`): *Desenvolvimento Mobile* (`8.8` / `92%`), *Engenharia de Software* (`7.8` / `88%`) e *Design de Interação* (`9.3` / `95%`) com badge **Verde (Aprovado)**.
   - **Reprovado por Falta**: *Banco de Dados* possui média `7.8` (`>= 7.0`), porém frequência `70%` (`< 75%`) -> exibe badge **Vermelho (Reprovado)**.
   - **Reprovado por Nota**: *Estruturas de Dados* possui frequência `85%` (`>= 75%`), porém média `5.8` (`< 7.0`) -> exibe badge **Vermelho (Reprovado)**.
   - **Reprovado por Nota e Falta**: *Redes de Computadores* (`5.0` / `68%`) -> exibe badge **Vermelho (Reprovado)**.

### Teste 06 — Reutilização da Tela de Detalhes a partir de Notas
1. Ainda na aba **Notas**, toque sobre o card de **"Banco de Dados"**.
2. **Resultado esperado**: Navega para `DetalhesScreen` passando `{ disciplina: item }` e exibe a barra de progresso de frequência em vermelho (`70%` vs mínimo `75%`) explicando a reprovação por falta.

### Teste 07 — Cadastro e Validação de Atividades (`AtividadesScreen`)
1. Abra o menu lateral (`Drawer`) e selecione **Atividades**.
2. Toque em **"Adicionar Atividade"** com o campo Título em branco -> **Resultado esperado**: Exibe mensagem de validação informando que o título é obrigatório.
3. Preencha Título (`"Estudar React Navigation"`), Disciplina (`"Desenvolvimento Mobile"`) e Descrição, e toque em **"Adicionar Atividade"** -> **Resultado esperado**: O novo card aparece no topo da `FlatList` com status **Pendente** e o contador *Total* aumenta em tempo real.

### Teste 08 — Alternância de Status da Atividade (Pendente / Concluída)
1. Na lista de **Atividades**, toque no ícone de checkbox de uma atividade pendente.
2. **Resultado esperado**: O ícone muda para `checkbox` verde, o título e a descrição ficam riscados (`line-through`), o badge muda para **Concluída** (verde) e o contador *Concluídas* é atualizado imediatamente.

### Teste 09 — Exclusão Segura de Atividade com Modal de Confirmação
1. Em qualquer card de atividade, toque no botão vermelho com ícone de lixeira (`trash-outline`).
2. **Resultado esperado**: A atividade **não** é apagada imediatamente; abre-se um `Modal` centralizado exibindo o título da atividade com os botões **Cancelar** e **Confirmar Exclusão**.
3. Toque em **Confirmar Exclusão** -> **Resultado esperado**: O modal fecha e o item é removido da lista.

### Teste 10 — Perfil do Aluno (Edição de Nome, Switch e Logout com Reset)
1. Acesse a aba **Perfil**.
2. Toque em **"Editar Nome"**, digite um novo nome (ex: `"Guilherme Silva"`) e toque em **"Salvar Nome"** -> **Resultado esperado**: O nome do estudante é atualizado em tempo real na tela.
3. Alterne o `Switch` de **Notificações Acadêmicas** -> **Resultado esperado**: O indicador visual alterna instantaneamente entre *"Notificações Acadêmicas Ativadas"* (verde) e *"Notificações Acadêmicas Desativadas"*.
4. Toque em **"Sair do Aplicativo"** (ou na opção **"Sair"** do Drawer) e confirme no Modal -> **Resultado esperado**: O aplicativo executa `navigation.reset({ index: 0, routes: [{ name: 'Login' }] })` e retorna para a `LoginScreen` com a pilha de navegação zerada.

---

## 2. Como Gerar o Arquivo `.zip` para Entrega (Sem `node_modules`)

> **Importante**: Nunca inclua a pasta `node_modules` (nem `.expo` ou `.git`) no arquivo `.zip` de entrega, pois ela contém milhares de arquivos que deixam o pacote pesado desnecessariamente.

### Opção A — Comando Automático via PowerShell (Recomendado)
Abra o terminal na pasta `portal-academico` e execute:

```powershell
Get-ChildItem -Path . -Exclude "node_modules", ".expo", ".git", "portal-academico-entrega.zip" | Compress-Archive -DestinationPath .\portal-academico-entrega.zip -Force
```

O arquivo **`portal-academico-entrega.zip`** será gerado limpo e pronto para envio, contendo apenas:
- `src/` (`components`, `data`, `navigation`, `screens`, `types`)
- `docs/` (`01` a `06`)
- `assets/`
- `App.tsx`, `index.ts`, `babel.config.js`, `package.json`, `tsconfig.json`, `app.json` e `README.md`.

### Opção B — Manualmente pelo Windows Explorer
1. Abra a pasta `portal-academico`.
2. Selecione todos os arquivos e pastas (`assets`, `docs`, `src`, `App.tsx`, `app.json`, `babel.config.js`, `index.ts`, `package.json`, `README.md`, `tsconfig.json`), **desmarcando** a pasta `node_modules` (e `.expo`).
3. Clique com o botão direito nos itens selecionados -> **Compactar para... -> Arquivo ZIP** (ou *Enviar para -> Pasta compactada*).
