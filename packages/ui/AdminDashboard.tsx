import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

interface Prompt {
    key: string;
    content: string;
}

export function AdminDashboard() {
    const [prompts, setPrompts] = useState<Prompt[]>([
        { key: 'TOPIC_SELECTION', content: '...' },
        { key: 'GENERATE_BODY', content: '...' },
        { key: 'EXTRACT_KEYWORDS', content: '...' },
    ]);

    const handleSave = (key: string, newContent: string) => {
        setPrompts(prev => prev.map(p => p.key === key ? { ...p, content: newContent } : p));
        console.log(`Saved prompt for ${key}`);
        // TODO: Call API to update DB/File
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Admin Dashboard - 프롬프트 관리</Text>

            {prompts.map(prompt => (
                <View key={prompt.key} style={styles.card}>
                    <Text style={styles.label}>{prompt.key}</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        value={prompt.content}
                        onChangeText={(text) => handleSave(prompt.key, text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => alert(`${prompt.key} 저장됨!`)}>
                        <Text style={styles.buttonText}>저장하기</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#1a1a1a',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        minHeight: 120,
        textAlignVertical: 'top',
        backgroundColor: '#fafafa',
    },
    button: {
        marginTop: 15,
        backgroundColor: '#0070f3',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
