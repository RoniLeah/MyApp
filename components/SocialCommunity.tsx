import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const SocialCommunity = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      user: 'Alex Chen',
      avatar: '👨‍🎤',
      track: 'Neon Dreams',
      genre: 'Synthwave',
      likes: 247,
      comments: 18,
      timeAgo: '2h ago'
    },
    {
      id: 2,
      user: 'Maya Rodriguez',
      avatar: '👩‍🎤',
      track: 'Acoustic Sunrise',
      genre: 'Folk',
      likes: 189,
      comments: 12,
      timeAgo: '4h ago'
    },
    {
      id: 3,
      user: 'Jordan Kim',
      avatar: '👨‍💻',
      track: 'Bass Drop Madness',
      genre: 'EDM',
      likes: 312,
      comments: 25,
      timeAgo: '6h ago'
    }
  ];

  const trending = [
    { tag: '#synthwave', posts: 1247 },
    { tag: '#aimusic', posts: 892 },
    { tag: '#collaboration', posts: 654 },
    { tag: '#remix', posts: 543 }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Hub</Text>
      <Text style={styles.subtitle}>Connect, share, and discover amazing music</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}
        >
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
            Trending
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'feed' ? (
        <ScrollView style={styles.content}>
          {posts.map((post) => (
            <View
              key={post.id}
              style={[styles.postCard, { backgroundColor: '#1a1a2e' }]}
            >
              <View style={styles.postHeader}>
                <Text style={styles.avatar}>{post.avatar}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{post.user}</Text>
                  <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                </View>
              </View>
              
              <Text style={styles.trackTitle}>{post.track}</Text>
              <View style={styles.genreTag}>
                <Text style={styles.genreText}>{post.genre}</Text>
              </View>
              
              <View style={styles.waveform}>
                {[...Array(20)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.waveBar,
                      { height: Math.random() * 30 + 10 }
                    ]}
                  />
                ))}
              </View>
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>❤️</Text>
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>💬</Text>
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionIcon}>🔄</Text>
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Trending Hashtags</Text>
          {trending.map((item, index) => (
            <TouchableOpacity key={index} style={styles.trendingItem}>
              <Text style={styles.hashtag}>{item.tag}</Text>
              <Text style={styles.postCount}>{item.posts} posts</Text>
            </TouchableOpacity>
          ))}
          
          <Text style={styles.sectionTitle}>Featured Artists</Text>
          <View style={styles.artistGrid}>
            {['👨‍🎤', '👩‍🎤', '👨‍💻', '👩‍💻'].map((avatar, index) => (
              <TouchableOpacity key={index} style={styles.artistCard}>
                <Text style={styles.artistAvatar}>{avatar}</Text>
                <Text style={styles.artistName}>Artist {index + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    maxHeight: 500,
  },
  postCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 32,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeAgo: {
    fontSize: 12,
    color: '#9ca3af',
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  genreTag: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  genreText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 40,
    marginBottom: 16,
    gap: 2,
  },
  waveBar: {
    flex: 1,
    backgroundColor: '#8b5cf6',
    borderRadius: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  hashtag: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8b5cf6',
  },
  postCount: {
    fontSize: 14,
    color: '#9ca3af',
  },
  artistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  artistCard: {
    width: '48%',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  artistAvatar: {
    fontSize: 32,
    marginBottom: 8,
  },
  artistName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SocialCommunity;