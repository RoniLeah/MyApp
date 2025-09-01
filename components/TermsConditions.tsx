import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const TermsConditions: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
      
      <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
      <Text style={styles.text}>
        By accessing and using SoundForge AI, you accept and agree to be bound by the terms 
        and provision of this agreement.
      </Text>
      
      <Text style={styles.sectionTitle}>Use License</Text>
      <Text style={styles.text}>
        Permission is granted to temporarily use SoundForge AI for personal, non-commercial 
        transitory viewing only. This is the grant of a license, not a transfer of title.
      </Text>
      
      <Text style={styles.sectionTitle}>User Account</Text>
      <Text style={styles.text}>
        You are responsible for safeguarding the password and for all activities that occur 
        under your account. You agree not to share your account credentials.
      </Text>
      
      <Text style={styles.sectionTitle}>Prohibited Uses</Text>
      <Text style={styles.text}>
        You may not use our service for any illegal or unauthorized purpose nor may you, 
        in the use of the service, violate any laws in your jurisdiction.
      </Text>
      
      <Text style={styles.sectionTitle}>Limitation of Liability</Text>
      <Text style={styles.text}>
        In no event shall SoundForge AI be liable for any damages arising out of the use 
        or inability to use the materials on our platform.
      </Text>
      
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.text}>
        If you have any questions about these Terms & Conditions, please contact us at 
        legal@soundforge.ai
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