import { Disciplina } from '../types';

export const MOCK_DISCIPLINAS: Disciplina[] = [
  {
    id: '1',
    nome: 'Desenvolvimento Mobile',
    professor: 'Prof. Dr. Carlos Eduardo Mendes',
    cargaHoraria: 80,
    nota1: 8.5,
    nota2: 9.0,
    frequencia: 92,
    ementa:
      'Arquitetura do React Native e ecossistema Expo. Componentização, estilização avançada com StyleSheet e Flexbox. Gerenciamento de estado reativo com Hooks (useState). Navegação híbrida com React Navigation (Stack, Bottom Tabs e Drawer) e tipagem estrita com TypeScript.',
  },
  {
    id: '2',
    nome: 'Banco de Dados',
    professor: 'Prof. Dr. Marcos Vinícius Rocha',
    cargaHoraria: 80,
    nota1: 8.0,
    nota2: 7.5,
    frequencia: 70, // Reprovado por falta (< 75%), apesar de média >= 7.0
    ementa:
      'Projeto de banco de dados relacional: modelagem conceitual, lógica e física. Formas normais (1FN, 2FN, 3FN e BCNF). Linguagem SQL avançada (JOINs, Views, Triggers, Stored Procedures), controle transacional ACID, indexação e introdução a bancos NoSQL.',
  },
  {
    id: '3',
    nome: 'Engenharia de Software',
    professor: 'Profa. Dra. Fernanda Costa',
    cargaHoraria: 60,
    nota1: 7.5,
    nota2: 8.0,
    frequencia: 88,
    ementa:
      'Processos de desenvolvimento de software e ciclo de vida de sistemas. Engenharia de requisitos, histórias de usuário e critérios de aceitação. Metodologias ágeis (Scrum, Kanban e XP), arquitetura limpa, testes automatizados e integração contínua.',
  },
  {
    id: '4',
    nome: 'Design de Interação',
    professor: 'Profa. Me. Juliana Martins',
    cargaHoraria: 60,
    nota1: 9.0,
    nota2: 9.5,
    frequencia: 95,
    ementa:
      'Princípios de Interação Humano-Computador (IHC) e User Experience (UX). Heurísticas de usabilidade de Nielsen, arquitetura da informação, prototipação de alta fidelidade para dispositivos móveis, acessibilidade digital e Design Systems.',
  },
  {
    id: '5',
    nome: 'Estruturas de Dados',
    professor: 'Prof. Me. Roberto Almeida',
    cargaHoraria: 80,
    nota1: 5.5,
    nota2: 6.0,
    frequencia: 85, // Reprovado por nota (média 5.8 < 7.0), frequência adequada
    ementa:
      'Análise assintótica de complexidade de algoritmos (Notação Big-O). Estruturas lineares dinâmicas: listas encadeadas, pilhas e filas. Árvores binárias de busca, árvores balanceadas (AVL), tabelas de dispersão (Hash) e algoritmos em grafos.',
  },
  {
    id: '6',
    nome: 'Redes de Computadores',
    professor: 'Prof. Me. André Luiz Gomes',
    cargaHoraria: 60,
    nota1: 4.5,
    nota2: 5.5,
    frequencia: 68, // Reprovado por nota (média 5.0) e por falta (68%)
    ementa:
      'Arquitetura de redes e modelos de referência OSI e TCP/IP. Camada de aplicação (HTTP/HTTPS, DNS, DHCP), transporte (TCP e UDP), rede (IPv4, IPv6, roteamento e sub-redes), enlace e fundamentos de segurança em redes sem fio.',
  },
];

export default MOCK_DISCIPLINAS;
