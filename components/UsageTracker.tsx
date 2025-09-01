import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface UsageStats {
  dailyActiveUsers: number;
  sessionDuration: number;
  featureUsage: { [key: string]: number };
  crashRate: number;
  retentionRate: number;
}

export default function UsageTracker() {
  const [stats, setStats] = useState<UsageStats>({
    dailyActiveUsers: 0,
    sessionDuration: 0,
    featureUsage: {},
    crashRate: 0,
    retentionRate: 0
  });

  useEffect(() => {
    trackSession();
    loadUsageStats();
  }, []);

  const trackSession = async () => {
    try {
      await supabase.functions.invoke('analytics-tracker', {
        body: {
          event: 'session_start',
          data: {
            timestamp: new Date().toISOString(),
            platform: 'mobile'
          }
        }
      });
    } catch (error) {
      console.error('Failed to track session:', error);
    }
  };

  const trackFeatureUsage = async (feature: string) => {
    try {
      await supabase.functions.invoke('analytics-tracker', {
        body: {
          event: 'feature_used',
          data: {
            feature,
            timestamp: new Date().toISOString()
          }
        }
      });
      
      setStats(prev => ({
        ...prev,
        featureUsage: {
          ...prev.featureUsage,
          [feature]: (prev.featureUsage[feature] || 0) + 1
        }
      }));
    } catch (error) {
      console.error('Failed to track feature usage:', error);
    }
  };

  const loadUsageStats = async () => {
    try {
      // Simulate loading usage statistics
      setStats({
        dailyActiveUsers: Math.floor(Math.random() * 1000) + 100,
        sessionDuration: Math.floor(Math.random() * 30) + 10,
        featureUsage: {
          'Karaoke Studio': Math.floor(Math.random() * 500) + 50,
          'Collaboration': Math.floor(Math.random() * 300) + 30,
          'Voice Library': Math.floor(Math.random() * 200) + 20,
          'Export Hub': Math.floor(Math.random() * 150) + 15
        },
        crashRate: Math.random() * 2,
        retentionRate: Math.random() * 20 + 80
      });
    } catch (error) {
      console.error('Failed to load usage stats:', error);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Usage Analytics</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.dailyActiveUsers.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Daily Active Users</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatDuration(stats.sessionDuration)}</Text>
          <Text style={styles.statLabel}>Avg Session Duration</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.crashRate.toFixed(2)}%</Text>
          <Text style={styles.statLabel}>Crash Rate</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.retentionRate.toFixed(1)}%</Text>
          <Text style={styles.statLabel}>7-Day Retention</Text>
        </View>
      </View>

      <View style={styles.featureUsage}>
        <Text style={styles.sectionTitle}>Feature Usage</Text>
        {Object.entries(stats.featureUsage).map(([feature, count]) => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.featureName}>{feature}</Text>
            <Text style={styles.featureCount}>{count.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1f2937' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginBottom: 30 },
  statCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, minWidth: '45%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#3b82f6', marginBottom: 5 },
  statLabel: { fontSize: 14, color: '#6b7280', textAlign: 'center' },
  featureUsage: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 15 },
  featureRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  featureName: { fontSize: 16, color: '#374151' },
  featureCount: { fontSize: 16, fontWeight: '600', color: '#3b82f6' }
});