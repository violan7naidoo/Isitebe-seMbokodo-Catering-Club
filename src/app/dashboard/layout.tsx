'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold text-indigo-600">Isithebe seMbokodo</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">
                {user.user_metadata?.first_name} {user.user_metadata?.last_name}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="p-4">
              <SidebarNav />
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
