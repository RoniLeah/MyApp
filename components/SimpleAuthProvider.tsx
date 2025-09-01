import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setUser({ id: '1', email, name: 'Demo User' });
      setLoading(false);
    }, 1000);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setTimeout(() => {
      setUser({ id: '1', email, name: 'Demo User' });
      setLoading(false);
    }, 1000);
  };

  const signOut = async () => {
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // Simulate password reset
    console.log('Password reset sent to:', email);
  };

  return (
    <AuthContext.Provider value={{
      user, loading, signIn, signUp, signOut, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within SimpleAuthProvider');
  }
  return context;
};