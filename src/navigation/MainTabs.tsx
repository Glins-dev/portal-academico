import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TabParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import DisciplinasStack from './DisciplinasStack';
import NotasScreen from '../screens/NotasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs(): React.JSX.Element {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 10);

  const renderDrawerMenuButton = (): React.JSX.Element => (
    <TouchableOpacity
      style={styles.menuButton}
      activeOpacity={0.7}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    >
      <Ionicons name="menu" size={26} color="#FFFFFF" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#0F2C59',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerLeft: renderDrawerMenuButton,
        tabBarActiveTintColor: '#F97316',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: [
          styles.tabBar,
          {
            height: 66 + bottomPadding,
            paddingBottom: bottomPadding,
            paddingTop: 8,
          },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIconWrapper,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Disciplinas') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Notas') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.activeIconContainer,
              ]}
            >
              <Ionicons
                name={iconName}
                size={22}
                color={color}
                style={styles.iconGlyph}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          title: 'Início',
          headerTitle: 'Portal Acadêmico',
        }}
      />
      <Tab.Screen
        name="Disciplinas"
        component={DisciplinasStack}
        options={{
          title: 'Disciplinas',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notas"
        component={NotasScreen}
        options={{
          title: 'Notas',
          headerTitle: 'Boletim & Notas',
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
          headerTitle: 'Perfil do Estudante',
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 16,
    padding: 4,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  tabBarIconWrapper: {
    width: 48,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  iconContainer: {
    minWidth: 44,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  activeIconContainer: {
    backgroundColor: '#FFF7ED',
  },
  iconGlyph: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
