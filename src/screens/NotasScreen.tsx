import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Disciplina, RootStackParamList, TabParamList } from '../types';
import { MOCK_DISCIPLINAS } from '../data/mockDisciplinas';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Notas'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function NotasScreen({ navigation }: Props): React.JSX.Element {
  const [disciplinas] = useState<Disciplina[]>(MOCK_DISCIPLINAS);

  const totalDisciplinas = disciplinas.length;
  const totalAprovadas = disciplinas.filter((item) => {
    const media = (item.nota1 + item.nota2) / 2;
    return media >= 7.0 && item.frequencia >= 75;
  }).length;
  const totalReprovadas = totalDisciplinas - totalAprovadas;

  const mediaGlobal =
    disciplinas.reduce((acc, item) => acc + (item.nota1 + item.nota2) / 2, 0) /
    totalDisciplinas;

  const renderItem = ({ item }: { item: Disciplina }): React.JSX.Element => {
    const media = (item.nota1 + item.nota2) / 2;
    const aprovado = media >= 7.0 && item.frequencia >= 75;
    const situacao = aprovado ? 'Aprovado' : 'Reprovado';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.75}
        onPress={() => navigation.navigate('Detalhes', { disciplina: item })}
      >
        {/* Topo do Card: Nome, Professor e Badge de Situação */}
        <View style={styles.cardHeader}>
          <View style={styles.titleBlock}>
            <Text style={styles.courseName}>{item.nome}</Text>
            <View style={styles.professorRow}>
              <Ionicons name="person-outline" size={13} color="#64748B" />
              <Text style={styles.professorName}>{item.professor}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              aprovado ? styles.approvedBadge : styles.failedBadge,
            ]}
          >
            <Ionicons
              name={aprovado ? 'checkmark-circle' : 'close-circle'}
              size={14}
              color={aprovado ? '#15803D' : '#B91C1C'}
            />
            <Text
              style={[
                styles.statusBadgeText,
                aprovado ? styles.approvedBadgeText : styles.failedBadgeText,
              ]}
            >
              {situacao}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Indicadores de Avaliação: Nota 1, Nota 2, Média e Frequência */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Nota 1</Text>
            <Text style={styles.metricValue}>{item.nota1.toFixed(1)}</Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Nota 2</Text>
            <Text style={styles.metricValue}>{item.nota2.toFixed(1)}</Text>
          </View>

          <View style={[styles.metricBox, styles.mediaMetricBox]}>
            <Text style={[styles.metricLabel, styles.mediaMetricLabel]}>
              Média
            </Text>
            <Text
              style={[
                styles.metricValue,
                { color: media >= 7.0 ? '#0F2C59' : '#DC2626' },
              ]}
            >
              {media.toFixed(1)}
            </Text>
          </View>

          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Frequência</Text>
            <Text
              style={[
                styles.metricValue,
                { color: item.frequencia >= 75 ? '#15803D' : '#DC2626' },
              ]}
            >
              {item.frequencia}%
            </Text>
          </View>
        </View>

        {/* Rodapé do Card: Indicador de Ação para Detalhes */}
        <View style={styles.cardFooter}>
          <Text style={styles.footerInfoText}>
            {media >= 7.0 && item.frequencia < 75
              ? 'Atenção: Média atingida, mas frequência inferior a 75%'
              : media < 7.0 && item.frequencia >= 75
                ? 'Atenção: Frequência regular, mas média inferior a 7.0'
                : !aprovado
                  ? 'Atenção: Média (< 7.0) e frequência (< 75%) insuficientes'
                  : 'Critérios de nota e frequência integralmente cumpridos'}
          </Text>
          <View style={styles.detailsActionRow}>
            <Text style={styles.detailsLinkText}>Detalhes</Text>
            <Ionicons name="chevron-forward" size={16} color="#F97316" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={disciplinas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* Resumo Consolidado do Boletim */}
            <View style={styles.summaryBanner}>
              <View style={styles.summaryHeaderRow}>
                <View>
                  <Text style={styles.summaryTag}>BOLETIM SEMESTRAL</Text>
                  <Text style={styles.summaryTitle}>
                    Desempenho & Frequência
                  </Text>
                </View>
                <View style={styles.craBadge}>
                  <Text style={styles.craLabel}>Média Geral</Text>
                  <Text style={styles.craValue}>{mediaGlobal.toFixed(1)}</Text>
                </View>
              </View>

              <View style={styles.countersRow}>
                <View style={styles.counterItem}>
                  <Text style={styles.counterNumber}>{totalDisciplinas}</Text>
                  <Text style={styles.counterLabel}>Disciplinas</Text>
                </View>
                <View style={styles.counterDivider} />
                <View style={styles.counterItem}>
                  <Text style={[styles.counterNumber, { color: '#4ADE80' }]}>
                    {totalAprovadas}
                  </Text>
                  <Text style={styles.counterLabel}>Aprovadas</Text>
                </View>
                <View style={styles.counterDivider} />
                <View style={styles.counterItem}>
                  <Text style={[styles.counterNumber, { color: '#F87171' }]}>
                    {totalReprovadas}
                  </Text>
                  <Text style={styles.counterLabel}>Reprovadas</Text>
                </View>
              </View>

              <View style={styles.ruleLegendBox}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#F97316"
                />
                <Text style={styles.ruleLegendText}>
                  Critério de Aprovação: Média &gt;= 7.0 E Frequência &gt;= 75%
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Disciplinas Avaliadas ({totalDisciplinas})
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
  summaryBanner: {
    backgroundColor: '#0F2C59',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F97316',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  craBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(249, 115, 22, 0.5)',
  },
  craLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  craValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F97316',
  },
  countersRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    paddingVertical: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 14,
  },
  counterItem: {
    alignItems: 'center',
    flex: 1,
  },
  counterNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  counterLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#CBD5E1',
    marginTop: 2,
  },
  counterDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  ruleLegendBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  ruleLegendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E2E8F0',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleBlock: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  professorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  professorName: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  approvedBadge: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  failedBadge: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
  approvedBadgeText: {
    color: '#15803D',
  },
  failedBadgeText: {
    color: '#B91C1C',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  metricBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mediaMetricBox: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  mediaMetricLabel: {
    color: '#C2410C',
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    gap: 8,
  },
  footerInfoText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  detailsActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  detailsLinkText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F97316',
  },
});
