# 07 - Guia Completo de Resolução: Atividade 2 — Mobile 4.1 (Manuscrita)

> **Projeto de Referência**: **Portal Acadêmico Mobile** (`portal-academico`)  
> **Stack Real do Repositório**: React Native (`0.88.1`), Expo SDK 58, TypeScript (`strict: true`), `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`, `@react-navigation/drawer` e `@expo/vector-icons` (`Ionicons`).

---

## PARTE 1: FUNDAMENTOS DO REACT NATIVE

### Questão 1 — O que é React Native, sua finalidade e como renderiza interfaces nativas
**Resposta Fundamentada (para transcrição):**
O **React Native** é um framework de código aberto criado pela Meta que permite desenvolver aplicativos móveis multiplataforma (Android e iOS) utilizando **JavaScript/TypeScript** e a biblioteca **React**.

- **Finalidade**: Permitir que uma única base de código (*single codebase*) gere aplicativos com desempenho e experiência visual genuinamente nativos nos dois sistemas operacionais, reduzindo custos e tempo de manutenção.
- **Como renderiza interfaces nativas**: Diferente de soluções híbridas baseadas em *WebViews* (que apenas exibem páginas HTML/CSS dentro de um navegador embutido), o React Native **não usa HTML nem DOM**. Ele executa a lógica de negócios e o estado do React em uma *thread* JavaScript/Hermes (e através da arquitetura moderna / JSI) instancia **componentes nativos reais** do sistema operacional:
  - Um `<View>` no React Native é traduzido para um `android.view.ViewGroup` no Android e um `UIView` no iOS.
  - Um `<Text>` é traduzido para `android.widget.TextView` no Android e `UILabel` no iOS.

---

### Questão 2 — Diferença entre `View`, `Text`, `ScrollView` e `FlatList` e onde foram usados no projeto

| Componente | Função Técnica | Onde foi usado neste projeto (`src/`) | Motivo Técnico da Escolha |
| :--- | :--- | :--- | :--- |
| **`View`** | Container fundamental de layout (suporta *Flexbox*, bordas, espaçamentos e sombras). Não rola sozinho. | Todas as telas (`LoginScreen.tsx`, `HomeScreen.tsx`, `DetalhesScreen.tsx`, etc.). | Agrupar elementos visuais em Cards, linhas (`flexDirection: 'row'`), cabeçalhos e badges de status. |
| **`Text`** | Único componente capaz de exibir strings e textos na tela. Suporta estilização tipográfica e aninhamento. | Todas as telas (ex: títulos de disciplinas, notas, médias, ementas e rótulos de botões). | No React Native, textos soltos fora de `<Text>` causam erro de execução; todo texto precisa estar dentro de `<Text>`. |
| **`ScrollView`** | Container de rolagem que renderiza **todos** os seus elementos filhos na memória de uma só vez. | `HomeScreen.tsx`, `DetalhesScreen.tsx`, `PerfilScreen.tsx`, `ConfiguracoesScreen.tsx` e `SobreScreen.tsx`. | Ideal para telas de conteúdo finito/estático (como ementa, formulário de perfil ou painel de configurações) que podem ultrapassar a altura de telas menores. |
| **`FlatList`** | Lista de alta performance com **virtualização** (*lazy rendering*): renderiza apenas os itens visíveis na tela. | `DisciplinasScreen.tsx`, `NotasScreen.tsx` e `AtividadesScreen.tsx`. | Ideal para coleções dinâmicas de dados (`MOCK_DISCIPLINAS` e `atividades`), usando `data`, `keyExtractor` e `renderItem` para economizar memória. |

---

### Questão 3 — Funcionamento do Hook `useState` e exemplo curto para transcrição à mão
**Explicação:**
O `useState` é um Hook do React que permite adicionar **estado reativo local** a componentes funcionais. Ele recebe o valor inicial como argumento e retorna um array com duas posições:
1. A **variável de estado** atual (somente leitura).
2. A **função atualizadora** (`set...`), que altera o valor e agenda uma **re-renderização automática** da interface com o novo dado.

No projeto, utilizamos `useState` em `LoginScreen.tsx` (matrícula e senha), `AtividadesScreen.tsx` (lista de atividades e inputs do formulário), `PerfilScreen.tsx` (`nomeAluno` e `notificacoesAtivas`) e `ConfiguracoesScreen.tsx` (switches).

