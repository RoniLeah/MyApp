import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  stripePriceId: string;
}

const IAPManager = () => {
  const [plans] = useState<PricingPlan[]>([
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99/month',
      features: ['10 AI generations', 'Basic mixing', 'Standard export'],
      stripePriceId: 'price_basic_monthly'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19.99/month',
      features: ['Unlimited AI', 'Advanced mixing', 'HD export', 'Collaboration'],
      stripePriceId: 'price_pro_monthly'
    },
    {
      id: 'studio',
      name: 'Studio',
      price: '$39.99/month',
      features: ['Everything in Pro', 'Stem separation', 'Commercial license'],
      stripePriceId: 'price_studio_monthly'
    }
  ]);

  const [loading, setLoading] = useState(false);

  const handlePurchase = async (plan: PricingPlan) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('stripe-subscription', {
        body: { 
          priceId: plan.stripePriceId,
          planName: plan.name 
        }
      });

      if (error) throw error;

      if (data?.url) {
        Alert.alert('Redirect to Payment', 'You will be redirected to complete payment');
        // In a real app, you would open the payment URL
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process purchase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Plan</Text>
      <Text style={styles.subtitle}>Unlock the full power of StudioForgeAI</Text>

      {plans.map((plan) => (
        <View key={plan.id} style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planPrice}>{plan.price}</Text>
          </View>
          
          <View style={styles.features}>
            {plan.features.map((feature, index) => (
              <Text key={index} style={styles.feature}>• {feature}</Text>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.purchaseButton, plan.id === 'pro' && styles.popularButton]}
            onPress={() => handlePurchase(plan)}
            disabled={loading}
          >
            <Text style={[styles.buttonText, plan.id === 'pro' && styles.popularButtonText]}>
              {loading ? 'Processing...' : 'Subscribe'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  planCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  planName: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  planPrice: { fontSize: 20, fontWeight: '600', color: '#007AFF' },
  features: { marginBottom: 20 },
  feature: { fontSize: 16, color: '#555', marginBottom: 5 },
  purchaseButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  popularButton: { backgroundColor: '#FF6B35' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  popularButtonText: { color: '#fff' }
});

export default IAPManager;