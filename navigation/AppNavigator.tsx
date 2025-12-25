import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
} from '@expo-google-fonts/inter';

import ChatScreen from '../screens/ChatScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import NewsScreen from '../screens/NewsScreen';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';

import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.dark.background, shadowColor: 'transparent' },
                headerTintColor: Colors.dark.text,
                drawerStyle: { backgroundColor: Colors.dark.surface },
                drawerActiveTintColor: Colors.dark.primary,
                drawerInactiveTintColor: Colors.dark.textSecondary,
            }}
        >
            <Drawer.Screen
                name="NewChat"
                component={ChatScreen}
                options={{
                    title: 'New Chat',
                    drawerIcon: ({ color }) => <Feather name="message-square" size={20} color={color} />
                }}
            />
            <Drawer.Screen
                name="News"
                component={NewsScreen}
                options={{
                    title: 'News',
                    drawerIcon: ({ color }) => <Feather name="trending-up" size={20} color={color} />
                }}
            />
            <Drawer.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    title: 'History',
                    drawerIcon: ({ color }) => <Feather name="clock" size={20} color={color} />
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    title: 'Settings',
                    drawerIcon: ({ color }) => <Feather name="settings" size={20} color={color} />
                }}
            />
        </Drawer.Navigator>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Main" component={DrawerNavigator} />
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Inter_400Regular,
                Inter_500Medium,
                Inter_600SemiBold,
                Inter_700Bold,
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.dark.background, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={Colors.dark.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer theme={DarkTheme}>
            <StatusBar style="light" />
            <RootNavigator />
        </NavigationContainer>
    );
}
