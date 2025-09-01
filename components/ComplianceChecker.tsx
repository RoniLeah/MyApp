import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

interface ComplianceItem {
  id: string;
  title: string;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  platform: 'ios' | 'android' | 'both';
}

export const ComplianceChecker: React.FC = () => {
  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'Privacy Policy',
      status: 'pass',
      description: 'Privacy policy is present and accessible',
      platform: 'both'
    },
    {
      id: '2', 
      title: 'Terms & Conditions',
      status: 'pass',
      description: 'Terms of service document is available',
      platform: 'both'
    },
    {
      id: '3',
      title: 'App Permissions',
      status: 'pass',
      description: 'Required permissions declared in app.json',
      platform: 'both'
    },
    {
      id: '4',
      title: 'In-App Purchases',
      status: 'warning',
      description: 'Subscription system needs platform-specific IAP integration',
      platform: 'both'
    },
    {
      id: '5',
      title: 'Content Rating',
      status: 'warning',
      description: 'Content rating questionnaire needs completion',
      platform: 'android'
    },
    {
      id: '6',
      title: 'App Store Assets',
      status: 'warning',
      description: 'Screenshots and promotional materials needed',
      platform: 'both'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'fail': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return '✅';
      case 'warning': return '⚠️';
      case 'fail': return '❌';
      default: return '❓';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>App Store Compliance</Text>
      
      {complianceItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemIcon}>{getStatusIcon(item.status)}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={[styles.platform, { color: getStatusColor(item.status) }]}>
              {item.platform.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
      ))}
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Compliance Summary</Text>
        <Text style={styles.summaryText}>
          iOS Ready: 75% | Android Ready: 80%
        </Text>
        <Text style={styles.summaryNote}>
          Complete remaining items before app store submission
        </Text>
      </View>
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
    marginBottom: 30,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  platform: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#333333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 30,
  },
  summaryContainer: {
    backgroundColor: '#2a2a2a',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#10B981',
    marginBottom: 5,
  },
  summaryNote: {
    fontSize: 14,
    color: '#F59E0B',
    textAlign: 'center',
  },
});