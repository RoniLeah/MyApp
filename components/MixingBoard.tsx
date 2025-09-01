import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function MixingBoard() {
  const [channels] = useState([
    { id: 1, name: 'Vocals', volume: 75, pan: 0, solo: false, mute: false },
    { id: 2, name: 'Guitar', volume: 65, pan: -20, solo: false, mute: false },
    { id: 3, name: 'Bass', volume: 70, pan: 0, solo: false, mute: false },
    { id: 4, name: 'Drums', volume: 80, pan: 10, solo: false, mute: false },
    { id: 5, name: 'Keys', volume: 55, pan: 15, solo: false, mute: false },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Professional Mixing Board</Text>
      <Text style={styles.subtitle}>Advanced controls for experienced producers</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelsContainer}>
        {channels.map((channel) => (
          <View key={channel.id} style={styles.channel}>
            <Text style={styles.channelName}>{channel.name}</Text>
            
            <View style={styles.controlSection}>
              <Text style={styles.controlLabel}>GAIN</Text>
              <View style={styles.knob}>
                <View style={[styles.knobIndicator, { transform: [{ rotate: `${channel.volume * 2.7}deg` }] }]} />
              </View>
              <Text style={styles.value}>{channel.volume}</Text>
            </View>

            <View style={styles.controlSection}>
              <Text style={styles.controlLabel}>PAN</Text>
              <View style={styles.knob}>
                <View style={[styles.knobIndicator, { transform: [{ rotate: `${channel.pan + 135}deg` }] }]} />
              </View>
              <Text style={styles.value}>{channel.pan}</Text>
            </View>

            <View style={styles.buttonSection}>
              <TouchableOpacity style={[styles.button, channel.solo && styles.soloActive]}>
                <Text style={[styles.buttonText, channel.solo && styles.activeButtonText]}>SOLO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, channel.mute && styles.muteActive]}>
                <Text style={[styles.buttonText, channel.mute && styles.activeButtonText]}>MUTE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.faderSection}>
              <View style={styles.fader}>
                <View style={[styles.faderHandle, { top: `${100 - channel.volume}%` }]} />
              </View>
              <Text style={styles.faderLabel}>VOL</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.masterSection}>
        <Text style={styles.masterTitle}>Master Output</Text>
        <View style={styles.masterControls}>
          <View style={styles.masterFader}>
            <View style={styles.fader}>
              <View style={[styles.faderHandle, { top: '25%' }]} />
            </View>
            <Text style={styles.faderLabel}>MASTER</Text>
          </View>
          <View style={styles.meters}>
            <View style={styles.meter}>
              <View style={[styles.meterBar, { height: '70%', backgroundColor: '#10b981' }]} />
            </View>
            <View style={styles.meter}>
              <View style={[styles.meterBar, { height: '65%', backgroundColor: '#10b981' }]} />
            </View>
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
  channelsContainer: {
    marginBottom: 20,
  },
  channel: {
    backgroundColor: '#16213e',
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
    width: 120,
    alignItems: 'center',
  },
  channelName: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 12,
  },
  controlSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  controlLabel: {
    color: '#9ca3af',
    fontSize: 10,
    marginBottom: 5,
  },
  knob: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  knobIndicator: {
    width: 2,
    height: 15,
    backgroundColor: '#8b5cf6',
    position: 'absolute',
    top: 5,
  },
  value: {
    color: '#ffffff',
    fontSize: 10,
  },
  buttonSection: {
    gap: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#374151',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  soloActive: {
    backgroundColor: '#f59e0b',
  },
  muteActive: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#9ca3af',
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#ffffff',
  },
  faderSection: {
    alignItems: 'center',
    height: 100,
  },
  fader: {
    width: 20,
    height: 80,
    backgroundColor: '#374151',
    borderRadius: 10,
    position: 'relative',
  },
  faderHandle: {
    width: 18,
    height: 8,
    backgroundColor: '#8b5cf6',
    borderRadius: 4,
    position: 'absolute',
    left: 1,
  },
  faderLabel: {
    color: '#9ca3af',
    fontSize: 8,
    marginTop: 5,
  },
  masterSection: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  masterTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  masterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  masterFader: {
    alignItems: 'center',
  },
  meters: {
    flexDirection: 'row',
    gap: 5,
  },
  meter: {
    width: 8,
    height: 80,
    backgroundColor: '#374151',
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  meterBar: {
    width: '100%',
    borderRadius: 4,
  },
});