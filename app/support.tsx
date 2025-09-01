import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SupportScreen = () => {
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@studioforgeai.com?subject=StudioForgeAI Support');
  };

  const handleChatSupport = () => {
    Linking.openURL('https://studioforgeai.com/chat-support');
  };

  const handleFAQ = () => {
    Linking.openURL('https://studioforgeai.com/faq');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Support & Help</Text>
        <Text style={styles.subtitle}>We're here to help you create amazing music</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        
        <TouchableOpacity style={styles.supportOption} onPress={handleEmailSupport}>
          <Ionicons name="mail" size={24} color="#007AFF" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Email Support</Text>
            <Text style={styles.optionDesc}>Get help via email within 24 hours</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportOption} onPress={handleChatSupport}>
          <Ionicons name="chatbubbles" size={24} color="#007AFF" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Live Chat</Text>
            <Text style={styles.optionDesc}>Chat with our support team</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.supportOption} onPress={handleFAQ}>
          <Ionicons name="help-circle" size={24} color="#007AFF" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>FAQ</Text>
            <Text style={styles.optionDesc}>Find answers to common questions</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.helpGrid}>
          <View style={styles.helpCard}>
            <Ionicons name="musical-notes" size={32} color="#007AFF" />
            <Text style={styles.helpTitle}>Getting Started</Text>
            <Text style={styles.helpDesc}>Learn the basics of music creation</Text>
          </View>
          
          <View style={styles.helpCard}>
            <Ionicons name="settings" size={32} color="#007AFF" />
            <Text style={styles.helpTitle}>Audio Settings</Text>
            <Text style={styles.helpDesc}>Optimize your audio quality</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  section: { backgroundColor: '#fff', marginTop: 20, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  supportOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  optionText: { flex: 1, marginLeft: 15 },
  optionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  optionDesc: { fontSize: 14, color: '#666', marginTop: 2 },
  helpGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  helpCard: { flex: 1, backgroundColor: '#f8f9fa', padding: 15, borderRadius: 10, marginHorizontal: 5, alignItems: 'center' },
  helpTitle: { fontSize: 16, fontWeight: '600', marginTop: 10, color: '#333' },
  helpDesc: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 5 }
});

export default SupportScreen;