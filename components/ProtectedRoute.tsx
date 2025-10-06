'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/contexts/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
    if (!loading && user && adminOnly && !user.is_admin) {
      router.push('/dashboard');
    }
  }, [user, loading, router, adminOnly]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (adminOnly && !user.is_admin) {
    return null; // or an access denied component
  }

  return <>{children}</>;
}