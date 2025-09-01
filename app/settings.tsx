import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import OfflineManager from '../components/OfflineManager';

export default function Settings() {
  const router = useRouter();

  const settingsOptions = [
    { title: 'App Diagnostics', screen: 'AppDiagnostics', icon: '🔧' },
    { title: 'Critical Issues', screen: 'CriticalIssueResolver', icon: '⚠️' },
    { title: 'Performance Monitor', screen: 'PerformanceOptimizer', icon: '📊' },
    { title: 'Usage Analytics', screen: 'UsageTracker', icon: '📈' },
    { title: 'App Store Optimization', screen: 'AppStoreOptimizer', icon: '🏪' },
    { title: 'Privacy Policy', screen: 'PrivacyPolicy', icon: '🔒' },
    { title: 'Terms & Conditions', screen: 'TermsConditions', icon: '📄' },
    { title: 'Support', screen: 'support', icon: '💬' }
  ];

  return (
    <View style={styles.container}>
      <OfflineManager />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.optionsContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.title}
              style={styles.optionItem}
              onPress={() => {
                if (option.screen === 'support') {
                  router.push('/support');
                } else {
                  // For component navigation, we'll handle this differently
                  console.log(`Navigate to ${option.screen}`);
                }
              }}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#1f2937' },
  optionsContainer: { gap: 2 },
  optionItem: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  optionIcon: { fontSize: 24, marginRight: 15 },
  optionTitle: { flex: 1, fontSize: 16, fontWeight: '500', color: '#1f2937' },
  chevron: { fontSize: 20, color: '#9ca3af' }
});
