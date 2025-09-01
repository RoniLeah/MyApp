import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    { label: 'Total Creations', value: '127', change: '+12%', color: '#10b981' },
    { label: 'Studio Time', value: '48h', change: '+8%', color: '#8b5cf6' },
    { label: 'Collaborations', value: '23', change: '+15%', color: '#f59e0b' },
    { label: 'Downloads', value: '89', change: '+22%', color: '#06b6d4' }
  ];

  const topTracks = [
    { name: 'Midnight Dreams', plays: 1247, engagement: 89 },
    { name: 'Electric Pulse', plays: 892, engagement: 76 },
    { name: 'Acoustic Sunset', plays: 654, engagement: 82 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      <Text style={styles.subtitle}>Track your creative performance and insights</Text>
      
      <View style={styles.timeRangeContainer}>
        {['7d', '30d', '90d'].map((range) => (
          <TouchableOpacity
            key={range}
            style={[styles.timeButton, timeRange === range && styles.activeTimeButton]}
            onPress={() => setTimeRange(range)}
          >
            <Text style={[styles.timeButtonText, timeRange === range && styles.activeTimeButtonText]}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View
              key={index}
              style={[styles.statCard, { backgroundColor: '#1a1a2e' }]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statChange, { color: stat.color }]}>
                {stat.change}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Tracks</Text>
          {topTracks.map((track, index) => (
            <View key={index} style={styles.trackCard}>
              <View style={styles.trackInfo}>
                <Text style={styles.trackName}>{track.name}</Text>
                <Text style={styles.trackPlays}>{track.plays} plays</Text>
              </View>
              <View style={styles.engagementContainer}>
                <View style={styles.engagementBar}>
                  <View style={[styles.engagementFill, { width: `${track.engagement}%` }]} />
                </View>
                <Text style={styles.engagementText}>{track.engagement}%</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Insights</Text>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🎵 Most Used Feature</Text>
            <Text style={styles.insightText}>AI Voice Creation (67% of sessions)</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>⏰ Peak Creative Hours</Text>
            <Text style={styles.insightText}>8-10 PM (34% of activity)</Text>
          </View>
          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>🎯 Completion Rate</Text>
            <Text style={styles.insightText}>78% of started projects finished</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f23',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTimeButton: {
    backgroundColor: '#8b5cf6',
  },
  timeButtonText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  activeTimeButtonText: {
    color: '#ffffff',
  },
  content: {
    maxHeight: 500,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  trackPlays: {
    fontSize: 14,
    color: '#9ca3af',
  },
  engagementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 100,
  },
  engagementBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
  },
  engagementFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 3,
  },
  engagementText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    width: 30,
  },
  insightCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default AnalyticsDashboard;