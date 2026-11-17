import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Disciplina, DisciplinasStackParamList } from '../types';
import { MOCK_DISCIPLINAS } from '../data/mockDisciplinas';

type Props = NativeStackScreenProps<
  DisciplinasStackParamList,
  'DisciplinasList'
>;

export default function DisciplinasScreen({
  navigation,
}: Props): React.JSX.Element {
  const renderItem = ({ item }: { item: Disciplina }): React.JSX.Element => {
    const media = (item.nota1 + item.nota2) / 2;
    const aprovado = media >= 7.0 && item.frequencia >= 75;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('Detalhes', { disciplina: item })}
      >
        <View style={styles.cardTopRow}>
          <View style={styles.iconContainer}>
            <Ionicons name="book-outline" size={22} color="#0F2C59" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.courseName}>{item.nome}</Text>
            <Text style={styles.professorName}>{item.professor}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#F97316" />
        </View>

        <View style={styles.divider} />

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Ionicons name="time-outline" size={15} color="#64748B" />
            <Text style={styles.metricText}>{item.cargaHoraria}h</Text>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="ribbon-outline" size={15} color="#64748B" />
            <Text style={styles.metricText}>Média: {media.toFixed(1)}</Text>
          </View>

          <View style={styles.metricItem}>
            <Ionicons name="calendar-outline" size={15} color="#64748B" />
            <Text style={styles.metricText}>Freq: {item.frequencia}%</Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: aprovado ? '#DCFCE7' : '#FEE2E2' },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: aprovado ? '#15803D' : '#B91C1C' },
              ]}
            >
              {aprovado ? 'Aprovado' : 'Reprovado'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DISCIPLINAS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerBanner}>
            <Text style={styles.headerTitle}>Disciplinas Matriculadas</Text>
            <Text style={styles.headerSubtitle}>
              Toque em um card para visualizar a ementa completa, notas parciais e situação detalhada.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerBanner: {
    backgroundColor: '#0F2C59',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  professorName: {
    fontSize: 13,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
