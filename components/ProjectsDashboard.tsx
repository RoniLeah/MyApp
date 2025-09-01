import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from './AuthProvider';

interface Project {
  id: string;
  title: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  content: any;
  file_url?: string;
}

export const ProjectsDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'finished'>('all');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user, filter]);

  const fetchProjects = async () => {
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch projects');
    }
    setLoading(false);
  };

  const deleteProject = async (projectId: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', projectId);
              
              if (error) throw error;
              fetchProjects();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete project');
            }
          }
        }
      ]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lyric': return '🎵';
      case 'backtrack': return '🎼';
      case 'collaboration': return '👥';
      default: return '📄';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return '#ffa500';
      case 'finished': return '#00ff00';
      case 'exported': return '#0099ff';
      default: return '#ffffff';
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading projects...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Projects</Text>
      
      <View style={styles.filterContainer}>
        {['all', 'draft', 'finished'].map((filterType) => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter
            ]}
            onPress={() => setFilter(filterType as any)}
          >
            <Text style={[
              styles.filterText,
              filter === filterType && styles.activeFilterText
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.projectsList}>
        {projects.length === 0 ? (
          <Text style={styles.emptyText}>No projects found. Start creating!</Text>
        ) : (
          projects.map((project) => (
            <View key={project.id} style={styles.projectCard}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectIcon}>{getTypeIcon(project.type)}</Text>
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectType}>{project.type.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                  <Text style={styles.statusText}>{project.status}</Text>
                </View>
              </View>
              
              <Text style={styles.projectDate}>
                Updated: {new Date(project.updated_at).toLocaleDateString()}
              </Text>
              
              <View style={styles.projectActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Open</Text>
                </TouchableOpacity>
                {project.file_url && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Download</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => deleteProject(project.id)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f23', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  loadingText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  filterContainer: { flexDirection: 'row', marginBottom: 20 },
  filterButton: { flex: 1, padding: 10, backgroundColor: '#1a1a2e', marginHorizontal: 5, borderRadius: 8 },
  activeFilter: { backgroundColor: '#e94560' },
  filterText: { color: '#fff', textAlign: 'center' },
  activeFilterText: { fontWeight: 'bold' },
  projectsList: { flex: 1 },
  emptyText: { color: '#888', textAlign: 'center', fontSize: 16, marginTop: 50 },
  projectCard: { backgroundColor: '#1a1a2e', padding: 15, borderRadius: 10, marginBottom: 15 },
  projectHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  projectIcon: { fontSize: 24, marginRight: 10 },
  projectInfo: { flex: 1 },
  projectTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  projectType: { color: '#888', fontSize: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  projectDate: { color: '#888', fontSize: 12, marginBottom: 10 },
  projectActions: { flexDirection: 'row', justifyContent: 'space-around' },
  actionButton: { backgroundColor: '#0f3460', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  deleteButton: { backgroundColor: '#dc3545' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});