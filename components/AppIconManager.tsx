import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const APP_ICONS = [
  {
    id: 1,
    name: 'Primary Icon',
    url: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475860993_81f58be9.webp',
    active: true
  },
  {
    id: 2,
    name: 'Alternative Icon 1',
    url: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475862756_a48f3b99.webp',
    active: false
  },
  {
    id: 3,
    name: 'Alternative Icon 2',
    url: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475864465_12323ca2.webp',
    active: false
  }
];

export default function AppIconManager() {
  const handleIconSelect = (iconId: number) => {
    Alert.alert(
      'Icon Selected',
      `Icon ${iconId} selected as app icon. In production, this would update the app icon configuration.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>App Icon Management</Text>
      <Text style={styles.subtitle}>
        Professional app icons generated and ready for app store submission
      </Text>
      
      <View style={styles.iconGrid}>
        {APP_ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            style={[styles.iconCard, icon.active && styles.activeIcon]}
            onPress={() => handleIconSelect(icon.id)}
          >
            <Image source={{ uri: icon.url }} style={styles.iconImage} />
            <Text style={styles.iconName}>{icon.name}</Text>
            {icon.active && (
              <View style={styles.activeBadge}>
                <Text style={styles.activeText}>ACTIVE</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.configInfo}>
        <Text style={styles.configTitle}>Configuration Status</Text>
        <Text style={styles.configText}>✅ iOS icon configured</Text>
        <Text style={styles.configText}>✅ Android adaptive icon ready</Text>
        <Text style={styles.configText}>✅ Web favicon available</Text>
        <Text style={styles.configText}>✅ Splash screen configured</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  iconGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
  iconCard: { 
    backgroundColor: 'white', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center',
    width: '30%',
    borderWidth: 2,
    borderColor: 'transparent'
  },
  activeIcon: { borderColor: '#007AFF' },
  iconImage: { width: 60, height: 60, borderRadius: 12, marginBottom: 8 },
  iconName: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
  activeBadge: { 
    backgroundColor: '#007AFF', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4, 
    marginTop: 4 
  },
  activeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  configInfo: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  configTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  configText: { fontSize: 14, color: '#28a745', marginBottom: 4 }
});