**Código curto e limpo para copiar à mão:**
```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ContadorExemplo() {
  const [contador, setContador] = useState<number>(0);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Cliques: {contador}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setContador(contador + 1)}
      >
        <Text style={styles.textoBotao}>Incrementar +1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 22, marginBottom: 12 },
  botao: { backgroundColor: '#0F2C59', padding: 12, borderRadius: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
});
```

---

## PARTE 2: ÍCONES E INTERATIVIDADE

### Questão 4 — Importância dos ícones na UX e 5 exemplos reais usados no projeto
**Importância na UX:**
Os ícones reduzem a carga cognitiva do usuário, aceleram o reconhecimento visual de ações (sem depender apenas de leitura textual), economizam espaço físico em telas móveis pequenas e comunicam estados imediatos (como sucesso, erro ou conclusão).

**5 exemplos reais extraídos do nosso código (`Ionicons`):**
1. `'home'` / `'home-outline'`: Aba **Início** na barra inferior (`src/navigation/MainTabs.tsx`).
2. `'book'` / `'book-outline'`: Aba **Disciplinas** e cards de matérias (`src/navigation/MainTabs.tsx` e `src/screens/DisciplinasScreen.tsx`).
3. `'bar-chart'` / `'bar-chart-outline'`: Aba **Notas** na barra inferior (`src/navigation/MainTabs.tsx`).
4. `'checkbox'` / `'square-outline'`: Botão de alternar atividade concluída/pendente (`src/screens/AtividadesScreen.tsx`).
5. `'trash-outline'`: Botão de excluir atividade que aciona o Modal de confirmação (`src/screens/AtividadesScreen.tsx`).

---

### Questão 5 — Código exato com `Ionicons` (`home`, tamanho `30`, cor `'blue'`) e explicação das props
**Código para copiar à mão:**
```tsx
import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExemploIcone() {
  return (
    <View>
      <Ionicons name="home" size={30} color="blue" />
    </View>
  );
}
```

**Explicação das propriedades (`props`):**
- **`name`**: Define qual glifo/ícone do catálogo `Ionicons` será renderizado (neste caso, `"home"`).
- **`size`**: Define a dimensão (largura e altura proporcional em pixels independentes de densidade) do ícone (`30`).
- **`color`**: Define a cor de preenchimento vetorial do ícone (aceita nomes CSS como `"blue"` ou códigos hexadecimais como `"#0F2C59"`).

---

### Questão 6 — Funcionamento do `TouchableOpacity` e do evento `onPress` com exemplo prático
**Explicação:**
O `TouchableOpacity` é um componente de toque do React Native que envolve elementos visuais (como `<View>`, `<Text>` e ícones) para torná-los clicáveis. Ao ser pressionado pelo dedo do usuário, ele reduz temporariamente a opacidade do elemento (controlada pela prop `activeOpacity`, ex: `0.7`), oferecendo **feedback visual imediato** de que o toque foi reconhecido. Quando o usuário toca e solta o botão, a propriedade **`onPress`** dispara a função *callback* associada.

**Código curto e limpo para copiar à mão:**
```tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MensagemInterativa() {
  const [mensagem, setMensagem] = useState<string>('Aguardando ação...');

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{mensagem}</Text>

      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.7}
        onPress={() => setMensagem('Matrícula confirmada com sucesso!')}
      >
        <Text style={styles.textoBotao}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { fontSize: 18, marginBottom: 16 },
  botao: { backgroundColor: '#F97316', padding: 12, borderRadius: 8 },
  textoBotao: { color: '#FFF', fontWeight: 'bold' },
});
```

---

### Questão 7 — Cuidados de UI/UX adotados no projeto para botões de Excluir, Salvar e Voltar
No **Portal Acadêmico**, aplicamos quatro cuidados essenciais de UI/UX:
1. **Prevenção de Erros em Ações Destrutivas (Botão Excluir e Sair)**:
   - Em `AtividadesScreen.tsx`, tocar no ícone de lixeira (`trash-outline`) **não apaga a atividade imediatamente**. Ele abre um `<Modal>` centralizado exibindo o título da atividade e exigindo confirmação explícita (*"Cancelar"* vs *"Confirmar Exclusão"*). O mesmo ocorre no botão **Sair** em `PerfilScreen.tsx` e `MainDrawer.tsx`.
