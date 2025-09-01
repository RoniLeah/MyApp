import React from 'react';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from './AuthProvider';
import { Alert } from 'react-native';

export interface ProjectData {
  title: string;
  type: 'lyric' | 'backtrack' | 'collaboration';
  content: any;
  status?: 'draft' | 'finished' | 'exported';
  file_url?: string;
  metadata?: any;
}

export const useProjectManager = () => {
  const { user } = useAuth();

  const saveProject = async (projectData: ProjectData) => {
    if (!user) {
      Alert.alert('Error', 'Please log in to save projects');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: projectData.title,
          type: projectData.type,
          content: projectData.content,
          status: projectData.status || 'draft',
          file_url: projectData.file_url,
          metadata: projectData.metadata
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving project:', error);
      Alert.alert('Error', 'Failed to save project');
      return null;
    }
  };

  const updateProject = async (projectId: string, updates: Partial<ProjectData>) => {
    if (!user) {
      Alert.alert('Error', 'Please log in to update projects');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      Alert.alert('Error', 'Failed to update project');
      return null;
    }
  };

  const loadProject = async (projectId: string) => {
    if (!user) {
      Alert.alert('Error', 'Please log in to load projects');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error loading project:', error);
      Alert.alert('Error', 'Failed to load project');
      return null;
    }
  };

  const getUserProjects = async (type?: string, status?: string) => {
    if (!user) return [];

    try {
      let query = supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (type) query = query.eq('type', type);
      if (status) query = query.eq('status', status);

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  return {
    saveProject,
    updateProject,
    loadProject,
    getUserProjects
  };
};