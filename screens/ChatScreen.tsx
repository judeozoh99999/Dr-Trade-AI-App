import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
};

type Mode = 'learning' | 'trading';

export default function ChatScreen() {
    const [mode, setMode] = useState<Mode>('learning');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I am Dr Trade. Ask me about market trends, technical indicators, or trading strategies.',
            sender: 'ai',
            timestamp: new Date(),
        }
    ]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();

    const handleSend = () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');

        // Scroll to bottom
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Mock AI Response
        setTimeout(() => {
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: generateMockResponse(userMsg.text),
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, aiMsg]);
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 1500);
    };

    const generateMockResponse = (text: string) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('bitcoin') || lowerText.includes('btc')) {
            return "Bitcoin is currently testing key resistance levels. Order flow suggests some selling pressure, but the long-term trend remains Bullish. Watch for a breakout above $68k.";
        }
        if (lowerText.includes('bearish') || lowerText.includes('sell')) {
            return "Market sentiment is leaning Bearish on shorter timeframes due to recent macroeconomic data. A short setup might be valid if price breaks below support.";
        }
        if (lowerText.includes('strategy') || lowerText.includes('scalp')) {
            return "For scalping today, consider using the 5-minute timeframe with the 200 EMA to determine trend direction. Look for pullbacks to the VWAP for low-risk entries.";
        }

        // Default response
        return "That's an interesting market question. Looking at the current charts (Mock Data), volatility is increasing. Please ensure you manage your risk carefully.";
    };

    const renderItem = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[
                styles.messageBubble,
                isUser ? styles.userBubble : styles.aiBubble
            ]}>
                <Text style={[
                    styles.messageText,
                    isUser ? styles.userText : styles.aiText
                ]}>{item.text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { paddingBottom: insets.bottom }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={styles.modeToggleContainer}>
                <TouchableOpacity
                    style={[styles.modeButton, mode === 'learning' && styles.modeButtonActive]}
                    onPress={() => setMode('learning')}
                >
                    <Text style={[styles.modeText, mode === 'learning' && styles.modeTextActive]}>Learning</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modeButton, mode === 'trading' && styles.modeButtonActive]}
                    onPress={() => setMode('trading')}
                >
                    <Text style={[styles.modeText, mode === 'trading' && styles.modeTextActive]}>Trading</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask Dr Trade..."
                    placeholderTextColor={Colors.dark.textSecondary}
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Feather name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    listContent: {
        padding: 16,
        paddingBottom: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.dark.primary,
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.dark.surface,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        lineHeight: 22,
    },
    userText: {
        color: 'white',
    },
    aiText: {
        color: Colors.dark.text,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: Colors.dark.surface,
        alignItems: 'center',
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: Colors.dark.text,
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: Colors.dark.primary,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modeToggleContainer: {
        flexDirection: 'row',
        margin: 16,
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        padding: 4,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    modeButtonActive: {
        backgroundColor: Colors.dark.background, // or a lighter highlight
    },
    modeText: {
        color: Colors.dark.textSecondary,
        fontFamily: 'Inter_500Medium',
    },
    modeTextActive: {
        color: Colors.dark.text,
        fontFamily: 'Inter_600SemiBold',
    },
});