2. **Semântica de Cores (Hierarquia Visual)**:
   - Botões de **Excluir / Sair** utilizam vermelho (`#DC2626` / `#FEE2E2`) para indicar perigo/ação destrutiva.
   - Botões de **Salvar / Adicionar / Ação Principal** utilizam laranja institucional (`#F97316`) com ícone de confirmação (`add-circle-outline` ou `checkmark`).
   - Botões de **Cancelar** utilizam fundo neutro (`#F8FAFC`) e borda cinza (`#CBD5E1`).
3. **Validação antes de Salvar**:
   - Em `AtividadesScreen.tsx` e no modal de `PerfilScreen.tsx`, o botão de salvar verifica `if (!titulo.trim())` antes de gravar, exibindo um alerta visual caso o campo obrigatório esteja vazio.
4. **Dupla Opção de Retorno (Botão Voltar)**:
   - Em `DetalhesScreen.tsx`, além da seta nativa no cabeçalho da `Stack`, adicionamos um botão explícito **"Voltar"** com ícone `arrow-back` acionando `navigation.goBack()`, facilitando o alcance com o polegar na parte inferior da tela.

---

## PARTE 3: NAVEGAÇÃO ENTRE TELAS

### Questão 8 — Explicação do Stack Navigator e versão didática do `DisciplinasStack.tsx`
**Explicação:**
O **Stack Navigator** (`@react-navigation/native-stack`) gerencia a navegação em formato de **pilha (LIFO — Last In, First Out)**. Quando o usuário navega para uma nova tela (ex: de `DisciplinasList` para `Detalhes`), a nova tela é empilhada no topo; ao voltar (`goBack`), a tela do topo é desempilhada, revelando a tela anterior preservada.

**Versão simplificada do nosso `src/navigation/DisciplinasStack.tsx` para copiar à mão:**
```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DisciplinasStackParamList } from '../types';
import DisciplinasScreen from '../screens/DisciplinasScreen';
import DetalhesScreen from '../screens/DetalhesScreen';

const Stack = createNativeStackNavigator<DisciplinasStackParamList>();

export default function DisciplinasStack() {
  return (
    <Stack.Navigator initialRouteName="DisciplinasList">
      <Stack.Screen
        name="DisciplinasList"
        component={DisciplinasScreen}
        options={{ title: 'Minhas Disciplinas' }}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetalhesScreen}
        options={({ route }) => ({
          title: route.params.disciplina.nome,
        })}
      />
    </Stack.Navigator>
  );
}
```

---

### Questão 9 — Explicação do Bottom Tabs Navigator e justificativa das abas de `MainTabs.tsx`
**Explicação:**
O **Bottom Tabs Navigator** (`@react-navigation/bottom-tabs`) exibe uma barra fixa na parte inferior da tela contendo de 3 a 5 destinos principais de mesmo nível hierárquico, permitindo alternar entre os módulos mais frequentes com apenas um toque do polegar.

**Justificativa das 4 abas implementadas em `src/navigation/MainTabs.tsx`:**
1. **`Inicio` (`HomeScreen`)**: Visão consolidada imediata (média global, frequência média e atalhos rápidos).
2. **`Disciplinas` (`DisciplinasStack`)**: Consulta diária da grade curricular e ementas das matérias do semestre.
3. **`Notas` (`NotasScreen`)**: Acompanhamento constante de notas parciais (AV1/AV2), médias e situação de aprovação/reprovação.
4. **`Perfil` (`PerfilScreen`)**: Acesso rápido à identificação estudantil (matrícula), preferência de notificações e encerramento de sessão.

---

### Questão 10 — Explicação do Drawer Navigator (`MainDrawer.tsx`) e quando substitui melhor as abas
**Explicação:**
O **Drawer Navigator** (`@react-navigation/drawer`) cria um menu lateral oculto que desliza da esquerda para a direita (acionado por gesto de *swipe* ou pelo botão de menu `☰` no cabeçalho).

