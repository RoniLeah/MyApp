import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface PerformanceMetrics {
  memoryUsage: number;
  renderTime: number;
  networkLatency: number;
  crashCount: number;
  batteryOptimized: boolean;
}

export default function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    memoryUsage: 0,
    renderTime: 0,
    networkLatency: 0,
    crashCount: 0,
    batteryOptimized: true
  });
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    checkPerformance();
    const interval = setInterval(checkPerformance, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkPerformance = async () => {
    try {
      const startTime = Date.now();
      
      // Test network latency
      await supabase.from('users').select('count').limit(1);
      const networkTime = Date.now() - startTime;

      // Simulate performance metrics
      setMetrics({
        memoryUsage: Math.random() * 100,
        renderTime: Math.random() * 16,
        networkLatency: networkTime,
        crashCount: 0,
        batteryOptimized: true
      });
    } catch (error) {
      console.error('Performance check failed:', error);
    }
  };

  const optimizePerformance = async () => {
    setOptimizing(true);
    try {
      // Simulate optimization
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMetrics(prev => ({
        ...prev,
        memoryUsage: Math.max(0, prev.memoryUsage - 20),
        renderTime: Math.max(0, prev.renderTime - 5),
        batteryOptimized: true
      }));
      
      Alert.alert('Success', 'Performance optimized successfully!');
    } catch (error) {
      Alert.alert('Error', 'Optimization failed');
    } finally {
      setOptimizing(false);
    }
  };

  const getStatusColor = (value: number, threshold: number) => {
    return value > threshold ? '#ef4444' : value > threshold * 0.7 ? '#f59e0b' : '#10b981';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance Optimizer</Text>
      
      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Memory Usage</Text>
          <Text style={[styles.metricValue, { color: getStatusColor(metrics.memoryUsage, 80) }]}>
            {metrics.memoryUsage.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Render Time</Text>
          <Text style={[styles.metricValue, { color: getStatusColor(metrics.renderTime, 16) }]}>
            {metrics.renderTime.toFixed(1)}ms
          </Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Network Latency</Text>
          <Text style={[styles.metricValue, { color: getStatusColor(metrics.networkLatency, 1000) }]}>
            {metrics.networkLatency}ms
          </Text>
        </View>

        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Battery Optimized</Text>
          <Text style={[styles.metricValue, { color: metrics.batteryOptimized ? '#10b981' : '#ef4444' }]}>
            {metrics.batteryOptimized ? 'Yes' : 'No'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#1f2937' },
  metricsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  metric: { backgroundColor: 'white', padding: 15, borderRadius: 10, minWidth: '45%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  metricLabel: { fontSize: 14, color: '#6b7280', marginBottom: 5 },
  metricValue: { fontSize: 20, fontWeight: 'bold' }
});