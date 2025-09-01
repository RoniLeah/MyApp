import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { trackEvent } from './AppMetrics';

export const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    let appStateStartTime = Date.now();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const sessionDuration = Date.now() - appStateStartTime;

      if (nextAppState === 'background' || nextAppState === 'inactive') {
        trackEvent('app_backgrounded', {
          sessionDuration: Math.round(sessionDuration / 1000),
        });
      } else if (nextAppState === 'active') {
        trackEvent('app_foregrounded', {
          backgroundDuration: Math.round(sessionDuration / 1000),
        });
        appStateStartTime = Date.now();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Track app launch
    trackEvent('performance_monitor_initialized');

    return () => {
      subscription?.remove();
    };
  }, []);

  return null;
};

export const measurePerformance = async (operationName: string, operation: () => Promise<any>) => {
  const startTime = Date.now();
  
  try {
    const result = await operation();
    const duration = Date.now() - startTime;
    
    trackEvent('performance_measurement', {
      operation: operationName,
      duration,
      success: true,
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    trackEvent('performance_measurement', {
      operation: operationName,
      duration,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    throw error;
  }
};