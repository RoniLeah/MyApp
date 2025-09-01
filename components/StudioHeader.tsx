import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './RealAuthProvider';


interface StudioHeaderProps {
  user: any;
  onLogin: () => void;
  onNavigate: (section: string) => void;
}

export const StudioHeader: React.FC<StudioHeaderProps> = ({ user, onLogin, onNavigate }) => {

  const { signOut } = useAuth();

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>🎵 StudioForgeAI</Text>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => onNavigate('home')}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onNavigate('studio')}>
          <Text style={styles.navText}>Studio</Text>
        </TouchableOpacity>
         {user && (
           <TouchableOpacity onPress={() => onNavigate('projects')}>
             <Text style={styles.navText}>Projects</Text>
           </TouchableOpacity>
         )}
         {user && (
           <TouchableOpacity onPress={() => onNavigate('settings')}>
             <Text style={styles.navText}>Settings</Text>
           </TouchableOpacity>
         )}
        {user ? (
          <TouchableOpacity onPress={signOut} style={styles.authButton}>
            <Text style={styles.authText}>Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onLogin} style={styles.authButton}>
            <Text style={styles.authText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(15, 15, 35, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#6366f1',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  navText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  authButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  authText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});