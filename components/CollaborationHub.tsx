import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const collaborators = [
    { id: 1, name: 'Alex Chen', role: 'Producer', status: 'online', avatar: '👨‍🎤' },
    { id: 2, name: 'Maya Rodriguez', role: 'Vocalist', status: 'recording', avatar: '👩‍🎤' },
    { id: 3, name: 'Jordan Kim', role: 'Mixer', status: 'offline', avatar: '👨‍💻' }
  ];

  const projects = [
    { id: 1, name: 'Summer Vibes', collaborators: 3, status: 'active', progress: 75 },
    { id: 2, name: 'Dark Synthwave', collaborators: 2, status: 'review', progress: 90 },
    { id: 3, name: 'Acoustic Dreams', collaborators: 4, status: 'mixing', progress: 60 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collaboration Hub</Text>
      <Text style={styles.subtitle}>Work together in real-time with artists worldwide</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'projects' && styles.activeTab]}
          onPress={() => setActiveTab('projects')}
        >
          <Text style={[styles.tabText, activeTab === 'projects' && styles.activeTabText]}>
            Projects
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'team' && styles.activeTab]}
          onPress={() => setActiveTab('team')}
        >
          <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>
            Team
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'projects' ? (
        <ScrollView style={styles.content}>
          {projects.map((project) => (
            <View
              key={project.id}
              style={[styles.projectCard, { backgroundColor: '#1a1a2e' }]}
            >
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <View style={[styles.statusBadge, { backgroundColor: project.status === 'active' ? '#10b981' : project.status === 'review' ? '#f59e0b' : '#8b5cf6' }]}>
                  <Text style={styles.statusText}>{project.status}</Text>
                </View>
              </View>
              <Text style={styles.projectInfo}>{project.collaborators} collaborators</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
                </View>
                <Text style={styles.progressText}>{project.progress}%</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content}>
          {collaborators.map((collaborator) => (
            <View key={collaborator.id} style={styles.collaboratorCard}>
              <Text style={styles.avatar}>{collaborator.avatar}</Text>
              <View style={styles.collaboratorInfo}>
                <Text style={styles.collaboratorName}>{collaborator.name}</Text>
                <Text style={styles.collaboratorRole}>{collaborator.role}</Text>
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: collaborator.status === 'online' ? '#10b981' : collaborator.status === 'recording' ? '#f59e0b' : '#6b7280' }]} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f23',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#8b5cf6',
  },
  tabText: {
    color: '#9ca3af',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    maxHeight: 400,
  },
  projectCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectInfo: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8b5cf6',
    borderRadius: 3,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  collaboratorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  collaboratorInfo: {
    flex: 1,
  },
  collaboratorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  collaboratorRole: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default CollaborationHub;