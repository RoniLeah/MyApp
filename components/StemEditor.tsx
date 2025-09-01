import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function StemEditor() {
  const [selectedStem, setSelectedStem] = useState(0);
  
  const stems = [
    { name: 'Vocals', level: 85, solo: false, muted: false, color: '#ef4444' },
    { name: 'Drums', level: 70, solo: false, muted: false, color: '#f59e0b' },
    { name: 'Bass', level: 60, solo: false, muted: false, color: '#10b981' },
    { name: 'Guitar', level: 75, solo: false, muted: true, color: '#8b5cf6' },
    { name: 'Synth', level: 50, solo: false, muted: false, color: '#06b6d4' },
    { name: 'Piano', level: 40, solo: false, muted: false, color: '#f97316' },
  ];

  const effects = [
    { name: 'Reverb', value: 30, active: true },
    { name: 'Delay', value: 15, active: false },
    { name: 'Chorus', value: 25, active: true },
    { name: 'Distortion', value: 0, active: false },
    { name: 'EQ', value: 45, active: true },
    { name: 'Compressor', value: 60, active: true },
  ];

  return (
    <View style={styles.editor}>
      <Text style={styles.title}>Stem Editor & Mixer</Text>
      
      <View style={styles.stemControls}>
        <Text style={styles.sectionTitle}>Individual Stems</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {stems.map((stem, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.stemCard, selectedStem === index && styles.selectedStem]}
              onPress={() => setSelectedStem(index)}
            >
              <View style={[styles.stemIndicator, { backgroundColor: stem.color }]} />
              <Text style={styles.stemName}>{stem.name}</Text>
              <View style={styles.levelContainer}>
                <View style={styles.levelBar}>
                  <View 
                    style={[styles.levelFill, { width: `${stem.level}%`, backgroundColor: stem.color }]} 
                  />
                </View>
                <Text style={styles.levelText}>{stem.level}%</Text>
              </View>
              <View style={styles.stemButtons}>
                <TouchableOpacity style={[styles.stemButton, stem.solo && styles.activeButton]}>
                  <Text style={styles.buttonText}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.stemButton, stem.muted && styles.mutedButton]}>
                  <Text style={styles.buttonText}>M</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.effectsPanel}>
        <Text style={styles.sectionTitle}>Effects Chain</Text>
        <View style={styles.effectsGrid}>
          {effects.map((effect, index) => (
            <View key={index} style={[styles.effectCard, effect.active && styles.activeEffect]}>
              <Text style={styles.effectName}>{effect.name}</Text>
              <View style={styles.effectControl}>
                <View style={styles.knob}>
                  <Text style={styles.knobValue}>{effect.value}</Text>
                </View>
                <TouchableOpacity style={[styles.toggleButton, effect.active && styles.toggleActive]}>
                  <Text style={styles.toggleText}>{effect.active ? 'ON' : 'OFF'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.masterControls}>
        <Text style={styles.sectionTitle}>Master Controls</Text>
        <View style={styles.masterPanel}>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportText}>Export Stems</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mixdownButton}>
            <Text style={styles.mixdownText}>Create Mixdown</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveText}>Save Version</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editor: {
    backgroundColor: '#16213e',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: 16,
  },
  stemControls: {
    marginBottom: 32,
  },
  stemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
    width: 120,
    alignItems: 'center',
  },
  selectedStem: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  stemIndicator: {
    width: 20,
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  stemName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  levelContainer: {
    width: '100%',
    marginBottom: 12,
  },
  levelBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 4,
  },
  levelFill: {
    height: '100%',
    borderRadius: 3,
  },
  levelText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
  },
  stemButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  stemButton: {
    backgroundColor: '#374151',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#fbbf24',
  },
  mutedButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  effectsPanel: {
    marginBottom: 32,
  },
  effectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  effectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 12,
    width: '30%',
    alignItems: 'center',
  },
  activeEffect: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  effectName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  effectControl: {
    alignItems: 'center',
    gap: 8,
  },
  knob: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  knobValue: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#6b7280',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  toggleActive: {
    backgroundColor: '#22c55e',
  },
  toggleText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  masterControls: {},
  masterPanel: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  exportText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  mixdownButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mixdownText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});