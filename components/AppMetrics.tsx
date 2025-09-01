import React, { useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

interface AppMetricsProps {
  userId?: string;
}

export const AppMetrics: React.FC<AppMetricsProps> = ({ userId }) => {
  useEffect(() => {
    const trackAppLaunch = async () => {
      try {
        const deviceInfo = {
          brand: Device.brand,
          modelName: Device.modelName,
          osName: Device.osName,
          osVersion: Device.osVersion,
          appVersion: Application.nativeApplicationVersion,
          buildVersion: Application.nativeBuildVersion,
        };

        await supabase.functions.invoke('analytics-tracker', {
          body: {
            event: 'app_launch',
            userId: userId || 'anonymous',
            properties: {
              ...deviceInfo,
              timestamp: new Date().toISOString(),
            }
          }
        });
      } catch (error) {
        console.log('Analytics tracking failed:', error);
      }
    };

    trackAppLaunch();
  }, [userId]);

  return null;
};

export const trackEvent = async (eventName: string, properties: any = {}) => {
  try {
    await supabase.functions.invoke('analytics-tracker', {
      body: {
        event: eventName,
        properties: {
          ...properties,
          timestamp: new Date().toISOString(),
        }
      }
    });
  } catch (error) {
    console.log('Event tracking failed:', error);
  }
};