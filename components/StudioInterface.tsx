import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import KaraokeStudio from './KaraokeStudio';
import MixingBoard from './MixingBoard';
import VoiceLibrary from './VoiceLibrary';
import ExportHub from './ExportHub';
import LyricGenerator from './LyricGenerator';
import BacktrackGenerator from './BacktrackGenerator';

export default function StudioInterface() {
  const [activeModal, setActiveModal] = useState(null);
  const [userTier, setUserTier] = useState('elite'); // Simulated user tier
  
  const closeModal = () => setActiveModal(null);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>StudioForgeAI Studio</Text>
        <Text style={styles.subtitle}>Professional music creation tools</Text>
        <View style={styles.tierBadge}>
          <Text style={styles.tierText}>{userTier.toUpperCase()} PLAN</Text>
        </View>
      </View>

      <View style={styles.toolsGrid}>
        <TouchableOpacity 
          style={styles.toolCard}
          onPress={() => setActiveModal('karaoke')}
        >
          <Text style={styles.toolIcon}>🎤</Text>
          <Text style={styles.toolTitle}>Karaoke Studio</Text>
          <Text style={styles.toolDescription}>Create karaoke tracks with AI</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toolCard}
          onPress={() => setActiveModal('lyrics')}
        >
          <Text style={styles.toolIcon}>✍️</Text>
          <Text style={styles.toolTitle}>Lyric Generator</Text>
          <Text style={styles.toolDescription}>
            {userTier === 'free' ? 'Basic lyrics (1/session)' : 
             userTier === 'pro' ? 'Advanced lyrics + options' : 
             'Elite lyrics + multilingual'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.toolCard}
          onPress={() => setActiveModal('backtrack')}
        >
          <Text style={styles.toolIcon}>🎵</Text>
          <Text style={styles.toolTitle}>Backtrack Generator</Text>
          <Text style={styles.toolDescription}>
            {userTier === 'free' ? 'Basic backtracks (2/session)' : 
             userTier === 'pro' ? 'Pro backtracks (20/session)' : 
             'Elite backtracks (unlimited)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Karaoke Studio Modal */}
      <Modal
        visible={activeModal === 'karaoke'}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <KaraokeStudio />
        </View>
      </Modal>
      {/* Lyric Generator */}
      <LyricGenerator 
        userTier={userTier} 
        onClose={closeModal}
        visible={activeModal === 'lyrics'}
      />

      {/* Backtrack Generator */}
      <BacktrackGenerator 
        userTier={userTier} 
        onClose={closeModal}
        visible={activeModal === 'backtrack'}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    marginBottom: 16,
  },
  tierBadge: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tierText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  toolsGrid: {
    padding: 20,
    gap: 16,
  },
  toolCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  toolIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  toolDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});