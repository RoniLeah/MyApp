import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
      
      <Text style={styles.sectionTitle}>Information We Collect</Text>
      <Text style={styles.text}>
        We collect information you provide directly to us, such as when you create an account, 
        use our services, or contact us for support.
      </Text>
      
      <Text style={styles.sectionTitle}>How We Use Your Information</Text>
      <Text style={styles.text}>
        We use the information we collect to provide, maintain, and improve our services, 
        process transactions, and communicate with you.
      </Text>
      
      <Text style={styles.sectionTitle}>Information Sharing</Text>
      <Text style={styles.text}>
        We do not sell, trade, or otherwise transfer your personal information to third parties 
        without your consent, except as described in this policy.
      </Text>
      
      <Text style={styles.sectionTitle}>Data Security</Text>
      <Text style={styles.text}>
        We implement appropriate security measures to protect your personal information against 
        unauthorized access, alteration, disclosure, or destruction.
      </Text>
      
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions about this Privacy Policy, please contact us at 
        privacy@soundforge.ai
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#cccccc',
    lineHeight: 24,
    marginBottom: 15,
  },
});