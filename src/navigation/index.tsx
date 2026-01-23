import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './bottomNavigation';
import { getIsLoggedIn } from '../utils/asyncStore';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await getIsLoggedIn();
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={isLoggedIn ? 'BottomNavigation' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Register" component={RegisterScreen} />
        <RootStack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
