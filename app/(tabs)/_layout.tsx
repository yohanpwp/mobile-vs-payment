import { Tabs, Redirect } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { TabBarIcon2 } from '@/components/navigation/TabBarIcon2';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon2 icon={focused ? 'home' : 'home-outline'} color={color} name= 'Home' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan QR',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon2 icon={focused ? 'qr-code' : 'qr-code-outline'} color={color} name= 'Scan QR' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon2 icon={focused ? 'time' : 'time-outline'} color={color} name= 'History' focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="usermenu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon2 icon={focused ? 'menu' : 'menu-outline'} color={color} name= 'Menu' focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}