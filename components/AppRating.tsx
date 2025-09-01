import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as StoreReview from 'expo-store-review';

export const AppRating: React.FC = () => {
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    checkShouldShowRating();
  }, []);

  const checkShouldShowRating = async () => {
    try {
      const launchCount = await AsyncStorage.getItem('launchCount');
      const hasRated = await AsyncStorage.getItem('hasRated');
      const lastRatingPrompt = await AsyncStorage.getItem('lastRatingPrompt');
      
      const count = parseInt(launchCount || '0') + 1;
      await AsyncStorage.setItem('launchCount', count.toString());

      const daysSinceLastPrompt = lastRatingPrompt 
        ? (Date.now() - parseInt(lastRatingPrompt)) / (1000 * 60 * 60 * 24)
        : 999;

      if (!hasRated && count >= 5 && daysSinceLastPrompt > 7) {
        setShowRating(true);
      }
    } catch (error) {
      console.log('Rating check failed:', error);
    }
  };

  const handleRate = async () => {
    try {
      if (await StoreReview.hasAction()) {
        await StoreReview.requestReview();
        await AsyncStorage.setItem('hasRated', 'true');
        setShowRating(false);
      }
    } catch (error) {
      console.log('Rating failed:', error);
    }
  };

  const handleLater = async () => {
    await AsyncStorage.setItem('lastRatingPrompt', Date.now().toString());
    setShowRating(false);
  };

  if (!showRating) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enjoying StudioForgeAI?</Text>
      <Text style={styles.message}>
        Please take a moment to rate us in the app store!
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleRate}>
          <Text style={styles.buttonText}>Rate Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.laterButton]} onPress={handleLater}>
          <Text style={styles.laterText}>Maybe Later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  laterButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  laterText: {
    color: '#ccc',
    fontWeight: '600',
  },
});