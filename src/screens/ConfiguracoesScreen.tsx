import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ConfiguracoesScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();
  const [notificacoesNotas, setNotificacoesNotas] = useState<boolean>(true);
  const [alertasFrequencia, setAlertasFrequencia] = useState<boolean>(true);
  const [lembretesAtividades, setLembretesAtividades] = useState<boolean>(true);
  const [economiaDados, setEconomiaDados] = useState<boolean>(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom, 20) + 24 },
      ]}
    >
      <View style={styles.headerBanner}>
        <Ionicons name="settings-outline" size={28} color="#F97316" />
        <View style={styles.headerTextCol}>
          <Text style={styles.headerTitle}>Preferências do Aplicativo</Text>
          <Text style={styles.headerSubtitle}>
            Personalize seus alertas acadêmicos, notificações de avaliação e sincronização.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Notificações Acadêmicas</Text>
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Publicação de Notas</Text>
            <Text style={styles.settingDescription}>
              Receber aviso assim que o professor lançar AV1 ou AV2.
            </Text>
          </View>
          <Switch
            value={notificacoesNotas}
            onValueChange={setNotificacoesNotas}
            trackColor={{ false: '#CBD5E1', true: '#FDBA74' }}
            thumbColor={notificacoesNotas ? '#F97316' : '#F8FAFC'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Alerta de Frequência (&lt; 75%)</Text>
            <Text style={styles.settingDescription}>
              Notificar preventivamente quando a presença se aproximar do limite mínimo.
            </Text>
          </View>
          <Switch
            value={alertasFrequencia}
            onValueChange={setAlertasFrequencia}
            trackColor={{ false: '#CBD5E1', true: '#FDBA74' }}
            thumbColor={alertasFrequencia ? '#F97316' : '#F8FAFC'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Prazos de Atividades</Text>
            <Text style={styles.settingDescription}>
              Enviar lembrete 24 horas antes da entrega de trabalhos práticos.
            </Text>
          </View>
          <Switch
            value={lembretesAtividades}
            onValueChange={setLembretesAtividades}
            trackColor={{ false: '#CBD5E1', true: '#FDBA74' }}
            thumbColor={lembretesAtividades ? '#F97316' : '#F8FAFC'}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Sistema e Sincronização</Text>
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Modo Economia de Dados</Text>
            <Text style={styles.settingDescription}>
              Sincronizar arquivos pesados de ementas apenas em redes Wi-Fi.
            </Text>
          </View>
          <Switch
            value={economiaDados}
            onValueChange={setEconomiaDados}
            trackColor={{ false: '#CBD5E1', true: '#FDBA74' }}
            thumbColor={economiaDados ? '#F97316' : '#F8FAFC'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Ionicons name="color-palette-outline" size={20} color="#0F2C59" />
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Tema Institucional Padrão</Text>
            <Text style={styles.settingDescription}>
              Azul Marinho (#0F2C59) e Laranja Destaque (#F97316) ativos.
            </Text>
          </View>
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
  headerBanner: {
    backgroundColor: '#0F2C59',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  headerTextCol: {
    flex: 1,
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
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  settingDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
});
