import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { SecurityProvider } from '../components/SecurityProvider';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SecurityProvider>
        <StatusBar style="light" backgroundColor="#0f0f23" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0f0f23' },
          }}
        />
      </SecurityProvider>
    </ErrorBoundary>
  );
}