- **Como foi implementado em `src/navigation/MainDrawer.tsx`**:
  Utilizamos `createDrawerNavigator<DrawerParamList>()` com um `CustomDrawerContent` que renderiza o cabeçalho do aluno (nome, curso e matrícula `2026014892`), a lista de rotas (`Principal` apontando para `MainTabs`, `Atividades`, `Configuracoes` e `Sobre`) e, no rodapé, um botão customizado **Sair** com Modal de confirmação.
- **Quando substitui melhor as abas inferiores**:
  Quando o aplicativo possui **muitas seções (mais de 5 rotas)** ou inclui **telas secundárias/administrativas de acesso menos frequente** (como *Configurações*, *Sobre o App*, *Termos de Uso* e módulos complementares como *Atividades*), que poluiriam e apertariam a barra inferior se fossem colocadas todas em Bottom Tabs.

---

### Questão 11 — Comparação entre Stack, Tabs e Drawer e como estão aninhados no projeto

| Navegador | Estrutura Visual | Caso de Uso Principal |
| :--- | :--- | :--- |
| **Stack** | Pilha sequencial com cabeçalho e botão voltar | Fluxos lineares e hierárquicos (Login -> App; Lista -> Detalhes) |
| **Bottom Tabs** | Barra horizontal fixa na base da tela | Alternância rápida entre as 3 a 5 telas mais usadas do app |
| **Drawer** | Painel lateral retrátil (*menu hambúrguer*) | Menu global para seções secundárias, configurações e logout |

**Como estão aninhados juntos neste projeto:**
Seguimos a hierarquia em 4 níveis:
`RootNavigator (Stack) -> MainDrawer (Drawer) -> MainTabs (Bottom Tabs) -> DisciplinasStack (Stack)`
1. O **`RootNavigator`** (Stack Raiz) separa a tela pública `Login` da área autenticada `MainDrawer`.
2. O **`MainDrawer`** (Drawer) envolve a área logada, tendo como primeira rota `Principal` o componente `MainTabs`, além de `Atividades`, `Configuracoes` e `Sobre`.
3. O **`MainTabs`** (Bottom Tabs) exibe as 4 abas inferiores (`Inicio`, `Disciplinas`, `Notas`, `Perfil`).
4. Na aba `Disciplinas`, em vez de uma tela isolada, renderizamos o **`DisciplinasStack`** (Stack interno), permitindo navegar de `DisciplinasList` para `Detalhes` mantendo o contexto da aba.

---

### Questão 12 — Diferença entre `navigation.navigate()` e `navigation.goBack()` com exemplos reais

- **`navigation.navigate('NomeDaRota', params)`**: Avança para uma tela específica informada pelo nome (empilhando-a no Stack ou alternando para a aba/drawer correspondente) e permite enviar um objeto de parâmetros (`params`) para a tela de destino.
  - **Exemplo real extraído de `src/screens/DisciplinasScreen.tsx` (linha 28)**:
    ```tsx
    onPress={() => navigation.navigate('Detalhes', { disciplina: item })}
    ```
- **`navigation.goBack()`**: Desempilha a tela atual e retorna imediatamente para a tela anterior no histórico de navegação, sem precisar informar o nome da tela de origem.
  - **Exemplo real extraído de `src/screens/DetalhesScreen.tsx` (linha 183)**:
    ```tsx
    onPress={() => navigation.goBack()}
    ```

---

## PARTE 4: IMPLEMENTAÇÃO E CUIDADOS TÉCNICOS

### Questão 13 — 5 Cuidados técnicos reais aplicados na configuração deste projeto
1. **Instalação compatível com o SDK (`npx expo install`)**: Garante que bibliotecas nativas (`react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`) sejam instaladas nas versões exatas homologadas para o Expo Go (SDK 58).
2. **Plugin do Reanimated no `babel.config.js`**: O plugin `'react-native-reanimated/plugin'` foi declarado obrigatoriamente como o **último item** do array `plugins` no `babel.config.js`, requisito essencial para que as animações do Drawer funcionem.
3. **Importação prioritária do Gesture Handler**: A linha `import 'react-native-gesture-handler';` foi colocada na **primeira linha** de `index.ts` e `App.tsx`, além do uso de `<GestureHandlerRootView style={{ flex: 1 }}>` envolvendo a árvore do app.
4. **Uso único do `NavigationContainer`**: O `<NavigationContainer>` foi instanciado uma única vez no topo da árvore de navegação (`src/navigation/RootNavigator.tsx`). Nunca se deve aninhar um `NavigationContainer` dentro de outro.
5. **Tipagem Estrita de Rotas e Safe Area Insets**: Todas as rotas foram tipadas em `src/types/index.ts` (`RootStackParamList`, `DrawerParamList`, `TabParamList`, `DisciplinasStackParamList`) e aplicamos `useSafeAreaInsets` para evitar sobreposição com a barra de navegação nativa do Android.

