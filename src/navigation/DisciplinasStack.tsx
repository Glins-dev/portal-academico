import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DisciplinasStackParamList } from '../types';
import DisciplinasScreen from '../screens/DisciplinasScreen';
import DetalhesScreen from '../screens/DetalhesScreen';

const Stack = createNativeStackNavigator<DisciplinasStackParamList>();

export default function DisciplinasStack(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="DisciplinasList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0F2C59',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
      }}
    >
      <Stack.Screen
        name="DisciplinasList"
        component={DisciplinasScreen}
        options={{
          title: 'Minhas Disciplinas',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetalhesScreen}
        options={({ route }) => ({
          title: route.params.disciplina.nome,
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 12,
    padding: 4,
  },
});
