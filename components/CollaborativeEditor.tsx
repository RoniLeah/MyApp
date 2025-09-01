import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';

interface CollaborativeEditorProps {
  lyrics: string;
  onLyricsChange: (lyrics: string) => void;
  userTier: string;
}

export default function CollaborativeEditor({ lyrics, onLyricsChange, userTier }: CollaborativeEditorProps) {
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'Sarah Chen', avatar: '👩‍🎤', status: 'online', lastEdit: '2 min ago' },
    { id: 2, name: 'Mike Johnson', avatar: '🎸', status: 'editing', lastEdit: 'now' },
  ]);
  const [comments, setComments] = useState([
    { id: 1, user: 'Sarah Chen', text: 'Love this chorus!', line: 4, timestamp: '5 min ago' },
    { id: 2, user: 'Mike Johnson', text: 'Maybe change "heart" to "soul"?', line: 8, timestamp: '2 min ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  if (userTier !== 'elite') {
    return (
      <View style={styles.upgradePrompt}>
        <Text style={styles.upgradeTitle}>🎭 Collaborative Editing</Text>
        <Text style={styles.upgradeText}>Real-time collaboration with other songwriters</Text>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade to Elite</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.editor}>
      <View style={styles.header}>
        <Text style={styles.title}>Collaborative Editor</Text>
        <View style={styles.collaboratorList}>
          {collaborators.map((collab) => (
            <View key={collab.id} style={styles.collaborator}>
              <Text style={styles.avatar}>{collab.avatar}</Text>
              <View style={[styles.statusDot, { backgroundColor: collab.status === 'online' ? '#22c55e' : '#f59e0b' }]} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.editorArea}>
        <TextInput
          style={styles.lyricsInput}
          value={lyrics}
          onChangeText={onLyricsChange}
          multiline
          placeholder="Start writing lyrics..."
          placeholderTextColor="#9ca3af"
        />
        
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>Comments</Text>
          <ScrollView style={styles.commentsList}>
            {comments.map((comment) => (
              <View key={comment.id} style={styles.comment}>
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
                <Text style={styles.commentTime}>{comment.timestamp}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.addComment}>
            <TextInput
              style={styles.commentInput}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Add comment..."
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.commentButton}>
              <Text style={styles.commentButtonText}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  editor: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  collaboratorList: {
    flexDirection: 'row',
    gap: 8,
  },
  collaborator: {
    position: 'relative',
  },
  avatar: {
    fontSize: 24,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  editorArea: {
    flexDirection: 'row',
    gap: 16,
  },
  lyricsInput: {
    flex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    minHeight: 300,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
  sidebar: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: 12,
  },
  commentsList: {
    flex: 1,
    marginBottom: 12,
  },
  comment: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  commentUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 10,
    color: '#9ca3af',
  },
  addComment: {
    flexDirection: 'row',
    gap: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
  },
  commentButton: {
    backgroundColor: '#6366f1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentButtonText: {
    fontSize: 14,
  },
  upgradePrompt: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    padding: 20,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a855f7',
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  upgradeButton: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});