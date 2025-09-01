import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import { useUsageTracker } from './UsageTracker';

export default function VoiceLibrary() {
  const [selectedVoice, setSelectedVoice] = useState(0);
  const { canCreateVoice, incrementVoiceUsage, usage, getUsageLimits } = useUsageTracker();
  
  const voices = [
    { name: 'Aria', type: 'Female Pop', genre: 'Pop/R&B', preview: '🎵' },
    { name: 'Marcus', type: 'Male Rock', genre: 'Rock/Alternative', preview: '🎸' },
    { name: 'Luna', type: 'Female Jazz', genre: 'Jazz/Soul', preview: '🎷' },
    { name: 'Phoenix', type: 'Male Hip-Hop', genre: 'Hip-Hop/Rap', preview: '🎤' },
    { name: 'Echo', type: 'Electronic', genre: 'EDM/Synth', preview: '🎹' },
    { name: 'Nova', type: 'Female Country', genre: 'Country/Folk', preview: '🪕' },
  ];

  const voiceImages = [
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125642278_bb29c07a.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125644216_74a718e5.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125645998_8e314e67.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125647836_409bd778.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125649960_9a30975d.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125652128_34cb3271.webp',
  ];
  const handleCreateVoice = async () => {
    if (!canCreateVoice()) {
      const limits = getUsageLimits();
      Alert.alert(
        'Voice Creation Limit Reached',
        `You've reached your voice creation limit (${limits.voices} voices). Upgrade your subscription to create more AI voices.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    await incrementVoiceUsage();
    Alert.alert('Success', 'AI Voice creation started! This may take a few minutes to complete.');
  };

  return (
    <View style={styles.library}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Library</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateVoice}>
          <Text style={styles.createText}>+ Create AI Twin</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.usageInfo}>
        <Text style={styles.usageText}>
          AI Voices: {usage.voicesCreated}/{getUsageLimits().isUnlimited ? '∞' : getUsageLimits().voices}
        </Text>
      </View>

      <View style={styles.aiTwin}>
        <Image 
          source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125634408_00d0890f.webp' }}
          style={styles.microphoneImage}
        />
        <View style={styles.twinInfo}>
          <Text style={styles.twinTitle}>Your AI Voice Twin</Text>
          <Text style={styles.twinStatus}>Training Progress: 85%</Text>
          <TouchableOpacity style={styles.recordButton}>
            <Text style={styles.recordText}>Record More Samples</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Royalty-Free Voices</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voiceGrid}>
        {voices.map((voice, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.voiceCard, selectedVoice === index && styles.selectedCard]}
            onPress={() => setSelectedVoice(index)}
          >
            <Image 
              source={{ uri: voiceImages[index] }}
              style={styles.voiceImage}
            />
            <Text style={styles.voiceName}>{voice.name}</Text>
            <Text style={styles.voiceType}>{voice.type}</Text>
            <Text style={styles.voiceGenre}>{voice.genre}</Text>
            <View style={styles.voiceControls}>
              <TouchableOpacity style={styles.previewButton}>
                <Text style={styles.previewText}>▶️ Preview</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addText}>Add to Track</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  library: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  createButton: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  createText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  usageInfo: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  usageText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  aiTwin: {
    flexDirection: 'row',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  microphoneImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  twinInfo: {
    flex: 1,
  },
  twinTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  twinStatus: {
    fontSize: 14,
    color: '#a855f7',
    marginBottom: 12,
  },
  recordButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  recordText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: 16,
  },
  voiceGrid: {
    flexDirection: 'row',
  },
  voiceCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    width: 200,
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  voiceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  voiceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  voiceType: {
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 2,
  },
  voiceGenre: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 16,
  },
  voiceControls: {
    gap: 8,
    width: '100%',
  },
  previewButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  previewText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  addText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});