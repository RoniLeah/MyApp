import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';
import { useUsageTracker } from './UsageTracker';

interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  tempo: number;
  genre: string;
  duration: string;
}

interface LeadSheet {
  id: string;
  songId: string;
  chordProgression: string;
  lyrics: string;
  structure: string;
  createdAt: string;
}

export default function LeadSheetGenerator() {
  const [songs, setSongs] = useState<Song[]>([
    { id: '1', title: 'Midnight Dreams', artist: 'AI Studio', key: 'Am', tempo: 120, genre: 'Pop', duration: '3:45' },
    { id: '2', title: 'Electric Nights', artist: 'AI Studio', key: 'Em', tempo: 128, genre: 'Electronic', duration: '4:12' },
    { id: '3', title: 'Summer Breeze', artist: 'AI Studio', key: 'G', tempo: 95, genre: 'Acoustic', duration: '3:28' }
  ]);
  
  const [leadSheets, setLeadSheets] = useState<LeadSheet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { usage } = useUsageTracker();

  const canAccessLeadSheets = () => {
    return usage.subscriptionTier === 'enterprise' || usage.subscriptionTier === 'pro' || usage.subscriptionTier === 'pro-elite';
  };

  const generateLeadSheet = async (song: Song) => {
    if (!canAccessLeadSheets()) {
      Alert.alert('Upgrade Required', 'Lead Sheet generation is available for Enterprise and Pro subscribers only.');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('karaoke-generator', {
        body: { 
          action: 'generateLeadSheet',
          songData: song
        }
      });

      if (error) throw error;

      const newLeadSheet: LeadSheet = {
        id: Date.now().toString(),
        songId: song.id,
        chordProgression: data.chordProgression || 'Am - F - C - G',
        lyrics: data.lyrics || 'Generated lyrics will appear here...',
        structure: data.structure || 'Verse - Chorus - Verse - Chorus - Bridge - Chorus',
        createdAt: new Date().toISOString()
      };

      setLeadSheets(prev => [...prev, newLeadSheet]);
      Alert.alert('Success', 'Lead sheet generated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to generate lead sheet');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!canAccessLeadSheets()) {
    return (
      <View style={styles.upgradeContainer}>
        <Text style={styles.upgradeTitle}>🎼 Studio Lead Sheets</Text>
        <Text style={styles.upgradeText}>Generate professional lead sheets for live performances</Text>
        <Text style={styles.upgradeSubtext}>Available for Enterprise & Pro subscribers</Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎼 Lead Sheet Generator</Text>
      <Text style={styles.subtitle}>Convert your AI songs into studio-ready printable lead sheets</Text>

      <View style={styles.songsSection}>
        <Text style={styles.sectionTitle}>Your Songs</Text>
        {songs.map(song => (
          <View key={song.id} style={styles.songCard}>
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songDetails}>{song.key} • {song.tempo} BPM • {song.duration}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.generateButton, isGenerating && styles.disabledButton]}
              onPress={() => generateLeadSheet(song)}
              disabled={isGenerating}
            >
              <Text style={styles.generateButtonText}>
                {isGenerating ? 'Generating...' : 'Generate'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {leadSheets.length > 0 && (
        <View style={styles.leadSheetsSection}>
          <Text style={styles.sectionTitle}>Generated Lead Sheets</Text>
          {leadSheets.map(sheet => (
            <View key={sheet.id} style={styles.leadSheetCard}>
              <Text style={styles.leadSheetTitle}>Lead Sheet #{sheet.id}</Text>
              <Text style={styles.leadSheetInfo}>Song ID: {sheet.songId}</Text>
              <Text style={styles.leadSheetContent}>Structure: {sheet.structure}</Text>
              <TouchableOpacity style={styles.printButton}>
                <Text style={styles.printButtonText}>📄 Print Lead Sheet</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f23', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#9ca3af', marginBottom: 24 },
  upgradeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f0f23', padding: 32 },
  upgradeTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 16, textAlign: 'center' },
  upgradeText: { fontSize: 18, color: '#9ca3af', marginBottom: 8, textAlign: 'center' },
  upgradeSubtext: { fontSize: 14, color: '#6b7280', marginBottom: 24, textAlign: 'center' },
  upgradeButton: { backgroundColor: '#8b5cf6', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  upgradeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  songsSection: { marginBottom: 32 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  songCard: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  songInfo: { flex: 1 },
  songTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  songDetails: { fontSize: 14, color: '#9ca3af' },
  generateButton: { backgroundColor: '#10b981', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  disabledButton: { backgroundColor: '#6b7280' },
  generateButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  leadSheetsSection: { marginBottom: 32 },
  leadSheetCard: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 16, marginBottom: 12 },
  leadSheetTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  leadSheetInfo: { fontSize: 14, color: '#9ca3af', marginBottom: 8 },
  leadSheetContent: { fontSize: 14, color: '#e5e7eb', marginBottom: 12 },
  printButton: { backgroundColor: '#8b5cf6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6, alignSelf: 'flex-start' },
  printButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' }
});