import { Atividade } from '../types';
import { MOCK_DISCIPLINAS } from './mockDisciplinas';

export const DISCIPLINAS_MOCK = MOCK_DISCIPLINAS;

export const ATIVIDADES_MOCK: Atividade[] = [
  {
    id: '101',
    titulo: 'Implementar Navegação Híbrida (Stack + Tabs + Drawer)',
    descricao: 'Estruturar a navegação completa do Portal Acadêmico utilizando React Navigation e TypeScript.',
    disciplina: 'Desenvolvimento Mobile',
    concluida: true,
  },
  {
    id: '102',
    titulo: 'Documento de Visão e Product Backlog',
    descricao: 'Elaborar os épicos, histórias de usuário e estimativas no Planning Poker para a Sprint 1.',
    disciplina: 'Engenharia de Software',
    concluida: true,
  },
  {
    id: '103',
    titulo: 'Lista Prática de Árvores Binárias de Busca',
    descricao: 'Implementar algoritmos de inserção, remoção e travessia em-ordem e pós-ordem.',
    disciplina: 'Estruturas de Dados',
    concluida: false,
  },
  {
    id: '104',
    titulo: 'Otimização de Queries e Índices Compostos',
    descricao: 'Analisar planos de execução (EXPLAIN ANALYZE) e criar índices para reduzir o tempo de consulta.',
    disciplina: 'Banco de Dados',
    concluida: false,
  },
  {
    id: '105',
    titulo: 'Protótipo de Alta Fidelidade e Teste de Usabilidade',
    descricao: 'Aplicar as 10 heurísticas de Nielsen no fluxo mobile do Portal Acadêmico.',
    disciplina: 'Design de Interação',
    concluida: false,
  },
];
