import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

interface ExportHubProps {
  userTier?: string;
}

export default function ExportHub({ userTier = 'free' }: ExportHubProps) {
  const [selectedFormat, setSelectedFormat] = useState('mp3');
  const [exportType, setExportType] = useState('mixdown');

  const formats = [
    { id: 'mp3', name: 'MP3', quality: '320kbps', size: '8MB', tier: 'free' },
    { id: 'wav', name: 'WAV', quality: '24-bit', size: '45MB', tier: 'pro' },
    { id: 'flac', name: 'FLAC', quality: 'Lossless', size: '32MB', tier: 'pro' },
    { id: 'stems', name: 'Stems', quality: 'WAV 24-bit', size: '180MB', tier: 'elite' },
    { id: 'mastered', name: 'AI Mastered', quality: '24-bit WAV', size: '48MB', tier: 'elite' },
    { id: 'vinyl', name: 'Vinyl Ready', quality: 'Optimized', size: '52MB', tier: 'elite' },
  ];

  const eliteFeatures = [
    { id: 'batch', name: '📦 Batch Export', desc: 'Export multiple versions at once' },
    { id: 'cloud', name: '☁️ Cloud Storage', desc: 'Auto-sync to Dropbox, Google Drive' },
    { id: 'streaming', name: '🎵 Direct Upload', desc: 'Upload to Spotify, Apple Music' },
    { id: 'metadata', name: '🏷️ Smart Metadata', desc: 'Auto-tag with AI-generated info' },
    { id: 'mastering', name: '✨ AI Mastering', desc: 'Professional mastering chain' },
    { id: 'distribution', name: '🌍 Global Distribution', desc: 'Release to 150+ platforms' },
  ];

  const versions = [
    { id: 1, name: 'Final Mix v3', date: '2024-01-15', duration: '3:42' },
    { id: 2, name: 'Instrumental', date: '2024-01-15', duration: '3:42' },
    { id: 3, name: 'Acapella', date: '2024-01-14', duration: '3:38' },
    { id: 4, name: 'Demo Mix v1', date: '2024-01-12', duration: '3:45' },
  ];

  const canUseFormat = (format: any) => {
    if (format.tier === 'free') return true;
    if (format.tier === 'pro' && (userTier === 'pro' || userTier === 'elite')) return true;
    if (format.tier === 'elite' && userTier === 'elite') return true;
    return false;
  };

  return (
    <View style={styles.hub}>
      <Text style={styles.title}>Export & Share</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Export Format</Text>
        <View style={styles.formatGrid}>
          {formats.map((format) => (
            <TouchableOpacity 
              key={format.id}
              style={[
                styles.formatCard, 
                selectedFormat === format.id && styles.selectedFormat,
                !canUseFormat(format) && styles.lockedFormat
              ]}
              onPress={() => canUseFormat(format) && setSelectedFormat(format.id)}
            >
              <Text style={styles.formatName}>{format.name}</Text>
              <Text style={styles.formatQuality}>{format.quality}</Text>
              <Text style={styles.formatSize}>{format.size}</Text>
              {!canUseFormat(format) && <Text style={styles.lockIcon}>🔒</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {userTier === 'elite' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Elite Features</Text>
          <View style={styles.featureGrid}>
            {eliteFeatures.map((feature) => (
              <TouchableOpacity key={feature.id} style={styles.featureCard}>
                <Text style={styles.featureName}>{feature.name}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Song Versions</Text>
        <ScrollView style={styles.versionList}>
          {versions.map((version) => (
            <View key={version.id} style={styles.versionCard}>
              <View style={styles.versionInfo}>
                <Text style={styles.versionName}>{version.name}</Text>
                <Text style={styles.versionMeta}>{version.date} • {version.duration}</Text>
              </View>
              <View style={styles.versionActions}>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playText}>▶️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Text style={styles.downloadText}>⬇️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.exportActions}>
        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportText}>Export Current Version</Text>
        </TouchableOpacity>
        <View style={styles.shareButtons}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>📱 Share Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>🎵 Upload to Platforms</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hub: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: 16,
  },
  formatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  formatCard: {
    width: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  selectedFormat: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  lockedFormat: {
    opacity: 0.5,
  },
  formatName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  formatQuality: {
    color: '#6366f1',
    fontSize: 12,
    marginBottom: 2,
  },
  formatSize: {
    color: '#9ca3af',
    fontSize: 11,
  },
  lockIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 12,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a855f7',
  },
  featureName: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featureDesc: {
    color: '#9ca3af',
    fontSize: 12,
  },
  versionList: {
    maxHeight: 200,
  },
  versionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  versionInfo: {
    flex: 1,
  },
  versionName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  versionMeta: {
    color: '#9ca3af',
    fontSize: 12,
  },
  versionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    backgroundColor: '#22c55e',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    fontSize: 14,
  },
  downloadButton: {
    backgroundColor: '#6366f1',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadText: {
    fontSize: 14,
  },
  exportActions: {
    gap: 16,
  },
  exportButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  exportText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  shareButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});