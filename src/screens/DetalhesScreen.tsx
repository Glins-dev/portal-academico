import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DisciplinasStackParamList, RootStackParamList } from '../types';

type Props =
  | NativeStackScreenProps<DisciplinasStackParamList, 'Detalhes'>
  | NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({
  route,
  navigation,
}: Props): React.JSX.Element {
  const { disciplina } = route.params;
  const insets = useSafeAreaInsets();

  const media = (disciplina.nota1 + disciplina.nota2) / 2;
  const mediaAtingida = media >= 7.0;
  const frequenciaAtingida = disciplina.frequencia >= 75;
  const aprovado = mediaAtingida && frequenciaAtingida;
  const situacao = aprovado ? 'Aprovado' : 'Reprovado';

  const getDiagnosticoDetalhado = (): string => {
    if (aprovado) {
      return 'O estudante atingiu tanto a média mínima (>= 7.0) quanto a frequência mínima exigida (>= 75%).';
    }
    if (!mediaAtingida && !frequenciaAtingida) {
      return 'Reprovação dupla: a média final ficou abaixo de 7.0 e a frequência ficou abaixo de 75%.';
    }
    if (!mediaAtingida) {
      return 'Reprovado por Nota: frequência regular (>= 75%), porém a média final não atingiu 7.0 pontos.';
    }
    return 'Reprovado por Falta: média final suficiente (>= 7.0), porém a frequência ficou abaixo do mínimo de 75%.';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom, 20) + 24 },
      ]}
    >
      {/* Cabeçalho Principal da Disciplina */}
      <View style={styles.headerCard}>
        <View style={styles.courseBadgeRow}>
          <View style={styles.workloadTag}>
            <Ionicons name="time-outline" size={14} color="#F97316" />
            <Text style={styles.workloadText}>
              Carga Horária: {disciplina.cargaHoraria}h
            </Text>
          </View>

          <View
            style={[
              styles.headerStatusBadge,
              { backgroundColor: aprovado ? '#DCFCE7' : '#FEE2E2' },
            ]}
          >
            <Ionicons
              name={aprovado ? 'checkmark-circle' : 'close-circle'}
              size={14}
              color={aprovado ? '#15803D' : '#B91C1C'}
            />
            <Text
              style={[
                styles.headerStatusText,
                { color: aprovado ? '#15803D' : '#B91C1C' },
              ]}
            >
              {situacao}
            </Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{disciplina.nome}</Text>

        <View style={styles.professorRow}>
          <Ionicons name="person-circle-outline" size={20} color="#CBD5E1" />
          <Text style={styles.professorText}>{disciplina.professor}</Text>
        </View>
      </View>

      {/* Desempenho Acadêmico (Notas, Média e Frequência) */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="stats-chart-outline" size={20} color="#0F2C59" />
          <Text style={styles.sectionTitleInline}>
            Indicadores de Avaliação
          </Text>
        </View>

        <View style={styles.gradesGrid}>
          <View style={styles.gradeBox}>
            <Text style={styles.gradeLabel}>Nota 1 (AV1)</Text>
            <Text style={styles.gradeValue}>{disciplina.nota1.toFixed(1)}</Text>
          </View>

          <View style={styles.gradeBox}>
            <Text style={styles.gradeLabel}>Nota 2 (AV2)</Text>
            <Text style={styles.gradeValue}>{disciplina.nota2.toFixed(1)}</Text>
          </View>

          <View style={[styles.gradeBox, styles.highlightGradeBox]}>
            <Text style={[styles.gradeLabel, { color: '#C2410C' }]}>
              Média Calculada
            </Text>
            <Text
              style={[
                styles.gradeValue,
                { color: mediaAtingida ? '#0F2C59' : '#DC2626' },
              ]}
            >
              {media.toFixed(1)}
            </Text>
            <Text style={styles.criteriaHint}>
              {mediaAtingida ? 'Meta >= 7.0 atingida' : 'Abaixo de 7.0'}
            </Text>
          </View>

          <View style={styles.gradeBox}>
            <Text style={styles.gradeLabel}>Frequência</Text>
            <Text
              style={[
                styles.gradeValue,
                { color: frequenciaAtingida ? '#15803D' : '#DC2626' },
              ]}
            >
              {disciplina.frequencia}%
            </Text>
            <Text style={styles.criteriaHint}>
              {frequenciaAtingida ? 'Meta >= 75% atingida' : 'Abaixo de 75%'}
            </Text>
          </View>
        </View>

        {/* Barra visual de Frequência */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Índice de Presença</Text>
            <Text style={styles.progressTarget}>Mínimo exigido: 75%</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${Math.min(disciplina.frequencia, 100)}%`,
                  backgroundColor: frequenciaAtingida ? '#16A34A' : '#DC2626',
                },
              ]}
            />
          </View>
        </View>

        {/* Diagnóstico da Situação Final */}
        <View
          style={[
            styles.statusBanner,
            { backgroundColor: aprovado ? '#DCFCE7' : '#FEE2E2' },
          ]}
        >
          <Ionicons
            name={aprovado ? 'checkmark-circle' : 'alert-circle'}
            size={24}
            color={aprovado ? '#15803D' : '#B91C1C'}
          />
          <View style={styles.statusBannerTextCol}>
            <Text
              style={[
                styles.statusBannerTitle,
                { color: aprovado ? '#15803D' : '#B91C1C' },
              ]}
            >
              Situação Final: {situacao}
            </Text>
            <Text
              style={[
                styles.statusBannerDesc,
                { color: aprovado ? '#166534' : '#991B1B' },
              ]}
            >
              {getDiagnosticoDetalhado()}
            </Text>
          </View>
        </View>
      </View>

      {/* Ementa da Disciplina */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="document-text-outline" size={20} color="#0F2C59" />
          <Text style={styles.sectionTitleInline}>Ementa Curricular</Text>
        </View>
        <Text style={styles.ementaText}>{disciplina.ementa}</Text>
      </View>

      {/* Botão explícito para Voltar */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
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
  },
  headerCard: {
    backgroundColor: '#0F2C59',
    borderRadius: 20,
    padding: 22,
    marginBottom: 18,
  },
  courseBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workloadTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(249, 115, 22, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  workloadText: {
    color: '#F97316',
    fontSize: 12,
    fontWeight: '700',
  },
  headerStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  headerStatusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  courseTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  professorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  professorText: {
    fontSize: 14,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitleInline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  gradeBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  highlightGradeBox: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  gradeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  gradeValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
  },
  criteriaHint: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  progressTarget: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 12,
    gap: 10,
  },
  statusBannerTextCol: {
    flex: 1,
  },
  statusBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 2,
  },
  statusBannerDesc: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  ementaText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#F97316',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