---

### Questão 14 — Causa e resolução do erro `"Unable to download asset from url: custom-icon-font.ttf"` no Expo Go
- **Causa Técnica**:
  Esse erro ocorre quando o aplicativo no **Expo Go** tenta baixar o arquivo de fonte de ícones (`.ttf`, como `Ionicons.ttf`) a partir do servidor de desenvolvimento (Metro Bundler) e falha por:
  1. Cache corrompido do Metro Bundler após instalar novas bibliotecas;
  2. Desconexão ou bloqueio de firewall na rede Wi-Fi local entre o celular e o computador;
  3. Importação incorreta de fontes customizadas sem aguardar o carregamento ou sem o pacote `@expo/vector-icons` / `expo-font` compatível com o SDK.
- **Passos de Resolução**:
  1. Verificar se o pacote `@expo/vector-icons` está instalado com versão compatível (`npx expo install @expo/vector-icons`).
  2. Parar o servidor no terminal (`Ctrl + C`) e reiniciar limpando o cache do bundler com:
     ```bash
     npx expo start -c
     ```
  3. Garantir que o computador e o smartphone estejam na mesma rede Wi-Fi (ou usar `npx expo start --tunnel` caso a rede bloqueie conexões locais).

---

### Questão 15 — Importância da modularização (`src/screens`, `src/navigation`, `src/data`, `src/types`)
A separação de responsabilidades (*Separation of Concerns*) adotada no projeto traz três benefícios diretos de engenharia de software:
1. **Manutenibilidade**: Cada arquivo tem uma única responsabilidade clara. Se for necessário ajustar uma regra de cálculo na tela de notas, edita-se apenas `src/screens/NotasScreen.tsx` sem risco de quebrar a configuração do Drawer em `src/navigation/MainDrawer.tsx`.
2. **Reutilização de Código e Dados**: A tela `src/screens/DetalhesScreen.tsx` é reutilizada tanto pelo fluxo de `DisciplinasScreen` quanto por `NotasScreen`, e a massa de dados `src/data/mockDisciplinas.ts` alimenta `HomeScreen`, `DisciplinasScreen`, `NotasScreen` e `PerfilScreen` a partir de uma única fonte da verdade.
3. **Evolução e Escalabilidade Segura**: Centralizar as interfaces em `src/types/index.ts` garante que qualquer mudança no modelo `Disciplina` ou `Atividade` seja validada automaticamente pelo compilador TypeScript em todas as telas e navegadores antes mesmo de rodar o app.

---

## PARTE 5: PROJETO DE APLICATIVO ACADÊMICO (QUESTÃO 16)

### 16.1. Nome e Objetivo do Aplicativo
- **Nome**: **Portal Acadêmico Mobile**
- **Objetivo**: Centralizar a vida acadêmica do estudante de Análise e Desenvolvimento de Sistemas em um aplicativo móvel intuitivo, permitindo consultar disciplinas e ementas, acompanhar notas parciais e frequência com cálculo automático de aprovação ($\text{Média} \ge 7.0$ e $\text{Frequência} \ge 75\%$), gerenciar atividades pendentes/concluídas e administrar seu perfil estudantil.

---

### 16.2. Wireframes em Texto/ASCII das 4 Telas Principais (Para Desenhar à Mão)

