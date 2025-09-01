import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSecuritySettings();
  }, []);

  const checkSecuritySettings = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem('biometricEnabled');
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (biometricEnabled === 'true' && hasHardware && isEnrolled) {
        await authenticateWithBiometrics();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Security check failed:', error);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access SoundForge AI',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
      });

      setIsAuthenticated(result.success);
    } catch (error) {
      console.log('Biometric auth failed:', error);
      setIsAuthenticated(true);
    }
  };

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  if (!isAuthenticated) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return <>{children}</>;
};

export const secureStore = {
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log('Secure store set failed:', error);
      await AsyncStorage.setItem(key, value);
    }
  },
  getItem: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log('Secure store get failed:', error);
      return await AsyncStorage.getItem(key);
    }
  },
  deleteItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log('Secure store delete failed:', error);
      await AsyncStorage.removeItem(key);
    }
  },
};