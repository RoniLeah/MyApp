import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/app/lib/supabase';

interface OfflineData {
  projects: any[];
  settings: any;
  lastSync: string;
}

export default function OfflineManager() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  useEffect(() => {
    checkConnection();
    loadOfflineData();
    
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from('users').select('count').limit(1);
      const online = !error;
      
      if (online !== isOnline) {
        setIsOnline(online);
        if (online) {
          syncOfflineData();
        } else {
          Alert.alert('Offline Mode', 'You are now offline. Changes will be saved locally.');
        }
      }
    } catch (error) {
      setIsOnline(false);
    }
  };

  const loadOfflineData = async () => {
    try {
      const data = await AsyncStorage.getItem('offlineData');
      if (data) {
        setOfflineData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load offline data:', error);
    }
  };

  const saveOfflineData = async (data: Partial<OfflineData>) => {
    try {
      const current = offlineData || { projects: [], settings: {}, lastSync: '' };
      const updated = { ...current, ...data, lastSync: new Date().toISOString() };
      
      await AsyncStorage.setItem('offlineData', JSON.stringify(updated));
      setOfflineData(updated);
    } catch (error) {
      console.error('Failed to save offline data:', error);
    }
  };

  const syncOfflineData = async () => {
    if (!isOnline || !offlineData) return;
    
    setSyncStatus('syncing');
    try {
      // Sync projects
      for (const project of offlineData.projects) {
        await supabase.from('collaborations').upsert(project);
      }
      
      // Clear offline data after successful sync
      await AsyncStorage.removeItem('offlineData');
      setOfflineData(null);
      setSyncStatus('idle');
      
      Alert.alert('Sync Complete', 'All offline changes have been synchronized.');
    } catch (error) {
      setSyncStatus('error');
      Alert.alert('Sync Failed', 'Unable to sync offline changes. Will retry when connection improves.');
    }
  };

  const getStatusColor = () => {
    if (!isOnline) return '#ef4444';
    if (syncStatus === 'syncing') return '#f59e0b';
    if (syncStatus === 'error') return '#ef4444';
    return '#10b981';
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline';
    if (syncStatus === 'syncing') return 'Syncing...';
    if (syncStatus === 'error') return 'Sync Error';
    return 'Online';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
      </View>
      
      {offlineData && (
        <View style={styles.offlineInfo}>
          <Text style={styles.offlineText}>
            {offlineData.projects.length} projects saved offline
          </Text>
          <Text style={styles.lastSync}>
            Last sync: {new Date(offlineData.lastSync).toLocaleString()}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 50, right: 20, zIndex: 1000 },
  statusIndicator: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  statusText: { color: 'white', fontSize: 12, fontWeight: '600' },
  offlineInfo: { backgroundColor: 'white', padding: 10, borderRadius: 8, marginTop: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  offlineText: { fontSize: 12, color: '#374151', fontWeight: '500' },
  lastSync: { fontSize: 10, color: '#6b7280', marginTop: 2 }
});