```text
+-----------------------------------+   +-----------------------------------+
|           TELA 1: LOGIN           |   |        TELA 2: DISCIPLINAS        |
+-----------------------------------+   +-----------------------------------+
|          [Ícone: school]          |   | [☰ Menu]  Minhas Disciplinas      |
|         PORTAL ACADÊMICO          |   +-----------------------------------+
|  Análise e Desenv. de Sistemas    |   | [Banner: Disciplinas Matriculadas]|
|                                   |   |                                   |
|  +-----------------------------+  |   | +-------------------------------+ |
|  | Acesso do Estudante         |  |   | | [book] Desenvolvimento Mobile>| |
|  |                             |  |   | | Prof. Dr. Carlos Eduardo      | |
|  | Matrícula / E-mail:         |  |   | | 80h | Média: 8.8 | [Aprovado] | |
|  | [👤 2026014892            ] |  |   | +-------------------------------+ |
|  |                             |  |   | +-------------------------------+ |
|  | Senha:                      |  |   | | [book] Banco de Dados        >| |
|  | [🔒 ******             👁️] |  |   | | Prof. Dr. Marcos Vinícius     | |
|  |                             |  |   | | 80h | Média: 7.8 | [Reprovado]| |
|  | [  Entrar no Portal   ->  ] |  |   | +-------------------------------+ |
|  +-----------------------------+  |   | [🏠Início] [📖Disc.] [📊Notas] [👤] |
+-----------------------------------+   +-----------------------------------+

+-----------------------------------+   +-----------------------------------+
|     TELA 3: DETALHES (STACK)      |   |    TELA 4: MINHAS ATIVIDADES      |
+-----------------------------------+   +-----------------------------------+
| [<-] Desenvolvimento Mobile       |   | [☰ Menu]  Minhas Atividades       |
+-----------------------------------+   +-----------------------------------+
| [80h]                  [Aprovado] |   | [Total: 2 | Concl.: 1 | Pend.: 1] |
| Desenvolvimento Mobile            |   | +-------------------------------+ |
| 👤 Prof. Dr. Carlos Eduardo       |   | | (+) Nova Atividade Acadêmica  | |
|                                   |   | | Título: [                   ] | |
| +-------------+   +-------------+ |   | | Disc.:  [                   ] | |
| | Nota 1: 8.5 |   | Nota 2: 9.0 | |   | | Descr.: [                   ] | |
| +-------------+   +-------------+ |   | | [ (+) Adicionar Atividade   ] | |
| | Média:  8.8 |   | Freq.:  92% | |   | +-------------------------------+ |
| +-------------+   +-------------+ |   | +-------------------------------+ |
| [======= Barra Freq 92% ========] |   | | [☑] ~~Prototipar Navegação~~ 🗑️| |
| [✓ Situação Final: Aprovado     ] |   | |     [Desenv. Mobile] [Concl.] | |
|                                   |   | +-------------------------------+ |
| 📄 Ementa Curricular:             |   | +-------------------------------+ |
| Arquitetura do React Native...    |   | | [☐] Modelagem SQL            🗑️| |
|                                   |   | |     [Banco de Dados] [Pend.]  | |
| [      <- Voltar (goBack)       ] |   | +-------------------------------+ |
+-----------------------------------+   +-----------------------------------+
```

---

### 16.3. Resumo da Arquitetura de Navegação (Stack, Tabs e Drawer)
- **`RootNavigator` (Native Stack)**: Controla a transição entre `LoginScreen` e `MainDrawer`, além da rota global `Detalhes`.
- **`MainDrawer` (Drawer Navigator)**: Menu lateral contendo `Principal` (que carrega o `MainTabs`), `Atividades`, `Configuracoes`, `Sobre` e o botão customizado `Sair` com Modal de confirmação.
- **`MainTabs` (Bottom Tabs)**: Barra inferior com 4 abas: `Inicio` (`HomeScreen`), `Disciplinas` (`DisciplinasStack`), `Notas` (`NotasScreen`) e `Perfil` (`PerfilScreen`).
- **`DisciplinasStack` (Native Stack)**: Pilha interna da aba Disciplinas com `DisciplinasList` (`DisciplinasScreen`) e `Detalhes` (`DetalhesScreen`).

---

### 16.4. Exemplo Real de Uso do `TouchableOpacity` no Aplicativo
Extraído de `src/screens/DetalhesScreen.tsx` (botão explícito para voltar à tela anterior):
```tsx
<TouchableOpacity
  style={styles.backButton}
  activeOpacity={0.7}
  onPress={() => navigation.goBack()}
>
  <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
  <Text style={styles.backButtonText}>Voltar</Text>
</TouchableOpacity>
```

---

