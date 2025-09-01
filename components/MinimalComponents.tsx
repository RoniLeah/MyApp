import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export const StudioHeader = ({ user, onLogin, onNavigate }: any) => (
  <View style={styles.header}>
    <Text style={styles.logo}>StudioForgeAI</Text>
    {!user ? (
      <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.welcome}>Welcome, {user.name}</Text>
    )}
  </View>
);

export const FeatureGrid = () => (
  <View style={styles.features}>
    <Text style={styles.sectionTitle}>Features</Text>
    <View style={styles.grid}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Voice Clone</Text>
        <Text style={styles.cardText}>Create your voice twin</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Music Studio</Text>
        <Text style={styles.cardText}>Professional tools</Text>
      </View>
    </View>
  </View>
);

export const PricingSection = () => (
  <View style={styles.pricing}>
    <Text style={styles.sectionTitle}>Pricing Plans</Text>
    
    <View style={styles.priceCard}>
      <Text style={styles.planName}>Starter</Text>
      <Text style={styles.price}>$19.99/month</Text>
      <Text style={styles.priceText}>Basic features • 5GB storage</Text>
    </View>
    
    <View style={[styles.priceCard, styles.popularCard]}>
      <Text style={styles.popularBadge}>Most Popular</Text>
      <Text style={styles.planName}>Professional</Text>
      <Text style={styles.price}>$49.99/month</Text>
      <Text style={styles.priceText}>Unlimited features • 25GB storage</Text>
    </View>
    
    <View style={styles.priceCard}>
      <Text style={styles.planName}>Enterprise</Text>
      <Text style={styles.price}>$99.99/month</Text>
      <Text style={styles.priceText}>Everything unlimited • 100GB storage</Text>
    </View>
  </View>
);

export const LoginForm = ({ isSignUp, onToggleMode }: any) => (
  <View style={styles.loginForm}>
    <Text style={styles.formTitle}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
    <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
    <TextInput style={styles.input} placeholder="Password" secureTextEntry placeholderTextColor="#999" />
    <TouchableOpacity style={styles.submitBtn}>
      <Text style={styles.btnText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
    </TouchableOpacity>
  </View>
);

export const StudioInterface = () => (
  <View style={styles.studio}>
    <Text style={styles.studioTitle}>Music Studio</Text>
    <Text style={styles.studioText}>Studio interface coming soon...</Text>
  </View>
);

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#1a1a2e' },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  loginBtn: { backgroundColor: '#6366f1', padding: 10, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
  welcome: { color: '#fff' },
  features: { padding: 20 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  grid: { flexDirection: 'row', justifyContent: 'space-around' },
  card: { backgroundColor: '#1a1a2e', padding: 20, borderRadius: 12, width: '45%' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  cardText: { color: '#ccc' },
  pricing: { padding: 20, alignItems: 'center' },
  priceCard: { backgroundColor: '#1a1a2e', padding: 30, borderRadius: 12, alignItems: 'center', marginBottom: 16, position: 'relative', width: '100%' },
  popularCard: { borderColor: '#6366f1', borderWidth: 2 },
  popularBadge: { position: 'absolute', top: -10, backgroundColor: '#6366f1', color: '#fff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, fontSize: 12, fontWeight: 'bold' },
  planName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  price: { fontSize: 32, fontWeight: 'bold', color: '#6366f1', marginBottom: 8 },
  priceText: { color: '#ccc', textAlign: 'center' },
  loginForm: { flex: 1, justifyContent: 'center', padding: 20 },
  formTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#1a1a2e', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15 },
  submitBtn: { backgroundColor: '#6366f1', padding: 15, borderRadius: 8, alignItems: 'center' },
  studio: { padding: 40, alignItems: 'center' },
  studioTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  studioText: { color: '#ccc', fontSize: 16 }
});