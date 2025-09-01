import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DiagnosticIssue {
  severity: 'critical' | 'warning' | 'info';
  category: string;
  issue: string;
  solution: string;
}

export const DiagnosticReport = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const diagnosticIssues: DiagnosticIssue[] = [
    {
      severity: 'critical',
      category: 'App Store Assets',
      issue: 'Missing required app store icons (1024x1024 for iOS)',
      solution: 'Generate and add high-resolution app icons in all required sizes'
    },
    {
      severity: 'warning',
      category: 'Permissions',
      issue: 'Some permissions may not be used (Camera access)',
      solution: 'Review and remove unused permissions or implement camera features'
    },
    {
      severity: 'warning',
      category: 'Performance',
      issue: 'Large bundle size due to multiple unused components',
      solution: 'Implement code splitting and remove unused components'
    },
    {
      severity: 'info',
      category: 'User Experience',
      issue: 'No offline functionality implemented',
      solution: 'Add offline storage for basic app functionality'
    },
    {
      severity: 'critical',
      category: 'Payment Integration',
      issue: 'Stripe webhook endpoints not configured',
      solution: 'Set up webhook endpoints for payment confirmation'
    },
    {
      severity: 'warning',
      category: 'Security',
      issue: 'API keys exposed in client code',
      solution: 'Move sensitive keys to secure environment variables'
    },
    {
      severity: 'info',
      category: 'Analytics',
      issue: 'Limited user analytics tracking',
      solution: 'Implement comprehensive user behavior tracking'
    },
    {
      severity: 'warning',
      category: 'Error Handling',
      issue: 'Network errors not handled gracefully',
      solution: 'Add retry logic and better error messaging'
    }
  ];

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#F44336';
      case 'warning': return '#FF9800';
      case 'info': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'help-circle';
    }
  };

  const criticalCount = diagnosticIssues.filter(i => i.severity === 'critical').length;
  const warningCount = diagnosticIssues.filter(i => i.severity === 'warning').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diagnostic Report</Text>
        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={[styles.count, { color: '#F44336' }]}>{criticalCount}</Text>
            <Text style={styles.label}>Critical</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.count, { color: '#FF9800' }]}>{warningCount}</Text>
            <Text style={styles.label}>Warnings</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.issuesList}>
        {diagnosticIssues.map((issue, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.issueCard}
            onPress={() => toggleExpanded(index)}
          >
            <View style={styles.issueHeader}>
              <Ionicons 
                name={getSeverityIcon(issue.severity)} 
                size={24} 
                color={getSeverityColor(issue.severity)} 
              />
              <View style={styles.issueInfo}>
                <Text style={styles.category}>{issue.category}</Text>
                <Text style={styles.issueText}>{issue.issue}</Text>
              </View>
              <Ionicons 
                name={expandedItems.includes(index) ? 'chevron-up' : 'chevron-down'} 
                size={20} 
                color="#666" 
              />
            </View>
            
            {expandedItems.includes(index) && (
              <View style={styles.solution}>
                <Text style={styles.solutionLabel}>Solution:</Text>
                <Text style={styles.solutionText}>{issue.solution}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.exportBtn}
          onPress={() => Alert.alert('Export', 'Diagnostic report exported')}
        >
          <Ionicons name="download" size={20} color="#fff" />
          <Text style={styles.exportText}>Export Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  summary: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  count: { fontSize: 32, fontWeight: 'bold' },
  label: { fontSize: 14, color: '#666', marginTop: 4 },
  issuesList: { flex: 1, padding: 20 },
  issueCard: { backgroundColor: '#fff', borderRadius: 8, marginBottom: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  issueHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  issueInfo: { flex: 1, marginLeft: 12, marginRight: 8 },
  category: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  issueText: { fontSize: 14, color: '#666', lineHeight: 20 },
  solution: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  solutionLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  solutionText: { fontSize: 14, color: '#666', lineHeight: 20 },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e0e0e0' },
  exportBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#007AFF', padding: 15, borderRadius: 8 },
  exportText: { color: '#fff', fontSize: 16, fontWeight: '600', marginLeft: 8 }
});