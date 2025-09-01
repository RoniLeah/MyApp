import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { supabase } from '@/app/lib/supabase';

interface User {
  id: string;
  email: string;
  subscription_tier: string;
  created_at: string;
  last_active: string;
  total_spent: number;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-dashboard', {
        body: { action: 'get_users' }
      });
      if (data?.users) setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserTier = async (userId: string, newTier: string) => {
    try {
      const { error } = await supabase.functions.invoke('admin-dashboard', {
        body: { action: 'update_user_tier', userId, tier: newTier }
      });
      if (!error) {
        Alert.alert('Success', 'User tier updated');
        fetchUsers();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#0a0a0a' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 }}>
        User Management
      </Text>
      
      <TextInput
        style={{
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#333'
        }}
        placeholder="Search users by email..."
        placeholderTextColor="#666"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView>
        {filteredUsers.map((user) => (
          <View key={user.id} style={{
            backgroundColor: '#1a1a1a',
            padding: 15,
            borderRadius: 10,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: '#333'
          }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
              {user.email}
            </Text>
            <Text style={{ color: '#888', marginTop: 5 }}>
              Tier: {user.subscription_tier} | Spent: ${user.total_spent}
            </Text>
            <Text style={{ color: '#888' }}>
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </Text>
            
            <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
              {['Free', 'Pro', 'Pro Elite'].map((tier) => (
                <TouchableOpacity
                  key={tier}
                  onPress={() => updateUserTier(user.id, tier)}
                  style={{
                    backgroundColor: user.subscription_tier === tier ? '#6366f1' : '#333',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>{tier}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}