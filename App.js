import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './src/screens/Home'
import Config from './src/screens/Config'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#ffffff',
        }}>
        <Stack.Screen 
          name="Home"
          component={ Home }
          options={{ title: 'EMOLDURADO' }} 
          />
        <Stack.Screen 
          name="Config" 
          component={ Config } 
          options={{ title: 'EMOLDURANDO' }} 
          /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}