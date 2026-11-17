import { NavigatorScreenParams } from '@react-navigation/native';

// ==========================================
// 1. Interfaces de Domínio Acadêmico
// ==========================================

export interface Disciplina {
  id: string;
  nome: string;
  professor: string;
  cargaHoraria: number;
  ementa: string;
  nota1: number;
  nota2: number;
  frequencia: number;
}

export interface Atividade {
  id: string;
  titulo: string;
  descricao: string;
  disciplina: string;
  concluida: boolean;
}

// ==========================================
// 2. Tipagem Estrita de Rotas (React Navigation)
// ==========================================

/**
 * Stack de Disciplinas (Master-Detail dentro da Tab de Disciplinas)
 */
export type DisciplinasStackParamList = {
  DisciplinasList: undefined;
  Detalhes: { disciplina: Disciplina };
};

/**
 * Bottom Tabs principais do Portal Acadêmico (MainTabs)
 */
export type TabParamList = {
  Inicio: undefined;
  Disciplinas: NavigatorScreenParams<DisciplinasStackParamList> | undefined;
  Notas: undefined;
  Perfil: undefined;
};

/**
 * Drawer lateral envolvendo as Bottom Tabs e telas institucionais (MainDrawer)
 */
export type DrawerParamList = {
  Principal: NavigatorScreenParams<TabParamList> | undefined;
  Atividades: undefined;
  Configuracoes: undefined;
  Sobre: undefined;
};

/**
 * Stack Raiz do aplicativo (Login -> MainDrawer)
 */
export type RootStackParamList = {
  Login: undefined;
  MainDrawer: NavigatorScreenParams<DrawerParamList> | undefined;
  Detalhes: { disciplina: Disciplina };
};

// Aliases de compatibilidade
export type MainTabParamList = TabParamList;
export type MainDrawerParamList = DrawerParamList;
