import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../themes/colors';
import ServiceListScreen from '../screens/serviceList';
import RequestedServiceScreen from '../screens/requestedService';
import RecommendedServiceScreen from '../screens/recommendedService';
import ProfileScreen from '../screens/profile';
import { TabBarIcon } from './components/tabBarIcon';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string) => {
  return <TabBarIcon routeName={routeName} />;
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => renderTabBarIcon(route.name),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 55,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          marginTop: 7,
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
      })}
    >
      <Tab.Screen name="Home" component={ServiceListScreen} />
      <Tab.Screen name="Gallery" component={RequestedServiceScreen} />
      <Tab.Screen name="Share" component={RecommendedServiceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
