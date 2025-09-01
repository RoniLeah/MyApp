import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$19.99',
      period: '/month',
      description: 'Perfect for aspiring musicians + 3-day FREE trial',
      trialBadge: '3-DAY FREE TRIAL',
      features: [
        '🎁 3-day full access trial',
        '✨ AI Lyric Generator (50 generations/month)',
        '🎵 Basic Backtrack Generator (20/month)',
        '🎛️ Standard Mixing Tools',
        '☁️ Cloud Storage (5GB)',
        '🎼 5 Genre Templates',
        '💾 MP3 Export',
        '📧 Email Support'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$49.99',
      period: '/month',
      description: 'Advanced tools for serious creators + 3-day FREE trial',
      trialBadge: '3-DAY FREE TRIAL',
      features: [
        '🎁 3-day full access trial',
        '✨ Unlimited AI Lyric Generation',
        '🎵 Advanced Backtrack Generator (100/month)',
        '🎛️ Professional Mixing Suite',
        '📊 Analytics Dashboard',
        '☁️ Cloud Storage (25GB)',
        '🎯 Custom Rhyme Schemes',
        '🎼 15+ Genre Templates',
        '💾 WAV & FLAC Export',
        '🎭 Collaborative Editor',
        '📧 Priority Support'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99.99',
      period: '/month',
      description: 'Complete studio solution + 3-day FREE trial',
      trialBadge: '3-DAY FREE TRIAL',
      features: [
        '🎁 3-day full access trial',
        '🎭 Unlimited Everything',
        '🌍 Multilingual Lyric Generation',
        '🎵 Unlimited Backtrack Generation',
        '✨ AI Mastering & Vinyl-Ready Export',
        '📦 Batch Export & Cloud Sync (100GB)',
        '🎵 Direct Streaming Platform Upload',
        '🏷️ Smart Metadata Tagging',
        '🌍 Global Distribution Network',
        '👨‍💼 White-glove Support',
        '🎯 Custom API Access',
        '📊 Advanced Analytics Suite'
      ],
      enterprise: true
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Creative Journey</Text>
      <Text style={styles.subtitle}>🎉 Start with 3-day FREE trial • No credit card required • Cancel anytime</Text>
      <Text style={styles.trialNote}>All paid plans include full 3-day trial access</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansContainer}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              { backgroundColor: plan.enterprise ? '#f59e0b' : plan.popular ? '#8b5cf6' : '#6366f1' },
              selectedPlan === plan.id && styles.selectedCard
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}
            {plan.enterprise && (
              <View style={[styles.popularBadge, { backgroundColor: '#dc2626' }]}>
                <Text style={styles.popularText}>PRO LEVEL</Text>
              </View>
            )}
            
            <Text style={styles.planName}>{plan.name}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
            
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{plan.price}</Text>
              <Text style={styles.period}>{plan.period}</Text>
            </View>
            
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Start 3-Day Trial</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#0f0f23' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#9ca3af', textAlign: 'center', marginBottom: 10 },
  trialNote: { fontSize: 14, color: '#10b981', textAlign: 'center', marginBottom: 30, fontWeight: '600' },
  plansContainer: { flexDirection: 'row' },
  planCard: { width: 280, marginRight: 20, borderRadius: 16, padding: 24, minHeight: 400 },
  selectedCard: { transform: [{ scale: 1.05 }] },
  popularBadge: { backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'center', marginBottom: 16 },
  popularText: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  planName: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  planDescription: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 20 },
  priceContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginBottom: 24 },
  price: { fontSize: 36, fontWeight: 'bold', color: '#ffffff' },
  period: { fontSize: 16, color: 'rgba(255,255,255,0.8)' },
  featuresContainer: { marginBottom: 24 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkmark: { color: '#10b981', fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  featureText: { color: '#ffffff', fontSize: 14, flex: 1 },
  selectButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  selectButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' }
});

export default PricingSection;