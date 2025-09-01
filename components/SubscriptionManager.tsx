import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

export default function SubscriptionManager() {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    checkOwnerStatus();
  }, []);

  const checkOwnerStatus = async () => {
    // Check if user is the owner (you)
    const userEmail = 'admin@soundforge.ai'; // Your email
    if (userEmail === 'admin@soundforge.ai') {
      setIsOwner(true);
      setCurrentPlan('owner');
    }
  };

  const handleUpgrade = async (plan: string) => {
    if (isOwner) {
      Alert.alert('Owner Access', 'You have full access to all features!');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('stripe-subscription', {
        body: { plan, action: 'create' }
      });
      
      if (error) throw error;
      Alert.alert('Success', `Upgraded to ${plan} plan!`);
      setCurrentPlan(plan);
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription');
    }
  };

  const PlanCard = ({ title, price, features, planId, popular }: any) => (
    <View style={[styles.planCard, popular && styles.popularCard]}>
      {popular && <Text style={styles.popularBadge}>MOST POPULAR</Text>}
      {isOwner && planId === 'owner' && <Text style={styles.ownerBadge}>OWNER ACCESS</Text>}
      <Text style={styles.planTitle}>{title}</Text>
      <Text style={styles.planPrice}>{price}</Text>
      <View style={styles.featuresList}>
        {features.map((feature: string, index: number) => (
          <Text key={index} style={styles.feature}>✓ {feature}</Text>
        ))}
      </View>
      <TouchableOpacity
        style={[
          styles.upgradeButton,
          currentPlan === planId && styles.currentPlan,
          isOwner && planId === 'owner' && styles.ownerButton
        ]}
        onPress={() => handleUpgrade(planId)}
        disabled={currentPlan === planId}
      >
        <Text style={styles.upgradeText}>
          {currentPlan === planId ? 'Current Plan' : 
           isOwner && planId === 'owner' ? 'Owner Access' : 
           'Upgrade'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Plans</Text>
      
      {isOwner && (
        <View style={styles.ownerNotice}>
          <Text style={styles.ownerNoticeText}>🎉 You have Owner Access - All features unlocked!</Text>
        </View>
      )}

      <PlanCard
        title="Basic"
        price="$9/month"
        features={['AI Beat Generation', 'Basic Vocals', '10 Songs/month']}
        planId="basic"
      />

      <PlanCard
        title="Pro"
        price="$49/month"
        features={['Everything in Basic', 'Advanced AI', 'Unlimited Songs', 'Stem Separation']}
        planId="pro"
        popular={!isOwner}
      />

      <PlanCard
        title="Pro Elite"
        price="$99/month"
        features={['Everything in Pro', 'Real-time Collaboration', 'Analytics Dashboard', 'Priority Support']}
        planId="pro-elite"
      />

      {isOwner && (
        <PlanCard
          title="Owner"
          price="FREE"
          features={['All Features Unlocked', 'Admin Dashboard', 'Backend Management', 'Lifetime Access']}
          planId="owner"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#1a1a2e', borderRadius: 12, padding: 20, margin: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  ownerNotice: { backgroundColor: '#10b981', padding: 15, borderRadius: 8, marginBottom: 20 },
  ownerNoticeText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  planCard: { backgroundColor: '#16213e', borderRadius: 8, padding: 16, marginBottom: 15 },
  popularCard: { borderWidth: 2, borderColor: '#8b5cf6' },
  popularBadge: { backgroundColor: '#8b5cf6', color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center', padding: 4, borderRadius: 4, marginBottom: 10 },
  ownerBadge: { backgroundColor: '#10b981', color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center', padding: 4, borderRadius: 4, marginBottom: 10 },
  planTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  planPrice: { fontSize: 16, color: '#8b5cf6', marginBottom: 12 },
  featuresList: { marginBottom: 15 },
  feature: { color: '#9ca3af', fontSize: 14, marginBottom: 4 },
  upgradeButton: { backgroundColor: '#8b5cf6', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  currentPlan: { backgroundColor: '#6b7280' },
  ownerButton: { backgroundColor: '#10b981' },
  upgradeText: { color: '#fff', fontWeight: 'bold' }
});