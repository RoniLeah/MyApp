import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simple admin authentication
    if (email === 'admin@studioforgeai.com' && password === 'Romans1212!') {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Access Denied', 'Invalid admin credentials');
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Admin Access</Text>
        <Text style={styles.subtitle}>StudioForgeAI Backend Management</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Admin Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Access Dashboard</Text>
        </TouchableOpacity>
        
        <View style={styles.ownerBadge}>
          <Text style={styles.ownerText}>🔐 Owner Access</Text>
          <Text style={styles.ownerSubtext}>Full platform control & analytics</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 20
  },
  loginCard: {
    backgroundColor: '#1a1a1a',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 30
  },
  input: {
    width: '100%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
    fontSize: 16
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#6366f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  ownerBadge: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
    alignItems: 'center'
  },
  ownerText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: 'bold'
  },
  ownerSubtext: {
    color: '#888',
    fontSize: 12,
    marginTop: 4
  }
});