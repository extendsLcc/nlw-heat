import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../servies/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatarUrl: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

type AuthProvider = {
  children: ReactNode;
};

type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    githubId: number;
    avatarUrl: string;
    login: string;
  };
};

const LOCAL_STORAGE_KEY = '@dowhile:token';

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null);

  const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${githubClientId}`;

  async function sigIn(githubCode: string) {
    const response = await api.post<AuthResponse>('auth', {
      code: githubCode,
    });

    const { accessToken, user } = response.data;

    localStorage.setItem(LOCAL_STORAGE_KEY, accessToken);
    api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    // api.defaults.headers.common.authorization = '';
  }

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('users/profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);
      sigIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
