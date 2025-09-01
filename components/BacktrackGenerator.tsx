import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Slider } from 'react-native';

interface BacktrackGeneratorProps {
  userTier: 'free' | 'pro' | 'elite';
}

export default function BacktrackGenerator({ userTier }: BacktrackGeneratorProps) {
  const [genre, setGenre] = useState('pop');
  const [mood, setMood] = useState('upbeat');
  const [style, setStyle] = useState('modern');
  const [tempo, setTempo] = useState(120);
  const [key, setKey] = useState('C');
  const [duration, setDuration] = useState(180);
  const [instruments, setInstruments] = useState<string[]>(['piano', 'drums']);
  const [complexity, setComplexity] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);

  const genres = userTier === 'free' ? ['pop', 'rock', 'hip-hop'] : 
    ['pop', 'rock', 'hip-hop', 'country', 'r&b', 'electronic', 'folk', 'jazz', 'blues', 'reggae', 'latin', 'classical'];
  
  const moods = userTier === 'free' ? ['upbeat', 'chill', 'dramatic'] :
    ['upbeat', 'melancholy', 'romantic', 'energetic', 'chill', 'dramatic', 'nostalgic', 'mysterious', 'triumphant'];
  
  const styleOptions = userTier === 'free' ? ['modern'] : 
    ['modern', 'vintage', 'acoustic', 'orchestral', 'minimalist', 'experimental', 'cinematic'];
  
  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const availableInstruments = userTier === 'free' ? ['piano', 'drums', 'guitar', 'bass'] :
    ['piano', 'drums', 'guitar', 'bass', 'violin', 'saxophone', 'trumpet', 'flute', 'synth', 'strings', 'brass', 'choir'];

  const complexityLevels = userTier === 'free' ? ['simple'] : ['simple', 'medium', 'complex', 'professional'];

  const getMaxGenerations = () => {
    if (userTier === 'free') return 2;
    if (userTier === 'pro') return 20;
    return -1; // unlimited for elite
  };

  const toggleInstrument = (instrument: string) => {
    if (userTier === 'free' && instruments.length >= 3 && !instruments.includes(instrument)) {
      Alert.alert('Upgrade Required', 'Free users can select up to 3 instruments. Upgrade for unlimited instrument selection!');
      return;
    }
    
    setInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const generateBacktrack = async () => {
    const maxGens = getMaxGenerations();
    if (maxGens !== -1 && generationCount >= maxGens) {
      Alert.alert('Limit Reached', `${userTier === 'free' ? 'Free' : 'Pro'} users can generate ${maxGens} backtracks per session. ${userTier === 'free' ? 'Upgrade to Pro for 20 generations or Elite for unlimited!' : 'Upgrade to Elite for unlimited generations!'}`);
      return;
    }

    setIsGenerating(true);
    try {
      // Simulate backtrack generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      Alert.alert('Success!', `Generated ${genre} backtrack in ${key} key at ${tempo} BPM with ${instruments.join(', ')}. ${userTier === 'elite' ? 'Elite quality with studio mastering applied!' : userTier === 'pro' ? 'Pro quality with enhanced mixing!' : 'Basic quality generated!'}`);
      
      setGenerationCount(prev => prev + 1);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate backtrack. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getFeatureText = () => {
    if (userTier === 'free') return `Basic backtracks (${generationCount}/${getMaxGenerations()} used)`;
    if (userTier === 'pro') return `Pro backtracks with advanced options (${generationCount}/${getMaxGenerations()} used)`;
    return `Elite backtracks with unlimited generations (${generationCount} generated)`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Backtrack Generator</Text>
        <Text style={styles.subtitle}>{getFeatureText()}</Text>
      </View>

      <View style={styles.form}>
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

        {userTier !== 'free' && (
          <>
            <Text style={styles.label}>Style</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
              {styleOptions.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.option, style === s && styles.selectedOption]}
                  onPress={() => setStyle(s)}
                >
                  <Text style={[styles.optionText, style === s && styles.selectedText]}>{s}</Text>
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

        <Text style={styles.label}>Tempo: {tempo} BPM</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>60</Text>
          <Slider
            style={styles.slider}
            minimumValue={60}
            maximumValue={userTier === 'free' ? 140 : 200}
            value={tempo}
            onValueChange={setTempo}
            step={5}
            minimumTrackTintColor="#a855f7"
            maximumTrackTintColor="#4b5563"
            thumbStyle={{ backgroundColor: '#a855f7' }}
          />
          <Text style={styles.sliderLabel}>{userTier === 'free' ? '140' : '200'}</Text>
        </View>

        <Text style={styles.label}>Key</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionScroll}>
          {keys.map((k) => (
            <TouchableOpacity
              key={k}
              style={[styles.option, key === k && styles.selectedOption]}
              onPress={() => setKey(k)}
            >
              <Text style={[styles.optionText, key === k && styles.selectedText]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Instruments {userTier === 'free' && `(${instruments.length}/3)`}</Text>
        <View style={styles.instrumentGrid}>
          {availableInstruments.map((instrument) => (
            <TouchableOpacity
              key={instrument}
              style={[styles.instrumentOption, instruments.includes(instrument) && styles.selectedInstrument]}
              onPress={() => toggleInstrument(instrument)}
            >
              <Text style={[styles.instrumentText, instruments.includes(instrument) && styles.selectedInstrumentText]}>
                {instrument}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {userTier !== 'free' && (
          <>
            <Text style={styles.label}>Duration: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</Text>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>1:00</Text>
              <Slider
                style={styles.slider}
                minimumValue={60}
                maximumValue={userTier === 'elite' ? 600 : 300}
                value={duration}
                onValueChange={setDuration}
                step={15}
                minimumTrackTintColor="#a855f7"
                maximumTrackTintColor="#4b5563"
                thumbStyle={{ backgroundColor: '#a855f7' }}
              />
              <Text style={styles.sliderLabel}>{userTier === 'elite' ? '10:00' : '5:00'}</Text>
            </View>
          </>
        )}

        <TouchableOpacity 
          style={[styles.generateButton, isGenerating && styles.disabledButton]} 
          onPress={generateBacktrack}
          disabled={isGenerating}
        >
          <Text style={styles.generateButtonText}>
            {isGenerating ? 'Generating...' : 'Generate Backtrack'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f23', padding: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9ca3af', textAlign: 'center' },
  form: { gap: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#a855f7', marginBottom: 8 },
  optionScroll: { marginBottom: 16 },
  option: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 8 },
  selectedOption: { backgroundColor: '#a855f7' },
  optionText: { color: '#9ca3af', fontSize: 14, fontWeight: '500', textTransform: 'capitalize' },
  selectedText: { color: '#ffffff' },
  sliderContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  sliderLabel: { color: '#9ca3af', fontSize: 12, minWidth: 32 },
  slider: { flex: 1, height: 40 },
  instrumentGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  instrumentOption: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  selectedInstrument: { backgroundColor: '#a855f7' },
  instrumentText: { color: '#9ca3af', fontSize: 14, textTransform: 'capitalize' },
  selectedInstrumentText: { color: '#ffffff' },
  generateButton: { backgroundColor: '#6366f1', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  disabledButton: { backgroundColor: '#4b5563' },
  generateButtonText: { color: '#ffffff', fontSize: 18, fontWeight: '600' }
});