import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import {NetworkServices} from './src/network/network_services';
import {NetworkException} from './src/network/network_exception';
import {SummarizeRequest, SummarizeResponse} from './src/models/dtos';

export default function App() {
  const aiService = useMemo(() => new NetworkServices(), []);

  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult('');
    const request: SummarizeRequest = {text, language: 'English', provider: 'gemini'};
    try {
      const response : SummarizeResponse = await aiService.summarize(request);

      setResult(response.result);
    } catch (e) {
      if (e instanceof NetworkException) {
        setResult(`API Error: ${e.message}`);
      } else {
        setResult('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>AI Summarize</Text>

          <Text style={styles.subtitle}>
            Tóm tắt ghi chú bằng AI Gateway
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Nhập ghi chú của bạn..."
            multiline
            textAlignVertical="top"
            style={styles.input}
          />

          <Pressable
            style={({pressed}) => [
              styles.button,
              (pressed || loading) && styles.buttonPressed,
            ]}
            onPress={summarize}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Tóm tắt bằng AI</Text>
            )}
          </Pressable>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Kết quả</Text>

            {result.trim().length === 0 ? (
              <Text style={styles.placeholder}>Chưa có kết quả</Text>
            ) : (
              <Text style={styles.resultText}>{result}</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0F172A',
    marginTop: 12,
  },

  subtitle: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 8,
    marginBottom: 24,
  },

  input: {
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#0F172A',
  },

  button: {
    marginTop: 20,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  resultCard: {
    marginTop: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minHeight: 160,
  },

  resultTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },

  placeholder: {
    color: '#94A3B8',
  },

  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0F172A',
  },
});