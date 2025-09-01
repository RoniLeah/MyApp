import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Modal } from 'react-native';
import { useAuth } from './AuthProvider';
import { useProjectManager } from './ProjectManager';
import { CollaborativeEditor } from './CollaborativeEditor';
interface LyricGeneratorProps {
  visible: boolean;
  onClose: () => void;
  userTier: 'free' | 'pro' | 'elite';
}

export const LyricGenerator: React.FC<LyricGeneratorProps> = ({ visible, onClose, userTier }) => {
  const [theme, setTheme] = useState('');
  const [mood, setMood] = useState('upbeat');
  const [genre, setGenre] = useState('pop');
  const [rhymeScheme, setRhymeScheme] = useState('ABAB');
  const [complexity, setComplexity] = useState('simple');
  const [language, setLanguage] = useState('english');
  const [verseCount, setVerseCount] = useState(2);
  const [generatedLyrics, setGeneratedLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCollaborativeEditor, setShowCollaborativeEditor] = useState(false);
  const { user } = useAuth();
  const { saveProject } = useProjectManager();

  const moods = ['upbeat', 'melancholy', 'romantic', 'energetic', 'chill', 'dramatic', 'nostalgic', 'rebellious'];
  const genres = ['pop', 'rock', 'hip-hop', 'country', 'r&b', 'electronic', 'folk', 'jazz', 'blues', 'reggae'];
  const rhymeSchemes = userTier === 'free' ? ['ABAB'] : ['ABAB', 'AABB', 'ABCB', 'AAAA', 'Free Verse'];
  const languages = userTier === 'free' ? ['english'] : ['english', 'spanish', 'french', 'german', 'italian'];
  const complexityLevels = userTier === 'free' ? ['simple'] : ['simple', 'intermediate', 'advanced', 'poetic'];

  const generateLyrics = async () => {
    if (!theme.trim()) {
      Alert.alert('Error', 'Please enter a theme');
      return;
    }

    if (userTier === 'free' && generatedLyrics) {
      Alert.alert('Upgrade Required', 'Free users can only generate 1 set of lyrics per session. Upgrade to Pro for more!');
      return;
    }

    setIsGenerating(true);
    try {
      const prompt = userTier === 'free' 
        ? `Write simple song lyrics about "${theme}" in ${mood} ${genre} style with ABAB rhyme scheme, 2 verses and chorus`
        : `Write ${complexity} song lyrics about "${theme}" in ${mood} ${genre} style with ${rhymeScheme} rhyme scheme, ${verseCount} verses and chorus in ${language}. ${userTier === 'elite' ? 'Include bridge and outro sections with sophisticated wordplay.' : ''}`;

      // Simulate AI generation
      const sampleLyrics = `[Verse 1]\nIn the ${mood} world of ${theme}\nWhere ${genre} rhythms flow\nEvery line tells a story\nOf the dreams we used to know\n\n[Chorus]\n${theme} is calling out my name\nNothing will ever be the same\nIn this ${mood} ${genre} refrain\nWe'll dance through joy and pain\n\n[Verse 2]\nThrough the melodies we're weaving\nEvery note a stepping stone\nIn this ${complexity} creation\nWe have found our way back home`;
      
      setGeneratedLyrics(sampleLyrics);
      
      // Auto-save project if user is logged in
      if (user) {
        await saveProject({
          title: `Lyrics: ${theme}`,
          type: 'lyric',
          content: { theme, mood, genre, lyrics: sampleLyrics },
          status: 'draft'
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate lyrics');
    } finally {
      setIsGenerating(false);
    }
  };

  const getFeatureText = () => {
    if (userTier === 'free') return 'Basic lyrics generation (1 per session)';
    if (userTier === 'pro') return 'Advanced lyrics with custom options';
    return 'Elite lyrics with multilingual support & collaborative editing';
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>AI Lyric Generator</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.subtitle}>{getFeatureText()}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Theme/Topic *</Text>
            <TextInput
              style={styles.input}
              value={theme}
              onChangeText={setTheme}
              placeholder="Enter song theme (e.g., love, adventure, dreams)"
              placeholderTextColor="#666"
            />

            <Text style={styles.label}>Mood</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              {moods.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.option, mood === m && styles.selectedOption]}
                  onPress={() => setMood(m)}
                >
                  <Text style={[styles.optionText, mood === m && styles.selectedText]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Genre</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              {genres.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.option, genre === g && styles.selectedOption]}
                  onPress={() => setGenre(g)}
                >
                  <Text style={[styles.optionText, genre === g && styles.selectedText]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {userTier !== 'free' && (
              <>
                <Text style={styles.label}>Rhyme Scheme</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
                  {rhymeSchemes.map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.option, rhymeScheme === r && styles.selectedOption]}
                      onPress={() => setRhymeScheme(r)}
                    >
                      <Text style={[styles.optionText, rhymeScheme === r && styles.selectedText]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.label}>Complexity</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
                  {complexityLevels.map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[styles.option, complexity === c && styles.selectedOption]}
                      onPress={() => setComplexity(c)}
                    >
                      <Text style={[styles.optionText, complexity === c && styles.selectedText]}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {userTier === 'elite' && (
              <>
                <Text style={styles.label}>Language</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
                  {languages.map((l) => (
                    <TouchableOpacity
                      key={l}
                      style={[styles.option, language === l && styles.selectedOption]}
                      onPress={() => setLanguage(l)}
                    >
                      <Text style={[styles.optionText, language === l && styles.selectedText]}>{l}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            <TouchableOpacity 
              style={[styles.generateButton, isGenerating && styles.disabledButton]} 
              onPress={generateLyrics}
              disabled={isGenerating}
            >
              <Text style={styles.generateButtonText}>
                {isGenerating ? 'Generating...' : 'Generate Lyrics'}
              </Text>
            </TouchableOpacity>
          </View>

          {generatedLyrics && (
            <View style={styles.result}>
              <Text style={styles.resultTitle}>Generated Lyrics:</Text>
              <Text style={styles.lyrics}>{generatedLyrics}</Text>
              
              {userTier === 'elite' && (
                <TouchableOpacity 
                  style={styles.collaborateButton}
                  onPress={() => setShowCollaborativeEditor(true)}
                >
                  <Text style={styles.collaborateButtonText}>🎭 Open Collaborative Editor</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {showCollaborativeEditor && (
            <CollaborativeEditor
              lyrics={generatedLyrics}
              onLyricsChange={setGeneratedLyrics}
              userTier={userTier}
            />
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 24 },
  subtitle: { fontSize: 14, color: '#9ca3af', textAlign: 'center' },
  form: { gap: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#a855f7', marginBottom: 8 },
  input: { backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', padding: 12, borderRadius: 8, fontSize: 16 },
  optionScroll: { marginBottom: 16 },
  option: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 8 },
  selectedOption: { backgroundColor: '#a855f7' },
  optionText: { color: '#9ca3af', fontSize: 14, fontWeight: '500', textTransform: 'capitalize' },
  selectedText: { color: '#ffffff' },
  generateButton: { backgroundColor: '#6366f1', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#4b5563' },
  generateButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600' },
  result: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, padding: 20, marginTop: 20 },
  resultTitle: { fontSize: 18, fontWeight: '600', color: '#a855f7', marginBottom: 12 },
  lyrics: { color: '#ffffff', fontSize: 16, lineHeight: 24 },
  collaborateButton: { backgroundColor: '#a855f7', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  collaborateButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});