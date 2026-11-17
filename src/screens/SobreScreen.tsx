import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom, 20) + 24 },
      ]}
    >
      <View style={styles.heroCard}>
        <View style={styles.logoCircle}>
          <Ionicons name="school" size={38} color="#F97316" />
        </View>
        <Text style={styles.appName}>Portal Acadêmico Mobile</Text>
        <Text style={styles.appVersion}>Versão 1.0.0 • Build Expo Go (SDK 58)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sobre a Aplicação</Text>
        <Text style={styles.paragraph}>
          O Portal Acadêmico é uma plataforma mobile desenvolvida para estudantes do ensino superior acompanharem em tempo real sua grade curricular, ementas, notas parciais, frequência e entregas de atividades.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Regras Acadêmicas Vigentes</Text>
        <View style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
          <Text style={styles.ruleText}>
            Média Final mínima para aprovação igual ou superior a 7,0 pontos.
          </Text>
        </View>
        <View style={styles.ruleItem}>
          <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
          <Text style={styles.ruleText}>
            Frequência mínima obrigatória igual ou superior a 75% da carga horária.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ficha Técnica & Arquitetura</Text>
        <View style={styles.techRow}>
          <Text style={styles.techLabel}>Framework:</Text>
          <Text style={styles.techValue}>React Native + Expo</Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techLabel}>Linguagem:</Text>
          <Text style={styles.techValue}>TypeScript (Strict Mode)</Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techLabel}>Navegação:</Text>
          <Text style={styles.techValue}>
            React Navigation (Stack + Drawer + Bottom Tabs)
          </Text>
        </View>
        <View style={styles.techRow}>
          <Text style={styles.techLabel}>Curso:</Text>
          <Text style={styles.techValue}>
            Análise e Desenvolvimento de Sistemas (3º Período)
          </Text>
        </View>
      </View>
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
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 13,
    color: '#CBD5E1',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 21,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  ruleText: {
    flex: 1,
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 19,
  },
  techRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  techLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  techValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2C59',
    flexShrink: 1,
    textAlign: 'right',
  },
});
