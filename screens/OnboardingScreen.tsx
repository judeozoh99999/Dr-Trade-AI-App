import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
    const navigation = useNavigation<any>();

    const handleNext = () => {
        // Navigate to Main Drawer
        navigation.replace('Main');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle} />
                </View>

                <Text style={styles.title}>Welcome to{'\n'}Dr Trade</Text>
                <Text style={styles.subtitle}>Ask anything, get your answer</Text>

                <View style={styles.examplesContainer}>
                    <View style={styles.exampleCard}>
                        <Text style={styles.exampleText}>"Analyze the current market trend for Bitcoin—bullish or bearish"</Text>
                    </View>
                    <View style={styles.exampleCard}>
                        <Text style={styles.exampleText}>"What's the best entry and exit strategy for day trading stocks today?"</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 80,
        justifyContent: 'space-between'
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        marginBottom: 30,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 4,
        borderColor: 'white',
        // In design it's a circle-in-circle logo
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter_700Bold',
        color: Colors.dark.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        color: Colors.dark.textSecondary,
        marginBottom: 40,
    },
    examplesContainer: {
        width: '100%',
        gap: 15,
    },
    exampleCard: {
        backgroundColor: Colors.dark.surface,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    exampleText: {
        color: Colors.dark.text,
        fontSize: 14,
        fontFamily: 'Inter_400Regular',
    },
    button: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    }
});
