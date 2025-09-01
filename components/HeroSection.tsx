import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const HeroSection = () => {
  return (
    <View style={styles.hero}>
      <Image 
        source={{ uri: 'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756125633450_90d4ced4.webp' }}
        style={styles.heroImage}
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Voice, Your Music, Your Way</Text>
          <Text style={styles.subtitle}>
            Create professional music with AI-powered tools, your own voice twin, 
            and complete creative control over every element.
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Start Creating</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 600,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#e5e7eb',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#a855f7',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '600',
  },
});