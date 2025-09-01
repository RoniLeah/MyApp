import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';
import UserManagement from './UserManagement';
import FinancialReports from './FinancialReports';
import EmailMarketing from './EmailMarketing';

export default function AdminDashboard() {
  const [data, setData] = useState<any>({});
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async (action: string) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('admin-dashboard', {
        body: { action, adminKey: 'SOUNDFORGE_ADMIN_2024' }
      });
      
      if (error) throw error;
      setData(prev => ({ ...prev, [action]: result }));
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch admin data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdminData('users');
    fetchAdminData('analytics');
    fetchAdminData('subscriptions');
  }, []);

  const TabButton = ({ id, title }: { id: string; title: string }) => (
    <TouchableOpacity
      style={[styles.tab, activeTab === id && styles.activeTab]}
      onPress={() => setActiveTab(id)}
    >
      <Text style={[styles.tabText, activeTab === id && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const StatCard = ({ title, value, subtitle }: any) => (
    <View style={styles.statCard}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      
      <View style={styles.tabContainer}>
        <TabButton id="overview" title="Overview" />
        <TabButton id="users" title="Users" />
        <TabButton id="financial" title="Financial" />
        <TabButton id="marketing" title="Marketing" />
      </View>

      {activeTab === 'overview' && (
        <View style={styles.content}>
          <View style={styles.statsGrid}>
            <StatCard title="Total Users" value="1,679" subtitle="All time" />
            <StatCard title="Active Users" value="892" subtitle="This month" />
            <StatCard title="Monthly Revenue" value="$18,900" subtitle="Current month" />
            <StatCard title="Avg Rating" value="4.6/5" subtitle="234 reviews" />
          </View>
        </View>
      )}

      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'financial' && <FinancialReports />}
      {activeTab === 'marketing' && <EmailMarketing />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, padding: 12, backgroundColor: '#1a1a1a', marginRight: 10, borderRadius: 8 },
  activeTab: { backgroundColor: '#6366f1' },
  tabText: { color: '#888', textAlign: 'center', fontWeight: '600' },
  activeTabText: { color: '#fff' },
  content: { flex: 1 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  statCard: { width: '48%', backgroundColor: '#1a1a1a', padding: 15, borderRadius: 12, marginBottom: 15 },
  statTitle: { color: '#888', fontSize: 14, marginBottom: 5 },
  statValue: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statSubtitle: { color: '#666', fontSize: 12 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  userCard: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 8, marginBottom: 10 },
  userEmail: { color: '#fff', fontSize: 16, fontWeight: '600' },
  userPlan: { color: '#6366f1', fontSize: 14, marginTop: 5 },
  userStatus: { color: '#10b981', fontSize: 12, marginTop: 2 },
  revenueCard: { backgroundColor: '#1a1a1a', padding: 15, borderRadius: 8, marginBottom: 10 },
  planTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  planStats: { color: '#888', fontSize: 14, marginTop: 5 }
});