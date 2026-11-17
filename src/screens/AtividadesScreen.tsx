import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Atividade } from '../types';

const ATIVIDADES_INICIAIS: Atividade[] = [
  {
    id: '1',
    titulo: 'Prototipar Navegação Híbrida no Expo',
    descricao:
      'Configurar Stack, Drawer e Bottom Tabs com tipagem estrita em TypeScript.',
    disciplina: 'Desenvolvimento Mobile',
    concluida: true,
  },
  {
    id: '2',
    titulo: 'Modelagem Física e Normalização SQL',
    descricao:
      'Aplicar 1FN, 2FN e 3FN no diagrama relacional do sistema acadêmico.',
    disciplina: 'Banco de Dados',
    concluida: false,
  },
];

export default function AtividadesScreen(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  // Estados da lista de atividades e formulário
  const [atividades, setAtividades] =
    useState<Atividade[]>(ATIVIDADES_INICIAIS);
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [disciplina, setDisciplina] = useState<string>('');
  const [erroValidacao, setErroValidacao] = useState<string>('');

  // Estado do Modal de confirmação de exclusão
  const [atividadeParaExcluir, setAtividadeParaExcluir] =
    useState<Atividade | null>(null);

  const totalAtividades = atividades.length;
  const totalConcluidas = atividades.filter((item) => item.concluida).length;
  const totalPendentes = totalAtividades - totalConcluidas;

  const handleAdicionarAtividade = (): void => {
    if (!titulo.trim()) {
      setErroValidacao('O título da atividade é obrigatório.');
      return;
    }

    const novaAtividade: Atividade = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      descricao: descricao.trim() || 'Sem descrição detalhada.',
      disciplina: disciplina.trim() || 'Geral / Institucional',
      concluida: false,
    };

    setAtividades((prev) => [novaAtividade, ...prev]);
    setTitulo('');
    setDescricao('');
    setDisciplina('');
    setErroValidacao('');
  };

  const handleAlternarStatus = (id: string): void => {
    setAtividades((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  const handleConfirmarExclusao = (): void => {
    if (!atividadeParaExcluir) {
      return;
    }
    setAtividades((prev) =>
      prev.filter((item) => item.id !== atividadeParaExcluir.id)
    );
    setAtividadeParaExcluir(null);
  };

  const renderItem = ({ item }: { item: Atividade }): React.JSX.Element => {
    return (
      <View
        style={[
          styles.activityCard,
          item.concluida && styles.activityCardCompleted,
        ]}
      >
        <View style={styles.cardHeaderRow}>
          {/* Checkbox para alternar status */}
          <TouchableOpacity
            style={styles.checkboxTouchArea}
            activeOpacity={0.7}
            onPress={() => handleAlternarStatus(item.id)}
          >
            <Ionicons
              name={item.concluida ? 'checkbox' : 'square-outline'}
              size={26}
              color={item.concluida ? '#16A34A' : '#0F2C59'}
            />
          </TouchableOpacity>

          <View style={styles.cardMainInfo}>
            <Text
              style={[
                styles.activityTitle,
                item.concluida && styles.activityTitleCompleted,
              ]}
            >
              {item.titulo}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.courseTag}>
                <Ionicons name="book-outline" size={12} color="#0F2C59" />
                <Text style={styles.courseTagText}>{item.disciplina}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: item.concluida ? '#DCFCE7' : '#FFF7ED',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      color: item.concluida ? '#15803D' : '#C2410C',
                    },
                  ]}
                >
                  {item.concluida ? 'Concluída' : 'Pendente'}
                </Text>
              </View>
            </View>
          </View>

          {/* Botão de excluir com ícone de lixeira */}
          <TouchableOpacity
            style={styles.deleteButton}
            activeOpacity={0.7}
            onPress={() => setAtividadeParaExcluir(item)}
          >
            <Ionicons name="trash-outline" size={20} color="#DC2626" />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.activityDescription,
            item.concluida && styles.activityDescriptionCompleted,
          ]}
        >
          {item.descricao}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={atividades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 24 },
        ]}
        ListHeaderComponent={
          <View>
            {/* Resumo de Progresso */}
            <View style={styles.summaryBanner}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{totalAtividades}</Text>
                <Text style={styles.summaryLabel}>Total</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#4ADE80' }]}>
                  {totalConcluidas}
                </Text>
                <Text style={styles.summaryLabel}>Concluídas</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryNumber, { color: '#FB923C' }]}>
                  {totalPendentes}
                </Text>
                <Text style={styles.summaryLabel}>Pendentes</Text>
              </View>
            </View>

            {/* Formulário de Cadastro */}
            <View style={styles.formCard}>
              <View style={styles.formTitleRow}>
                <Ionicons name="add-circle" size={22} color="#F97316" />
                <Text style={styles.formTitle}>Nova Atividade Acadêmica</Text>
              </View>

              {erroValidacao ? (
                <View style={styles.errorBanner}>
                  <Ionicons name="alert-circle" size={18} color="#DC2626" />
                  <Text style={styles.errorText}>{erroValidacao}</Text>
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Título da Atividade *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Entrega do Relatório de Testes"
                  placeholderTextColor="#94A3B8"
                  value={titulo}
                  onChangeText={(text) => {
                    setTitulo(text);
                    if (erroValidacao) setErroValidacao('');
                  }}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Disciplina Relacionada</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Engenharia de Software"
                  placeholderTextColor="#94A3B8"
                  value={disciplina}
                  onChangeText={setDisciplina}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descreva os detalhes ou critérios da entrega..."
                  placeholderTextColor="#94A3B8"
                  value={descricao}
                  onChangeText={setDescricao}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.7}
                onPress={handleAdicionarAtividade}
              >
                <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Adicionar Atividade</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.listSectionTitle}>
              Lista de Atividades ({totalAtividades})
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={48}
              color="#94A3B8"
            />
            <Text style={styles.emptyTitle}>Nenhuma atividade cadastrada</Text>
            <Text style={styles.emptySubtitle}>
              Utilize o formulário acima para registrar suas próximas entregas do semestre.
            </Text>
          </View>
        }
      />

      {/* Modal Centralizado de Confirmação de Exclusão */}
      <Modal
        visible={atividadeParaExcluir !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setAtividadeParaExcluir(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="trash-outline" size={32} color="#DC2626" />
            </View>

            <Text style={styles.modalTitle}>Excluir Atividade?</Text>
            <Text style={styles.modalMessage}>
              Você confirma a exclusão da atividade{' '}
              <Text style={styles.modalHighlightText}>
                &quot;{atividadeParaExcluir?.titulo}&quot;
              </Text>
              ? Esta ação não poderá ser desfeita.
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                activeOpacity={0.7}
                onPress={() => setAtividadeParaExcluir(null)}
              >
                <Text style={styles.cancelModalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmModalButton}
                activeOpacity={0.7}
                onPress={handleConfirmarExclusao}
              >
                <Ionicons name="trash" size={16} color="#FFFFFF" />
                <Text style={styles.confirmModalButtonText}>
                  Confirmar Exclusão
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 20,
  },
  summaryBanner: {
    backgroundColor: '#0F2C59',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 18,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  formTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F2C59',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    gap: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#DC2626',
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#1E293B',
  },
  textArea: {
    minHeight: 72,
  },
  addButton: {
    backgroundColor: '#F97316',
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  listSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityCardCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxTouchArea: {
    marginRight: 12,
    paddingTop: 1,
  },
  cardMainInfo: {
    flex: 1,
    paddingRight: 8,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  activityTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#15803D',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  courseTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  courseTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F2C59',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginTop: 10,
    marginLeft: 38,
  },
  activityDescriptionCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  emptyBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 10,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
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
  modalIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  modalHighlightText: {
    fontWeight: '700',
    color: '#1E293B',
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
  confirmModalButton: {
    flex: 1.3,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  confirmModalButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
