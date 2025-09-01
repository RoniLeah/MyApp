import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

export default function AIAssistant() {
  const [message, setMessage] = useState('');
  const [lyrics, setLyrics] = useState([
    { id: 1, title: 'Summer Dreams', genre: 'Pop', preview: 'Walking down the street...' },
    { id: 2, title: 'Midnight Blues', genre: 'Blues', preview: 'The city lights are calling...' },
    { id: 3, title: 'Electric Soul', genre: 'Electronic', preview: 'Feel the rhythm in your bones...' },
  ]);

  return (
    <View style={styles.assistant}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125635518_5680d538.webp' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Lyra AI</Text>
          <Text style={styles.status}>Your Creative Partner</Text>
        </View>
      </View>

      <ScrollView style={styles.chat}>
        <View style={styles.message}>
          <Text style={styles.aiMessage}>
            Hi! I'm ready to help you create amazing lyrics. What genre or mood are you going for today?
          </Text>
        </View>
        <View style={styles.suggestions}>
          <TouchableOpacity style={styles.suggestion}>
            <Text style={styles.suggestionText}>🎵 Pop Anthem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestion}>
            <Text style={styles.suggestionText}>💔 Heartbreak Ballad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestion}>
            <Text style={styles.suggestionText}>🔥 Hip-Hop Banger</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.lyricsVault}>
        <Text style={styles.vaultTitle}>Your Lyrics Vault</Text>
        {lyrics.map((lyric) => (
          <TouchableOpacity key={lyric.id} style={styles.lyricCard}>
            <View>
              <Text style={styles.lyricTitle}>{lyric.title}</Text>
              <Text style={styles.lyricGenre}>{lyric.genre}</Text>
              <Text style={styles.lyricPreview}>{lyric.preview}</Text>
            </View>
            <TouchableOpacity style={styles.useButton}>
              <Text style={styles.useText}>Use</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Describe your song idea..."
          placeholderTextColor="#9ca3af"
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  assistant: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    height: 600,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  status: {
    fontSize: 14,
    color: '#a855f7',
  },
  chat: {
    flex: 1,
    marginBottom: 20,
  },
  message: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  aiMessage: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 22,
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  suggestion: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  suggestionText: {
    color: '#6366f1',
    fontSize: 14,
  },
  lyricsVault: {
    marginBottom: 20,
  },
  vaultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: 12,
  },
  lyricCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  lyricTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  lyricGenre: {
    color: '#6366f1',
    fontSize: 12,
    marginTop: 2,
  },
  lyricPreview: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },
  useButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  useText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  sendText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});