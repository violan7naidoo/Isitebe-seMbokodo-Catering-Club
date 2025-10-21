'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

type UserWithProfile = User & {
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    firstName?: string;
    lastName?: string;
    [key: string]: any;
  };
};

type AuthContextType = {
  user: UserWithProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (token: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState<AuthContextType['loading']>(true);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  // Check user session on initial load and when pathname changes
  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!isMounted) return;

        if (session?.user) {
          if (isMounted) {
            const userWithProfile = session.user as UserWithProfile;
            setUser(userWithProfile);
            
            // Create user profile in database (non-blocking)
            createUserProfile(userWithProfile).catch(console.error);
            
            if (pathname.startsWith('/auth')) {
              router.push('/dashboard');
            }
          }
        } else if (isMounted) {
          setUser(null);
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth/login');
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        if (isMounted) {
          setUser(null);
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth/login');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          if (isMounted) {
            const userWithProfile = session.user as UserWithProfile;
            setUser(userWithProfile);
            
            // Create user profile in database if this is a new sign-in (non-blocking)
            if (event === 'SIGNED_IN') {
              createUserProfile(userWithProfile).catch(console.error);
              router.push('/dashboard');
            }
          }
        } else if (isMounted) {
          setUser(null);
          if (pathname.startsWith('/dashboard')) {
            router.push('/auth/login');
          }
        }
      }
    );

    checkUser();

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [pathname, router]);

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);

      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        },
      });

      if (signUpError) {
        console.error('Auth signup error:', signUpError);
        throw signUpError;
      }

      // 2. Return the signup result - don't try to sign in immediately
      // Let the email confirmation flow handle the session creation
      return { user: authData.user, session: authData.session };
      
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
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
        if (error.message.includes('Email not confirmed')) {
          try {
            const { error: resendError } = await supabase.auth.resend({
              type: 'signup',
              email,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
              },
            });

            if (resendError) {
              console.error('Resend confirmation error:', resendError);
              throw error;
            }

            throw new Error('Please check your email to confirm your account. A new confirmation email has been sent.');
          } catch (resendError) {
            console.error('Error resending confirmation:', resendError);
            throw error;
          }
        }

        console.error('Login error:', error);
        throw error;
      }

      if (data?.user) {
        console.log('Signin - Raw user data:', data.user);
        console.log('Signin - User metadata:', data.user.user_metadata);

        // Ensure we have the most up-to-date user metadata
        const { data: { session: currentSession } } = await supabase.auth.getSession();

        const userWithProfile: UserWithProfile = {
          ...data.user,
          user_metadata: {
            ...(currentSession?.user?.user_metadata || data.user.user_metadata || {}),
            first_name: (currentSession?.user?.user_metadata?.first_name || data.user.user_metadata?.first_name || data.user.user_metadata?.firstName || ''),
            last_name: (currentSession?.user?.user_metadata?.last_name || data.user.user_metadata?.last_name || data.user.user_metadata?.lastName || ''),
          }
        };

        console.log('Signin - Enhanced user metadata:', userWithProfile.user_metadata);
        setUser(userWithProfile);
        return { data: { user: userWithProfile, session: currentSession || data.session }, error: null };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Helper function to create user profile in database
  const createUserProfile = async (user: any) => {
    try {
      // First check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existingUser) {
        console.log('User profile already exists');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email,
          first_name: user.user_metadata?.first_name || user.user_metadata?.firstName || '',
          last_name: user.user_metadata?.last_name || user.user_metadata?.lastName || '',
        })
        .select()
        .single();

      if (error) {
        // Handle specific error types
        if (error.code === '23505' || error.message.includes('duplicate key')) {
          console.log('User profile already exists (duplicate key)');
        } else {
          console.error('Error creating user profile:', error);
        }
      } else if (data) {
        console.log('User profile created successfully:', data);
      }
    } catch (error) {
      console.error('Error in createUserProfile:', error);
      // Don't throw the error, just log it
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      window.location.href = '/auth/login';
      return Promise.resolve();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
      });

      if (error) {
        console.error('Password reset error:', error);
        throw error;
      }

      return Promise.resolve();
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      const { data: { user }, error: verifyError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'recovery',
      });

      if (verifyError) {
        console.error('Error verifying token:', verifyError);
        throw new Error('Invalid or expired reset link');
      }

      if (!user) {
        throw new Error('No user found for this reset link');
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        console.error('Password update error:', updateError);
        throw updateError;
      }

      await supabase.auth.signOut();
      return Promise.resolve();
    } catch (error) {
      console.error('Error in updatePassword:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updatePassword,
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