import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SmartHeroGalleryScreen from '../screens/SmartHeroGalleryScreen';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Home" component={SmartHeroGalleryScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
