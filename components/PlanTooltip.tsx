import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PlanTooltipProps {
  visible: boolean;
  plan: 'starter' | 'professional' | 'enterprise';
  position: { x: number; y: number };
}

export const PlanTooltip = ({ visible, plan, position }: PlanTooltipProps) => {
  if (!visible) return null;

  const getPlanDetails = () => {
    switch (plan) {
      case 'starter':
        return {
          title: 'Starter Plan Features',
          features: [
            '✓ 5 voice clones per month',
            '✓ Basic music generation',
            '✓ 5GB cloud storage',
            '✓ Standard audio quality',
            '✗ No collaboration tools',
            '✗ No API access',
            '✗ Limited export formats'
          ]
        };
      case 'professional':
        return {
          title: 'Professional Plan Features',
          features: [
            '✓ Unlimited voice clones',
            '✓ Advanced music generation',
            '✓ 25GB cloud storage',
            '✓ High-quality audio (48kHz)',
            '✓ Team collaboration (5 members)',
            '✓ Priority support',
            '✗ No API access',
            '✓ All export formats'
          ]
        };
      case 'enterprise':
        return {
          title: 'Enterprise Plan Features',
          features: [
            '✓ Everything unlimited',
            '✓ Premium AI models',
            '✓ 100GB cloud storage',
            '✓ Studio-quality audio (96kHz)',
            '✓ Unlimited team members',
            '✓ 24/7 priority support',
            '✓ Full API access',
            '✓ Custom integrations'
          ]
        };
    }
  };

  const details = getPlanDetails();

  return (
    <View style={[styles.tooltip, { top: position.y - 10, left: position.x - 150 }]}>
      <Text style={styles.tooltipTitle}>{details.title}</Text>
      {details.features.map((feature, i) => (
        <Text key={i} style={[styles.featureText, feature.startsWith('✗') && styles.unavailable]}>
          {feature}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    backgroundColor: '#0f0f23',
    borderColor: '#6366f1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    width: 300,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  tooltipTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  featureText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 4
  },
  unavailable: {
    color: '#666'
  }
});