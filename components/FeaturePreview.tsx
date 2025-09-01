import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface FeaturePreviewProps {
  visible: boolean;
  feature: string;
  onClose: () => void;
}

export const FeaturePreview = ({ visible, feature, onClose }: FeaturePreviewProps) => {
  const getFeatureContent = () => {
    switch (feature) {
      case 'AI Voice Cloning':
        return {
          title: 'AI Voice Cloning Studio',
          description: 'Create realistic voice clones with advanced AI technology',
          features: ['Upload voice samples', 'Train custom models', 'Generate speech', 'Voice effects']
        };
      case 'Music Generation':
        return {
          title: 'AI Music Generator',
          description: 'Generate original music tracks in any style',
          features: ['Style selection', 'Tempo control', 'Instrument mixing', 'Export options']
        };
      case 'Mixing Studio':
        return {
          title: 'Professional Mixing Suite',
          description: 'Mix and master your tracks like a pro',
          features: ['Multi-track editor', 'EQ & effects', 'Mastering tools', 'Real-time preview']
        };
      case 'Collaboration':
        return {
          title: 'Team Collaboration Hub',
          description: 'Work together on music projects in real-time',
          features: ['Real-time editing', 'Version control', 'Comments & feedback', 'Project sharing']
        };
      default:
        return { title: feature, description: 'Feature preview', features: [] };
    }
  };

  const content = getFeatureContent();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          
          <ScrollView>
            <Text style={styles.modalTitle}>{content.title}</Text>
            <Text style={styles.modalDesc}>{content.description}</Text>
            
            <View style={styles.featureList}>
              {content.features.map((item, i) => (
                <View key={i} style={styles.featureItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.tryBtn}>
              <Text style={styles.tryText}>Try This Feature</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modal: { backgroundColor: '#1a1a2e', borderRadius: 16, padding: 24, maxHeight: '80%' },
  closeBtn: { position: 'absolute', top: 16, right: 20, zIndex: 1 },
  closeText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  modalDesc: { color: '#ccc', fontSize: 16, marginBottom: 20 },
  featureList: { marginBottom: 24 },
  featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { color: '#6366f1', fontSize: 18, marginRight: 12 },
  featureText: { color: '#fff', fontSize: 16 },
  tryBtn: { backgroundColor: '#6366f1', padding: 16, borderRadius: 8, alignItems: 'center' },
  tryText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});