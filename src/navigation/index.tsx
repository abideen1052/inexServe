import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './bottomNavigation';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <BottomNavigation />
    </NavigationContainer>
  );
}
