'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClientComponentClient, User } from '@supabase/auth-helpers-nextjs';


type UserWithProfile = User & {
  is_admin?: boolean; // Add this line
  user_metadata?: {
    first_name: string;
    last_name: string;
    [key: string]: any;
  };
};

// Then update your context type
type AuthContextType = {
  user: UserWithProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
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

  // Check user session on initial load and when pathname changes
  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser({ ...session.user, ...userData });
          
          // If user is on auth pages, redirect to dashboard
          if (pathname.startsWith('/auth')) {
            router.push('/dashboard');
          }
        } else {
          setUser(null);
          // If user is on protected route, redirect to login
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth/login');
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        setUser(null);
        if (pathname.startsWith('/dashboard')) {
          router.push('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setUser({ ...session.user, ...userData });
          
          // Redirect to dashboard after successful sign in
          if (['SIGNED_IN', 'TOKEN_REFRESHED'].includes(event)) {
            router.push('/dashboard');
          }
        } else {
          setUser(null);
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth/login');
          }
        }
      }
    );

    // Initial check
    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true);
    try {
      // 1. First create the auth user with email and password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) throw authError;

      // The trigger will handle creating the user profile
      // We just need to wait a bit for the trigger to complete
      if (authData.user) {
        // Wait for the profile to be created (the trigger will handle this)
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Don't throw an error here as the user was created successfully
          // The profile might still be created by the trigger
        }

        // Update the user state with the new profile data
        setUser({
          ...authData.user,
          ...profileData,
          user_metadata: {
            first_name: userData.first_name,
            last_name: userData.last_name,
          }
        });
      }

      return authData;
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred during signup');
    } finally {
      setLoading(false);
    }
};

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      if (data?.user) {
        // Fetch the latest user data from the database
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          throw new Error('Failed to load user profile');
        }

        const userWithProfile: UserWithProfile = {
          ...data.user,
          ...userData,
          user_metadata: {
            ...data.user.user_metadata,
            first_name: userData?.first_name || data.user.user_metadata?.first_name || '',
            last_name: userData?.last_name || data.user.user_metadata?.last_name || '',
          }
        };
        
        setUser(userWithProfile);
        return { data: { user: userWithProfile, session: data.session }, error: null };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
};

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
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