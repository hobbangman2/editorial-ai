import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';

interface Props {
    content: string;
    title: string;
}

export function DictationWorkspace({ title, content }: Props) {
    const [inputText, setInputText] = useState('');
    const [isDone, setIsDone] = useState(false);

    // Simple accuracy check
    const checkProgress = (text: string) => {
        setInputText(text);
        if (text.trim() === content.trim()) {
            setIsDone(true);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.originalContainer}>
                <Text style={styles.originalText}>{content}</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder="여기에 받아쓰기를 시작하세요..."
                    style={[styles.input, isDone && styles.inputDone]}
                    value={inputText}
                    onChangeText={checkProgress}
                    autoFocus
                />
                {isDone && (
                    <Text style={styles.successText}>✨ 완벽합니다! 모두 받아적었습니다. ✨</Text>
                )}
            </View>

            {/* Placeholder for Pencil Support on Native */}
            {Platform.OS !== 'web' && (
                <View style={styles.pencilOverlay}>
                    <Text style={styles.pencilHint}>[펜슬 모드 활성화됨 - 필기 인식이 준비 중입니다]</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        padding: 20,
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    originalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 20,
    },
    originalText: {
        fontSize: 18,
        lineHeight: 28,
        color: '#444',
    },
    inputContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        fontSize: 18,
        lineHeight: 28,
        minHeight: 200,
        textAlignVertical: 'top',
    },
    inputDone: {
        color: '#2e7d32',
        fontWeight: 'bold',
    },
    successText: {
        marginTop: 15,
        color: '#2e7d32',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    pencilOverlay: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
        alignItems: 'center',
    },
    pencilHint: {
        color: '#1976d2',
        fontSize: 14,
    }
});
