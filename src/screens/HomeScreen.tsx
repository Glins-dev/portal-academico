import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList, TabParamList } from '../types';
import { MOCK_DISCIPLINAS } from '../data/mockDisciplinas';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Inicio'>,
  DrawerScreenProps<DrawerParamList>
>;

export default function HomeScreen({ navigation }: Props): React.JSX.Element {
  const totalDisciplinas = MOCK_DISCIPLINAS.length;

  const aprovadas = MOCK_DISCIPLINAS.filter((d) => {
    const media = (d.nota1 + d.nota2) / 2;
    return media >= 7.0 && d.frequencia >= 75;
  }).length;

  const mediaGlobal =
    MOCK_DISCIPLINAS.reduce((acc, d) => acc + (d.nota1 + d.nota2) / 2, 0) /
    totalDisciplinas;

  const frequenciaMedia = Math.round(
    MOCK_DISCIPLINAS.reduce((acc, d) => acc + d.frequencia, 0) / totalDisciplinas
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Banner de Boas-Vindas */}
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <View style={styles.heroTextCol}>
            <Text style={styles.greetingTag}>SEMESTRE LETIVO 2026.2</Text>
            <Text style={styles.greetingTitle}>Olá, Guilherme!</Text>
            <Text style={styles.greetingSubtitle}>
              Análise e Desenvolvimento de Sistemas • 3º Período
            </Text>
          </View>
          <View style={styles.avatarBadge}>
            <Ionicons name="school" size={28} color="#F97316" />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalDisciplinas}</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{mediaGlobal.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Média Geral</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{frequenciaMedia}%</Text>
            <Text style={styles.statLabel}>Frequência</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {aprovadas}/{totalDisciplinas}
            </Text>
            <Text style={styles.statLabel}>Aprovadas</Text>
          </View>
        </View>
      </View>

      {/* Atalhos Visuais */}
      <Text style={styles.sectionTitle}>Atalhos Rápidos</Text>
      <View style={styles.shortcutsGrid}>
        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Disciplinas', { screen: 'DisciplinasList' })
          }
        >
          <View style={[styles.shortcutIcon, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="book" size={24} color="#0F2C59" />
          </View>
          <Text style={styles.shortcutTitle}>Disciplinas</Text>
          <Text style={styles.shortcutDesc}>Grade e ementas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Notas')}
        >
          <View style={[styles.shortcutIcon, { backgroundColor: '#FFF7ED' }]}>
            <Ionicons name="bar-chart" size={24} color="#F97316" />
          </View>
          <Text style={styles.shortcutTitle}>Boletim & Notas</Text>
          <Text style={styles.shortcutDesc}>Médias e faltas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Atividades')}
        >
          <View style={[styles.shortcutIcon, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="checkbox" size={24} color="#16A34A" />
          </View>
          <Text style={styles.shortcutTitle}>Atividades</Text>
          <Text style={styles.shortcutDesc}>Tarefas do semestre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shortcutCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Perfil')}
        >
          <View style={[styles.shortcutIcon, { backgroundColor: '#F5F3FF' }]}>
            <Ionicons name="person" size={24} color="#7C3AED" />
          </View>
          <Text style={styles.shortcutTitle}>Meu Perfil</Text>
          <Text style={styles.shortcutDesc}>Dados acadêmicos</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo Rápido de Disciplinas */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Resumo de Disciplinas</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Disciplinas', { screen: 'DisciplinasList' })
          }
        >
          <Text style={styles.seeAllLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {MOCK_DISCIPLINAS.slice(0, 3).map((disc) => {
        const media = (disc.nota1 + disc.nota2) / 2;
        const aprovado = media >= 7.0 && disc.frequencia >= 75;

        return (
          <TouchableOpacity
            key={disc.id}
            style={styles.discPreviewCard}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Disciplinas', {
                screen: 'Detalhes',
                params: { disciplina: disc },
              })
            }
          >
            <View style={styles.discPreviewLeft}>
              <Text style={styles.discPreviewName}>{disc.nome}</Text>
              <Text style={styles.discPreviewProf}>{disc.professor}</Text>
            </View>
            <View style={styles.discPreviewRight}>
              <Text style={styles.discPreviewMedia}>
                Média: {media.toFixed(1)}
              </Text>
              <View
                style={[
                  styles.statusMiniBadge,
                  { backgroundColor: aprovado ? '#DCFCE7' : '#FEE2E2' },
                ]}
              >
                <Text
                  style={[
                    styles.statusMiniText,
                    { color: aprovado ? '#15803D' : '#B91C1C' },
                  ]}
                >
                  {aprovado ? 'Aprovado' : 'Em Alerta'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  heroCard: {
    backgroundColor: '#0F2C59',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  greetingTag: {
    color: '#F97316',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  greetingTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  greetingSubtitle: {
    color: '#CBD5E1',
    fontSize: 13,
    lineHeight: 18,
  },
  avatarBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1.5,
    borderColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  statLabel: {
    color: '#CBD5E1',
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  seeAllLink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F97316',
    marginBottom: 12,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  shortcutCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  shortcutIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  shortcutTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  shortcutDesc: {
    fontSize: 12,
    color: '#64748B',
  },
  discPreviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  discPreviewLeft: {
    flex: 1,
    paddingRight: 12,
  },
  discPreviewName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  discPreviewProf: {
    fontSize: 12,
    color: '#64748B',
  },
  discPreviewRight: {
    alignItems: 'flex-end',
  },
  discPreviewMedia: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2C59',
    marginBottom: 4,
  },
  statusMiniBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusMiniText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
