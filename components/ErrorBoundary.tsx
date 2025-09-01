import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo });
    this.logError(error, errorInfo);
  }

  logError = async (error: Error, errorInfo: any) => {
    try {
      await supabase.functions.invoke('analytics-tracker', {
        body: {
          event: 'app_error',
          data: {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString()
          }
        }
      });
    } catch (logError) {
      console.error('Failed to log error:', logError);
    }
  };

  handleRestart = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReport = async () => {
    try {
      await supabase.functions.invoke('analytics-tracker', {
        body: {
          event: 'error_report',
          data: {
            error: this.state.error?.message,
            userReported: true,
            timestamp: new Date().toISOString()
          }
        }
      });
      Alert.alert('Thank you', 'Error report sent successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to send report');
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry for the inconvenience. The app encountered an unexpected error.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.handleRestart}>
              <Text style={styles.buttonText}>Restart App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.reportButton]} onPress={this.handleReport}>
              <Text style={[styles.buttonText, styles.reportButtonText]}>Report Issue</Text>
            </TouchableOpacity>
          </View>

          {__DEV__ && (
            <View style={styles.debugContainer}>
              <Text style={styles.debugTitle}>Debug Info:</Text>
              <Text style={styles.debugText}>{this.state.error?.message}</Text>
            </View>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ef4444', marginBottom: 10, textAlign: 'center' },
  message: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 30, lineHeight: 24 },
  buttonContainer: { gap: 15 },
  button: { backgroundColor: '#3b82f6', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, minWidth: 200 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600', textAlign: 'center' },
  reportButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#3b82f6' },
  reportButtonText: { color: '#3b82f6' },
  debugContainer: { marginTop: 30, padding: 15, backgroundColor: '#fee2e2', borderRadius: 10, maxWidth: '100%' },
  debugTitle: { fontSize: 14, fontWeight: 'bold', color: '#dc2626', marginBottom: 5 },
  debugText: { fontSize: 12, color: '#dc2626', fontFamily: 'monospace' }
});