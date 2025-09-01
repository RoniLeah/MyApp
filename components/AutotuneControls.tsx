import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function AutotuneControls() {
  const [autotuneEnabled, setAutotuneEnabled] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [key, setKey] = useState('C');

  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const intensityLevels = [25, 50, 75, 100];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AutoTune Assistant</Text>
      <Text style={styles.subtitle}>Perfect pitch correction for beginners</Text>
      
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.toggleButton, autotuneEnabled && styles.activeButton]}
          onPress={() => setAutotuneEnabled(!autotuneEnabled)}
        >
          <Text style={[styles.buttonText, autotuneEnabled && styles.activeText]}>
            {autotuneEnabled ? 'ON' : 'OFF'}
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.label}>Key</Text>
          <View style={styles.keyRow}>
            {keys.slice(0, 6).map((k) => (
              <TouchableOpacity
                key={k}
                style={[styles.keyButton, key === k && styles.selectedKey]}
                onPress={() => setKey(k)}
              >
                <Text style={[styles.keyText, key === k && styles.selectedKeyText]}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.keyRow}>
            {keys.slice(6).map((k) => (
              <TouchableOpacity
                key={k}
                style={[styles.keyButton, key === k && styles.selectedKey]}
                onPress={() => setKey(k)}
              >
                <Text style={[styles.keyText, key === k && styles.selectedKeyText]}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Intensity</Text>
          <View style={styles.intensityRow}>
            {intensityLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.intensityButton, intensity === level && styles.selectedIntensity]}
                onPress={() => setIntensity(level)}
              >
                <Text style={[styles.intensityText, intensity === level && styles.selectedIntensityText]}>
                  {level}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 20,
  },
  controls: {
    gap: 20,
  },
  toggleButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  activeText: {
    color: '#ffffff',
  },
  section: {
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  keyRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  keyButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  selectedKey: {
    backgroundColor: '#8b5cf6',
  },
  keyText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  selectedKeyText: {
    color: '#ffffff',
  },
  intensityRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  intensityButton: {
    backgroundColor: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  selectedIntensity: {
    backgroundColor: '#8b5cf6',
  },
  intensityText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  selectedIntensityText: {
    color: '#ffffff',
  },
});