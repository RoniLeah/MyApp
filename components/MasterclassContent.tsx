import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MasterclassContentProps {
  userTier: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
}

const MasterclassContent: React.FC<MasterclassContentProps> = ({ userTier }) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeCategory, setActiveCategory] = useState('Getting Started');
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'StudioForgeAI Basics',
      duration: '12 min',
      description: 'Learn the fundamentals of StudioForgeAI interface and core features.',
      category: 'Getting Started',
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: '2',
      title: 'AI Voice Generation Mastery',
      duration: '18 min',
      description: 'Master AI voice synthesis with advanced techniques and best practices.',
      category: 'AI Features',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: '3',
      title: 'Professional Mixing Techniques',
      duration: '25 min',
      description: 'Learn professional mixing and mastering using our advanced tools.',
      category: 'Production',
      difficulty: 'Advanced',
      completed: false
    },
    {
      id: '4',
      title: 'Stem Separation & Editing',
      duration: '15 min',
      description: 'Master stem separation and advanced audio editing techniques.',
      category: 'Production',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: '5',
      title: 'Collaboration Workflows',
      duration: '20 min',
      description: 'Optimize your collaborative music production workflows.',
      category: 'Collaboration',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: '6',
      title: 'Export & Distribution',
      duration: '14 min',
      description: 'Learn professional export settings and distribution strategies.',
      category: 'Publishing',
      difficulty: 'Beginner',
      completed: false
    }
  ];

  const categories = ['Getting Started', 'AI Features', 'Production', 'Collaboration', 'Publishing'];

  const filteredLessons = lessons.filter(lesson => lesson.category === activeCategory);

  const markComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  if (!['Pro', 'Enterprise', 'Owner'].includes(userTier)) {
    return (
      <View style={styles.lockedContainer}>
        <Ionicons name="lock-closed" size={48} color="#666" />
        <Text style={styles.lockedTitle}>Pro Masterclass</Text>
        <Text style={styles.lockedText}>Upgrade to Pro to access exclusive masterclass content</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pro Masterclass</Text>
      <Text style={styles.subtitle}>Master StudioForgeAI with expert tutorials</Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryTab, activeCategory === category && styles.activeCategoryTab]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.lessonsContainer}>
        {filteredLessons.map(lesson => (
          <TouchableOpacity
            key={lesson.id}
            style={styles.lessonCard}
            onPress={() => setSelectedLesson(lesson)}
          >
            <View style={styles.lessonHeader}>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <View style={styles.lessonMeta}>
                <View style={[styles.difficultyBadge, 
                  lesson.difficulty === 'Beginner' && styles.beginnerBadge,
                  lesson.difficulty === 'Intermediate' && styles.intermediateBadge,
                  lesson.difficulty === 'Advanced' && styles.advancedBadge
                ]}>
                  <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                </View>
                {completedLessons.has(lesson.id) && (
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                )}
              </View>
            </View>
            <Text style={styles.lessonDescription}>{lesson.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={!!selectedLesson} animationType="slide" presentationStyle="pageSheet">
        {selectedLesson && (
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setSelectedLesson(null)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedLesson.title}</Text>
              <TouchableOpacity onPress={() => markComplete(selectedLesson.id)}>
                <Ionicons name="checkmark" size={24} color="#4CAF50" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.videoPlaceholder}>
                <Ionicons name="play-circle" size={64} color="#fff" />
                <Text style={styles.videoText}>Video Tutorial</Text>
                <Text style={styles.videoDuration}>{selectedLesson.duration}</Text>
              </View>
              
              <Text style={styles.lessonFullDescription}>{selectedLesson.description}</Text>
              
              <View style={styles.keyPoints}>
                <Text style={styles.keyPointsTitle}>Key Learning Points:</Text>
                <Text style={styles.keyPoint}>• Master the core interface and navigation</Text>
                <Text style={styles.keyPoint}>• Learn professional production techniques</Text>
                <Text style={styles.keyPoint}>• Understand advanced AI features</Text>
                <Text style={styles.keyPoint}>• Optimize your workflow efficiency</Text>
              </View>
            </ScrollView>
          </View>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categoryScroll: {
    marginBottom: 20,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeCategoryTab: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
  },
  lessonsContainer: {
    flex: 1,
  },
  lessonCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  lessonDuration: {
    fontSize: 14,
    color: '#666',
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  beginnerBadge: {
    backgroundColor: '#E8F5E8',
  },
  intermediateBadge: {
    backgroundColor: '#FFF3E0',
  },
  advancedBadge: {
    backgroundColor: '#FFEBEE',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  lockedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  lockedText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  videoPlaceholder: {
    backgroundColor: '#333',
    borderRadius: 12,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  videoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  videoDuration: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  lessonFullDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  keyPoints: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
  },
  keyPointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  keyPoint: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default MasterclassContent;