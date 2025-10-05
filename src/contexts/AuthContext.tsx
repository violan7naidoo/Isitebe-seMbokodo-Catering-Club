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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
        }
      }
    });

    if (error) throw error;
    if (data.user) {
      // Save additional user data to profiles table
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          id_number: userData.idNumber,
          phone_number: userData.phone,
          address: userData.address,
        }]);

      if (profileError) throw profileError;
    }

    return data;
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