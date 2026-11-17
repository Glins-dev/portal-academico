import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import LoginScreen from '../screens/LoginScreen';
import MainDrawer from './MainDrawer';
import DetalhesScreen from '../screens/DetalhesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params.disciplina.nome,
            headerStyle: {
              backgroundColor: '#0F2C59',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 17,
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
