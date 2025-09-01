import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  sent_count: number;
  open_rate: number;
  click_rate: number;
  created_at: string;
  status: string;
}

export default function EmailMarketing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    target_tier: 'All'
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: { action: 'get_campaigns' }
      });
      if (data?.campaigns) setCampaigns(data.campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const createCampaign = async () => {
    if (!newCampaign.name || !newCampaign.subject || !newCampaign.content) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('email-marketing', {
        body: { action: 'create_campaign', campaign: newCampaign }
      });
      
      if (!error) {
        Alert.alert('Success', 'Campaign created successfully');
        setNewCampaign({ name: '', subject: '', content: '', target_tier: 'All' });
        fetchCampaigns();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create campaign');
    }
  };

  const sendCampaign = async (campaignId: string) => {
    try {
      const { error } = await supabase.functions.invoke('email-marketing', {
        body: { action: 'send_campaign', campaignId }
      });
      
      if (!error) {
        Alert.alert('Success', 'Campaign sent successfully');
        fetchCampaigns();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send campaign');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0a0a0a' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
        Email Marketing
      </Text>

      <ScrollView>
        <View style={{
          backgroundColor: '#1a1a1a',
          padding: 20,
          borderRadius: 12,
          marginBottom: 20
        }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
            Create New Campaign
          </Text>
          
          <TextInput
            style={{
              backgroundColor: '#333',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              marginBottom: 10
            }}
            placeholder="Campaign Name"
            placeholderTextColor="#666"
            value={newCampaign.name}
            onChangeText={(text) => setNewCampaign({...newCampaign, name: text})}
          />

          <TextInput
            style={{
              backgroundColor: '#333',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              marginBottom: 10
            }}
            placeholder="Email Subject"
            placeholderTextColor="#666"
            value={newCampaign.subject}
            onChangeText={(text) => setNewCampaign({...newCampaign, subject: text})}
          />

          <TextInput
            style={{
              backgroundColor: '#333',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              marginBottom: 15,
              height: 100,
              textAlignVertical: 'top'
            }}
            placeholder="Email Content"
            placeholderTextColor="#666"
            multiline
            value={newCampaign.content}
            onChangeText={(text) => setNewCampaign({...newCampaign, content: text})}
          />

          <TouchableOpacity
            onPress={createCampaign}
            style={{
              backgroundColor: '#6366f1',
              padding: 12,
              borderRadius: 8,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Create Campaign</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 }}>
          Campaign History
        </Text>

        {campaigns.map((campaign) => (
          <View key={campaign.id} style={{
            backgroundColor: '#1a1a1a',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10
          }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              {campaign.name}
            </Text>
            <Text style={{ color: '#888', marginTop: 5 }}>
              Subject: {campaign.subject}
            </Text>
            <Text style={{ color: '#888' }}>
              Sent: {campaign.sent_count} | Opens: {campaign.open_rate}% | Clicks: {campaign.click_rate}%
            </Text>
            
            {campaign.status === 'draft' && (
              <TouchableOpacity
                onPress={() => sendCampaign(campaign.id)}
                style={{
                  backgroundColor: '#10b981',
                  padding: 8,
                  borderRadius: 6,
                  marginTop: 10,
                  alignSelf: 'flex-start'
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>Send Campaign</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}