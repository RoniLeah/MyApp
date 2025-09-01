import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Alert, Image } from 'react-native';
import { supabase } from '@/app/lib/supabase';
import { useUsageTracker } from './UsageTracker';

interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

interface KaraokeStudioProps {
  visible: boolean;
  onClose: () => void;
  songTitle: string;
}

export default function KaraokeStudio({ visible, onClose, songTitle }: KaraokeStudioProps) {
  const { canCreateVideo, incrementVideoUsage, usage, getUsageLimits } = useUsageTracker();
  
  const backgroundLibrary = [
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756130849417_81e1d221.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756130852105_8afa4c0e.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756130854038_2587abc4.webp',
    'https://d64gsuwffb70l.cloudfront.net/68ac5998330e0ffbf5aed9fd_1756130855992_fc00badd.webp'
  ];

  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLyric, setCurrentLyric] = useState('');
  const [startTime, setStartTime] = useState('0');
  const [endTime, setEndTime] = useState('0');
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addLyricLine = () => {
    if (currentLyric.trim()) {
      const newLine: LyricLine = {
        text: currentLyric,
        startTime: parseFloat(startTime),
        endTime: parseFloat(endTime)
      };
      setLyrics([...lyrics, newLine]);
      setCurrentLyric('');
      setStartTime('0');
      setEndTime('0');
    }
  };

  const generateKaraoke = async () => {
    if (!canCreateVideo()) {
      const limits = getUsageLimits();
      Alert.alert(
        'Limit Reached', 
        `You've reached your video limit (${usage.videosCreated}/${limits.videos}). Please upgrade to create more videos.`
      );
      return;
    }

    if (lyrics.length === 0) {
      Alert.alert('Error', 'Please add some lyrics first!');
      return;
    }

    if (!selectedBackground) {
      Alert.alert('Error', 'Please select a background!');
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('karaoke-generator', {
        body: { songTitle, lyrics, backgroundUrl: selectedBackground, userId: 'user123' }
      });

      if (error) throw error;
      await incrementVideoUsage();
      Alert.alert('Success', 'Karaoke video generation started!');
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to generate karaoke video.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#333' }}>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Karaoke Studio</Text>
          <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#333', padding: 10, borderRadius: 8 }}>
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1, padding: 20 }}>
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 10 }}>Song: {songTitle}</Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Background</Text>
            <TouchableOpacity 
              onPress={() => setShowLibrary(true)}
              style={{ backgroundColor: '#6366f1', padding: 15, borderRadius: 8, marginBottom: 10 }}
            >
              <Text style={{ color: '#fff', textAlign: 'center' }}>Choose from Library</Text>
            </TouchableOpacity>
            
            {selectedBackground && (
              <Image source={{ uri: selectedBackground }} style={{ width: 200, height: 120, borderRadius: 8 }} />
            )}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Add Lyrics</Text>
            <TextInput
              value={currentLyric}
              onChangeText={setCurrentLyric}
              placeholder="Enter lyric line..."
              placeholderTextColor="#666"
              style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10 }}
            />
            
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
              <TextInput
                value={startTime}
                onChangeText={setStartTime}
                placeholder="Start (s)"
                placeholderTextColor="#666"
                style={{ flex: 1, backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8 }}
              />
              <TextInput
                value={endTime}
                onChangeText={setEndTime}
                placeholder="End (s)"
                placeholderTextColor="#666"
                style={{ flex: 1, backgroundColor: '#1a1a1a', color: '#fff', padding: 12, borderRadius: 8 }}
              />
            </View>
            
            <TouchableOpacity onPress={addLyricLine} style={{ backgroundColor: '#10b981', padding: 12, borderRadius: 8 }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>Add Line</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Lyrics Timeline</Text>
            {lyrics.map((line, index) => (
              <View key={index} style={{ backgroundColor: '#1a1a1a', padding: 12, borderRadius: 8, marginBottom: 8 }}>
                <Text style={{ color: '#fff' }}>{line.text}</Text>
                <Text style={{ color: '#666', fontSize: 12 }}>{line.startTime}s - {line.endTime}s</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            onPress={generateKaraoke}
            disabled={isGenerating}
            style={{ 
              backgroundColor: isGenerating ? '#666' : '#f59e0b', 
              padding: 15, 
              borderRadius: 8, 
              marginBottom: 20 
            }}
          >
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
              {isGenerating ? 'Generating...' : 'Generate Karaoke Video'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Modal visible={showLibrary} animationType="slide" transparent>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 }}>
            <View style={{ backgroundColor: '#1a1a1a', borderRadius: 12, padding: 20, maxHeight: '80%' }}>
              <Text style={{ color: '#fff', fontSize: 18, marginBottom: 15 }}>Choose Background</Text>
              <ScrollView>
                {backgroundLibrary.map((bg, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedBackground(bg);
                      setShowLibrary(false);
                    }}
                    style={{ marginBottom: 10 }}
                  >
                    <Image source={{ uri: bg }} style={{ width: '100%', height: 120, borderRadius: 8 }} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity 
                onPress={() => setShowLibrary(false)}
                style={{ backgroundColor: '#333', padding: 12, borderRadius: 8, marginTop: 15 }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}