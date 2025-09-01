import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StudioInterface } from '../components/StudioInterface';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { PricingSection } from '../components/PricingSection';
import { AuthProvider } from '../components/AuthProvider';

export default function Home() {
  const [showStudio, setShowStudio] = useState(false);

  if (showStudio) {
    return (
      <AuthProvider>
        <StudioInterface />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ScrollView style={styles.container}>
        <HeroSection onGetStarted={() => setShowStudio(true)} />
        <FeatureGrid />
        <PricingSection />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 StudioForgeAI. All rights reserved.</Text>
        </View>
      </ScrollView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  footer: {
    padding: 40,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },
});