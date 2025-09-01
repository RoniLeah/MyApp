import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const StoreAssets = () => {
  const appIcon = 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475386728_6c9935df.webp';
  
  const screenshots = [
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475389852_3ae7bedc.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475391604_a9ae3861.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756475393679_0e5614cf.webp'
  ];

  const storeData = {
    appName: 'SoundForge AI',
    shortDescription: 'AI-Powered Music Production Studio',
    longDescription: 'Create professional music with AI assistance. Generate melodies, lyrics, and beats. Advanced mixing tools, real-time collaboration, and export in high quality.',
    keywords: 'music, AI, production, studio, mixing, beats, lyrics, collaboration',
    category: 'Music',
    contentRating: '4+',
    version: '1.0.0',
    whatsNew: 'Initial release with AI music generation, professional mixing tools, and collaboration features.'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>App Store Assets</Text>
        
        <View style={styles.iconSection}>
          <Text style={styles.sectionTitle}>App Icon</Text>
          <Image source={{ uri: appIcon }} style={styles.appIcon} />
        </View>

        <View style={styles.screenshotSection}>
          <Text style={styles.sectionTitle}>Screenshots</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {screenshots.map((screenshot, index) => (
              <Image key={index} source={{ uri: screenshot }} style={styles.screenshot} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.metadataSection}>
          <Text style={styles.sectionTitle}>Store Metadata</Text>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>App Name:</Text>
            <Text style={styles.metadataValue}>{storeData.appName}</Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Short Description:</Text>
            <Text style={styles.metadataValue}>{storeData.shortDescription}</Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Keywords:</Text>
            <Text style={styles.metadataValue}>{storeData.keywords}</Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Category:</Text>
            <Text style={styles.metadataValue}>{storeData.category}</Text>
          </View>
          
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Content Rating:</Text>
            <Text style={styles.metadataValue}>{storeData.contentRating}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  section: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 15, color: '#333' },
  iconSection: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 },
  appIcon: { width: 120, height: 120, borderRadius: 20 },
  screenshotSection: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20 },
  screenshot: { width: 200, height: 355, marginRight: 15, borderRadius: 10 },
  metadataSection: { backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  metadataItem: { marginBottom: 15 },
  metadataLabel: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 5 },
  metadataValue: { fontSize: 14, color: '#666', lineHeight: 20 }
});

export default StoreAssets;