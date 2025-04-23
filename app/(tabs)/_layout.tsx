import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { COLORS } from '@/assets/constatns/theme'

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{ 
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: COLORS.primary,
            tabBarInactiveTintColor: COLORS.grey,
            tabBarStyle: { 
                height: 50, 
                borderTopWidth: 0,
                elevation: 0,
                paddingBottom: 8,
                backgroundColor: COLORS.background, 
                borderBlockColor: COLORS.background,                 
            },            
         }}
    >
        <Tabs.Screen
            name='index'
            options={{ 
                tabBarIcon: ({size,color}) => <Entypo name="home" size={size} color={color}/>                
             }}
        ></Tabs.Screen>
        <Tabs.Screen
            name='inbox'
            options={{ 
                tabBarIcon: ({size,color}) => <MaterialIcons name="email" size={size} color={color}/>
             }}
        ></Tabs.Screen>
        <Tabs.Screen
            name='profile'
            options={{ 
                tabBarIcon: ({size,color}) => <FontAwesome name="user" size={size} color={color}/>
             }}
        ></Tabs.Screen>
    </Tabs>
  )
}