### 16.5. Explicação Técnica: Envio (`navigation.navigate`) e Recebimento (`route.params`)
1. **Contrato de Tipo (`src/types/index.ts`)**: Definimos na lista de parâmetros que a rota `Detalhes` exige um objeto `{ disciplina: Disciplina }`.
2. **Envio na Tela de Origem (`DisciplinasScreen.tsx` e `NotasScreen.tsx`)**: Dentro do `FlatList`, cada card recebe o objeto `item` da disciplina atual e, no evento `onPress`, invoca `navigation.navigate('Detalhes', { disciplina: item })`, serializando a referência do objeto para a rota de destino.
3. **Recuperação na Tela de Destino (`DetalhesScreen.tsx`)**: O React Navigation injeta a prop `route` no componente `DetalhesScreen`. Desestruturamos `const { disciplina } = route.params;` com total segurança de tipos para exibir nome, professor, notas, frequência e ementa.

---

### 16.6. Três Cuidados Técnicos Adotados no Desenvolvimento
1. **Prevenção de Retorno Indevido ao Login**: Uso de `navigation.replace('MainDrawer')` no login e `navigation.reset({ index: 0, routes: [{ name: 'Login' }] })` no logout para limpar o histórico da pilha.
2. **Confirmação Modal em Ações Críticas**: Exclusão de atividades e encerramento de sessão protegidos por componente `<Modal>` de confirmação.
3. **Tratamento de Áreas Seguras (`useSafeAreaInsets`)**: Aplicação de `paddingBottom` dinâmico no `MainTabs` e no rodapé do `MainDrawer` para impedir sobreposição com a barra de navegação do Android.

---

### 16.7. Fluxograma Completo em Texto/ASCII e Dois Trechos de Código Reais

```text
                       +-----------------------+
                       |     LoginScreen       |
                       |      (RootStack)      |
                       +-----------+-----------+
                                   |
                 navigation.replace('MainDrawer')
                                   v
+---------------------------------------------------------------------+
|                        MainDrawer (Menu Lateral)                    |
|  +-------------------+  +--------------+  +----------+  +--------+  |
|  | Principal (Tabs)  |  |  Atividades  |  | Config.  |  | Sobre  |  |
|  +---------+---------+  +--------------+  +----------+  +--------+  |
|            |                                                        |
|            v                                                        |
|  +---------------------------------------------------------------+  |
|  |                    MainTabs (Bottom Tabs)                     |  |
|  |  +----------+   +------------------+   +---------+  +------+  |  |
|  |  |  Início  |   |   Disciplinas    |   |  Notas  |  |Perfil|  |  |
|  |  +----------+   +--------+---------+   +----+----+  +---+--+  |  |
|  +--------------------------|------------------|-----------+-----+  |
+-----------------------------|------------------|-----------+--------+
                              |                  |           |
                              v                  |     Modal Logout
                     +-----------------+         |     reset('Login')
                     | DisciplinasList |         |
                     +--------+--------+         |
                              |                  |
        navigate('Detalhes',  |                  | navigate('Detalhes',
          { disciplina })     |                  |   { disciplina })
                              v                  v
                       +------------------------------+
                       |        DetalhesScreen        |
                       |  route.params.disciplina     |
                       |  Botão Voltar -> goBack()    |
                       +------------------------------+
```

#### Trecho 1 — Enviando parâmetros ao tocar na disciplina (`src/screens/DisciplinasScreen.tsx`)
```tsx
<TouchableOpacity
  style={styles.card}
  activeOpacity={0.85}
  onPress={() => navigation.navigate('Detalhes', { disciplina: item })}
>
  <Text style={styles.courseName}>{item.nome}</Text>
  <Text style={styles.professorName}>{item.professor}</Text>
</TouchableOpacity>
```

#### Trecho 2 — Recebendo `route.params` e calculando a média e aprovação (`src/screens/DetalhesScreen.tsx`)
```tsx
export default function DetalhesScreen({ route, navigation }: Props) {
  const { disciplina } = route.params;

  const media = (disciplina.nota1 + disciplina.nota2) / 2;
  const aprovado = media >= 7.0 && disciplina.frequencia >= 75;
  const situacao = aprovado ? 'Aprovado' : 'Reprovado';

  return (
    <ScrollView>
      <Text>{disciplina.nome}</Text>
      <Text>Média: {media.toFixed(1)}</Text>
      <Text>Frequência: {disciplina.frequencia}%</Text>
      <Text>Situação: {situacao}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
```
