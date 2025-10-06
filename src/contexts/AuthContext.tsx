'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs';


type UserProfile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  id_number?: string;
  phone_number?: string;
  address?: string;
  is_admin?: boolean;
  created_at?: string;
};

type AuthContextType = {
  user: (User & UserProfile) | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Omit<UserProfile, 'id' | 'email'>) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState<AuthContextType['loading']>(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUser({ ...session.user, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
  try {
    // 1. First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
        },
        emailRedirectTo: 'https://www.isithebesembokodo.co.za/auth/callback'
      }
    });

    if (authError) throw authError;

    // 2. Then save to your users table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          id_number: userData.id_number || '',
          phone_number: userData.phone_number || '',
          address: userData.address || '',
          is_admin: false
        }]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw new Error('Failed to create user profile');
      }
    }

    return authData;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    // Only redirect if we're not already on the login page
    if (pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export const useAuth = () => {
  return useContext(AuthContext);
};