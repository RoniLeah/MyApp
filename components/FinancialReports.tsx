import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface FinancialData {
  totalRevenue: number;
  monthlyRevenue: number;
  subscriptionBreakdown: { [key: string]: number };
  churnRate: number;
  averageRevenuePerUser: number;
  monthlyGrowth: number;
}

export default function FinancialReports() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    subscriptionBreakdown: {},
    churnRate: 0,
    averageRevenuePerUser: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-dashboard', {
        body: { action: 'get_financial_reports' }
      });
      if (data) setFinancialData(data);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  };

  const MetricCard = ({ title, value, subtitle, color = '#6366f1' }: any) => (
    <View style={{
      backgroundColor: '#1a1a1a',
      padding: 20,
      borderRadius: 12,
      marginBottom: 15,
      borderLeftWidth: 4,
      borderLeftColor: color
    }}>
      <Text style={{ color: '#888', fontSize: 14, marginBottom: 5 }}>{title}</Text>
      <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>{value}</Text>
      {subtitle && <Text style={{ color: '#888', fontSize: 12, marginTop: 5 }}>{subtitle}</Text>}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0a0a0a' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
        Financial Reports
      </Text>

      <ScrollView>
        <MetricCard
          title="Total Revenue"
          value={`$${financialData.totalRevenue.toLocaleString()}`}
          subtitle="All-time earnings"
          color="#10b981"
        />

        <MetricCard
          title="Monthly Recurring Revenue"
          value={`$${financialData.monthlyRevenue.toLocaleString()}`}
          subtitle={`${financialData.monthlyGrowth > 0 ? '+' : ''}${financialData.monthlyGrowth}% vs last month`}
          color="#6366f1"
        />

        <MetricCard
          title="Average Revenue Per User"
          value={`$${financialData.averageRevenuePerUser.toFixed(2)}`}
          subtitle="Per month"
          color="#f59e0b"
        />

        <MetricCard
          title="Churn Rate"
          value={`${financialData.churnRate.toFixed(1)}%`}
          subtitle="Monthly churn rate"
          color="#ef4444"
        />

        <View style={{
          backgroundColor: '#1a1a1a',
          padding: 20,
          borderRadius: 12,
          marginBottom: 15
        }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
            Subscription Breakdown
          </Text>
          {Object.entries(financialData.subscriptionBreakdown).map(([tier, count]) => (
            <View key={tier} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ color: '#888' }}>{tier} Tier</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{count} users</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}