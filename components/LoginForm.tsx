import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './RealAuthProvider';

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
  onBack?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password);
      } else {
        result = await signIn(email, password);
      }
      
      if (result.error) {
        Alert.alert('Error', result.error);
      } else {
        Alert.alert('Success', isSignUp ? 'Account created successfully!' : 'Welcome back!');
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert('Success', 'Password reset link sent to your email');
      setShowResetPassword(false);
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
    setLoading(false);
  };

  if (showResetPassword) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowResetPassword(false)}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </Text>
      </TouchableOpacity>
      
      {!isSignUp && (
        <TouchableOpacity onPress={() => setShowResetPassword(true)}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity onPress={onToggleMode}>
        <Text style={styles.linkText}>
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#1a1a2e', borderRadius: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#16213e', color: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#0f3460', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#e94560', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' }
});