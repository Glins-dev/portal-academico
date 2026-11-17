import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerParamList, RootStackParamList } from '../types';
import MainTabs from './MainTabs';
import AtividadesScreen from '../screens/AtividadesScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import SobreScreen from '../screens/SobreScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(
  props: DrawerContentComponentProps
): React.JSX.Element {
  const [modalSairVisivel, setModalSairVisivel] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const confirmarLogout = (): void => {
    setModalSairVisivel(false);
    props.navigation.closeDrawer();
    rootNavigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.drawerRoot}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerScroll}
      >
        {/* Cabeçalho do Menu Lateral respeitando o topo seguro */}
        <View
          style={[
            styles.drawerHeader,
            { paddingTop: Math.max(insets.top, 24) + 16 },
          ]}
        >
          <View style={styles.avatarCircle}>
            <Ionicons name="school" size={30} color="#F97316" />
          </View>
          <Text style={styles.studentName}>Guilherme</Text>
          <Text style={styles.studentCourse}>Análise e Desenv. de Sistemas</Text>
          <Text style={styles.studentRegistration}>Matrícula: 2026014892</Text>
        </View>

        {/* Lista de Telas do Drawer */}
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* Rodapé com paddingBottom dinâmico para evitar sobreposição com barra nativa do Android */}
      <View
        style={[
          styles.footerContainer,
          { paddingBottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.7}
          onPress={() => setModalSairVisivel(true)}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#DC2626"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Confirmação de Logout */}
      <Modal
        visible={modalSairVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSairVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconCircle}>
              <Ionicons name="log-out-outline" size={32} color="#DC2626" />
            </View>
            <Text style={styles.modalTitle}>Encerrar Sessão</Text>
            <Text style={styles.modalDescription}>
              Tem certeza que deseja sair do Portal Acadêmico e retornar à tela de Login?
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                activeOpacity={0.7}
                onPress={() => setModalSairVisivel(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                activeOpacity={0.7}
                onPress={confirmarLogout}
              >
                <Text style={styles.confirmButtonText}>Sair Agora</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function MainDrawer(): React.JSX.Element {
  return (
    <Drawer.Navigator
      initialRouteName="Principal"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F2C59',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        drawerActiveBackgroundColor: '#FFF7ED',
        drawerActiveTintColor: '#F97316',
        drawerInactiveTintColor: '#1E293B',
        drawerLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name="Principal"
        component={MainTabs}
        options={{
          title: 'Principal',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Atividades"
        component={AtividadesScreen}
        options={{
          title: 'Atividades',
          headerTitle: 'Minhas Atividades',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={ConfiguracoesScreen}
        options={{
          title: 'Configurações',
          headerTitle: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sobre"
        component={SobreScreen}
        options={{
          title: 'Sobre',
          headerTitle: 'Sobre o Portal',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerRoot: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerScroll: {
    paddingTop: 0,
  },
  drawerHeader: {
    backgroundColor: '#0F2C59',
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 2,
    borderColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  studentCourse: {
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: 2,
  },
  studentRegistration: {
    fontSize: 12,
    color: '#F97316',
    fontWeight: '700',
    marginTop: 4,
  },
  drawerItemsContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 14,
    paddingHorizontal: 16,
    opacity: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 10,
    opacity: 1,
  },
  logoutIcon: {
    opacity: 1,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#DC2626',
    opacity: 1,
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
  modalDescription: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 22,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#475569',
  },
  confirmButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
