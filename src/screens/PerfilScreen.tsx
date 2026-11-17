import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList, RootStackParamList, TabParamList } from '../types';
import { MOCK_DISCIPLINAS } from '../data/mockDisciplinas';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Perfil'>,
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export default function PerfilScreen({ navigation }: Props): React.JSX.Element {
  // Estados gerenciados com useState
  const [nomeAluno, setNomeAluno] = useState<string>('Guilherme');
  const [novoNomeInput, setNovoNomeInput] = useState<string>('Guilherme');
  const [erroNome, setErroNome] = useState<string>('');
  const [modalEditarVisivel, setModalEditarVisivel] = useState<boolean>(false);

  const [notificacoesAtivas, setNotificacoesAtivas] = useState<boolean>(true);
  const [modalLogoutVisivel, setModalLogoutVisivel] = useState<boolean>(false);

  // Indicadores acadêmicos calculados a partir das disciplinas
  const totalDisciplinas = MOCK_DISCIPLINAS.length;
  const cargaHorariaTotal = MOCK_DISCIPLINAS.reduce(
    (acc, item) => acc + item.cargaHoraria,
    0
  );
  const aprovadas = MOCK_DISCIPLINAS.filter((item) => {
    const media = (item.nota1 + item.nota2) / 2;
    return media >= 7.0 && item.frequencia >= 75;
  }).length;
  const mediaGeral =
    MOCK_DISCIPLINAS.reduce(
      (acc, item) => acc + (item.nota1 + item.nota2) / 2,
      0
    ) / totalDisciplinas;

  const abrirModalEdicao = (): void => {
    setNovoNomeInput(nomeAluno);
    setErroNome('');
    setModalEditarVisivel(true);
  };

  const salvarNovoNome = (): void => {
    if (!novoNomeInput.trim()) {
      setErroNome('Por favor, informe um nome válido.');
      return;
    }
    setNomeAluno(novoNomeInput.trim());
    setErroNome('');
    setModalEditarVisivel(false);
  };

  const confirmarSaida = (): void => {
    setModalLogoutVisivel(false);
    const rootNav = navigation.getParent()?.getParent() ?? navigation;
    rootNav.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cartão Principal de Identificação do Estudante */}
      <View style={styles.profileHeroCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={44} color="#F97316" />
          </View>
          <View style={styles.onlineStatusDot} />
        </View>

        <Text style={styles.studentName}>{nomeAluno}</Text>
        <Text style={styles.courseName}>
          Análise e Desenvolvimento de Sistemas
        </Text>

        <View style={styles.registrationBadge}>
          <Ionicons name="id-card-outline" size={16} color="#F97316" />
          <Text style={styles.registrationText}>Matrícula: 2026014892</Text>
        </View>

        {/* Botão para Editar Nome */}
        <TouchableOpacity
          style={styles.editNameButton}
          activeOpacity={0.7}
          onPress={abrirModalEdicao}
        >
          <Ionicons name="create-outline" size={18} color="#FFFFFF" />
          <Text style={styles.editNameButtonText}>Editar Nome</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo Acadêmico do Semestre */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="school-outline" size={20} color="#0F2C59" />
          <Text style={styles.sectionTitle}>Resumo Acadêmico (2026.2)</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{totalDisciplinas}</Text>
            <Text style={styles.statLabel}>Disciplinas</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{cargaHorariaTotal}h</Text>
            <Text style={styles.statLabel}>Carga Horária</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#0F2C59' }]}>
              {mediaGeral.toFixed(1)}
            </Text>
            <Text style={styles.statLabel}>Média Geral</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#15803D' }]}>
              {aprovadas}/{totalDisciplinas}
            </Text>
            <Text style={styles.statLabel}>Aprovadas</Text>
          </View>
        </View>
      </View>

      {/* Preferências e Switch de Notificações Acadêmicas */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="notifications-outline" size={20} color="#0F2C59" />
          <Text style={styles.sectionTitle}>Notificações Acadêmicas</Text>
        </View>

        <View style={styles.switchRow}>
          <View style={styles.switchTextCol}>
            <Text style={styles.switchTitle}>Receber Alertas do Portal</Text>
            <Text style={styles.switchSubtitle}>
              Avisos de lançamento de notas, frequência e prazos de entrega de atividades.
            </Text>
          </View>
          <Switch
            value={notificacoesAtivas}
            onValueChange={setNotificacoesAtivas}
            trackColor={{ false: '#CBD5E1', true: '#FDBA74' }}
            thumbColor={notificacoesAtivas ? '#F97316' : '#F8FAFC'}
          />
        </View>

        <View
          style={[
            styles.notificationStatusBox,
            {
              backgroundColor: notificacoesAtivas ? '#DCFCE7' : '#F1F5F9',
              borderColor: notificacoesAtivas ? '#86EFAC' : '#CBD5E1',
            },
          ]}
        >
          <Ionicons
            name={
              notificacoesAtivas
                ? 'checkmark-circle'
                : 'notifications-off-outline'
            }
            size={18}
            color={notificacoesAtivas ? '#15803D' : '#64748B'}
          />
          <Text
            style={[
              styles.notificationStatusText,
              { color: notificacoesAtivas ? '#15803D' : '#475569' },
            ]}
          >
            Status atual:{' '}
            {notificacoesAtivas
              ? 'Notificações Acadêmicas Ativadas'
              : 'Notificações Acadêmicas Desativadas'}
          </Text>
        </View>
      </View>

      {/* Dados Institucionais */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Ionicons name="document-text-outline" size={20} color="#0F2C59" />
          <Text style={styles.sectionTitle}>Vínculo Institucional</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Curso:</Text>
          <Text style={styles.infoValue}>
            Análise e Desenvolvimento de Sistemas
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Matrícula:</Text>
          <Text style={styles.infoValue}>2026014892</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Período / Turno:</Text>
          <Text style={styles.infoValue}>3º Período • Noturno</Text>
        </View>
        <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.infoLabel}>Situação de Matrícula:</Text>
          <Text style={[styles.infoValue, { color: '#15803D' }]}>
            Regular / Ativa
          </Text>
        </View>
      </View>

      {/* Botão Sair do Aplicativo */}
      <TouchableOpacity
        style={styles.logoutButton}
        activeOpacity={0.7}
        onPress={() => setModalLogoutVisivel(true)}
      >
        <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
        <Text style={styles.logoutButtonText}>Sair do Aplicativo</Text>
      </TouchableOpacity>

      {/* Modal de Edição de Nome */}
      <Modal
        visible={modalEditarVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalEditarVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.editModalIconCircle}>
              <Ionicons name="person-circle-outline" size={36} color="#0F2C59" />
            </View>

            <Text style={styles.modalTitle}>Editar Nome do Aluno</Text>
            <Text style={styles.modalDescription}>
              Atualize seu nome de exibição no Portal Acadêmico:
            </Text>

            {erroNome ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle" size={16} color="#DC2626" />
                <Text style={styles.errorText}>{erroNome}</Text>
              </View>
            ) : null}

            <TextInput
              style={styles.modalInput}
              placeholder="Digite seu nome completo"
              placeholderTextColor="#94A3B8"
              value={novoNomeInput}
              onChangeText={(text) => {
                setNovoNomeInput(text);
                if (erroNome) setErroNome('');
              }}
              autoFocus
            />

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                activeOpacity={0.7}
                onPress={() => setModalEditarVisivel(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveModalButton}
                activeOpacity={0.7}
                onPress={salvarNovoNome}
              >
                <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                <Text style={styles.saveModalButtonText}>Salvar Nome</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação de Saída (Logout) */}
      <Modal
        visible={modalLogoutVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalLogoutVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.logoutModalIconCircle}>
              <Ionicons name="log-out-outline" size={32} color="#DC2626" />
            </View>

            <Text style={styles.modalTitle}>Sair do Aplicativo?</Text>
            <Text style={styles.modalDescription}>
              Deseja encerrar sua sessão atual ({nomeAluno}) e retornar para a tela de Login?
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                activeOpacity={0.7}
                onPress={() => setModalLogoutVisivel(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmLogoutModalButton}
                activeOpacity={0.7}
                onPress={confirmarSaida}
              >
                <Ionicons name="exit-outline" size={18} color="#FFFFFF" />
                <Text style={styles.confirmLogoutModalButtonText}>
                  Confirmar Saída
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  profileHeroCard: {
    backgroundColor: '#0F2C59',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#0F2C59',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 2.5,
    borderColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineStatusDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#22C55E',
    borderWidth: 3,
    borderColor: '#0F2C59',
  },
  studentName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  courseName: {
    fontSize: 14,
    color: '#CBD5E1',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
  },
  registrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    marginBottom: 16,
  },
  registrationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  editNameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F97316',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  editNameButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },
  switchTextCol: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  switchSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  notificationStatusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  notificationStatusText: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    flexShrink: 1,
    textAlign: 'right',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  editModalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoutModalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  errorBanner: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
    flex: 1,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: '#1E293B',
    marginBottom: 18,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  cancelModalButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelModalButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  saveModalButton: {
    flex: 1.2,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F97316',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  saveModalButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  confirmLogoutModalButton: {
    flex: 1.3,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  confirmLogoutModalButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
