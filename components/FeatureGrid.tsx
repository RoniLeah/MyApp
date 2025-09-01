import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FeatureGrid() {
  const features = [
    {
      id: 1,
      title: 'AI Voice Creation',
      description: 'Generate unique vocal performances with advanced AI technology',
      icon: '🎤',
      tier: 'Essential',
      color: '#8b5cf6'
    },
    {
      id: 2,
      title: 'Smart Autotune',
      description: 'Perfect pitch correction for novice creators with one-click enhancement',
      icon: '🎵',
      tier: 'Essential',
      color: '#06b6d4'
    },
    {
      id: 3,
      title: 'Professional Mixing',
      description: 'Multi-channel mixing board for experienced producers',
      icon: '🎛️',
      tier: 'Pro Studio',
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Real-time Collaboration',
      description: 'Work together with artists worldwide in real-time',
      icon: '🤝',
      tier: 'Pro Elite',
      color: '#f59e0b'
    },
    {
      id: 5,
      title: 'Social Community',
      description: 'Share, discover, and connect with the global music community',
      icon: '🌐',
      tier: 'Pro Elite',
      color: '#ef4444'
    },
    {
      id: 6,
      title: 'Advanced Analytics',
      description: 'Track performance, insights, and creative patterns',
      icon: '📊',
      tier: 'Pro Elite',
      color: '#14b8a6'
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Essential': return '#6366f1';
      case 'Pro Studio': return '#8b5cf6';
      case 'Pro Elite': return '#f59e0b';
      default: return '#6366f1';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Revolutionary Music Creation</Text>
        <Text style={styles.subtitle}>
          Everything you need to create, edit, and own professional music
        </Text>
      </View>
      
      <View style={styles.grid}>
        {features.map((feature) => (
          <TouchableOpacity key={feature.id} style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
              <Text style={styles.icon}>{feature.icon}</Text>
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
            <View style={[styles.tierBadge, { backgroundColor: getTierColor(feature.tier) }]}>
              <Text style={styles.tierText}>{feature.tier}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f23',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 600,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 24,
    borderRadius: 16,
    width: '45%',
    alignItems: 'center',
    minHeight: 200,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});