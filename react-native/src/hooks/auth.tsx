import React, { createContext, useContext, useEffect, useState } from 'react';
import * as AuthSessions from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const CLIENT_ID = '2318e6885329cbcdcafa';
const SCOPE = 'read:user';
const USER_STORAGE_KEY = '@nlwheat:user';
const TOKEN_STORAGE_KEY = '@nlwheat:token';

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  login: string;
};

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  };
  type: string;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authSessionResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const authResponse = await api.post<AuthResponse>('/auth', {
          code: authSessionResponse.params.code,
        });
        const { user, accessToken } = authResponse.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(
          TOKEN_STORAGE_KEY,
          JSON.stringify(accessToken),
        );

        setUser(user);
      }
    } catch (error) {
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {}

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE_KEY);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }

      setIsSigningIn(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isSigningIn: isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, AuthProvider, useAuth };
