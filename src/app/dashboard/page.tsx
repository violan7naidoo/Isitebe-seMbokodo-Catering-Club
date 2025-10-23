'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MembershipSelector from '@/components/membership/MembershipSelector';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // For now, skip membership fetching since tables don't exist
        // TODO: Add membership functionality when database tables are created

        console.log('Dashboard - User data:', user);
        console.log('Dashboard - User metadata:', user.user_metadata);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (authLoading || loading) {
    return <DashboardSkeleton />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please sign in to view the dashboard</h2>
          <Link 
            href="/auth/login" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your membership details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.first_name || user?.user_metadata?.firstName || 'User'}!
          </h1>
          
          {/* Membership Section */}
          <div className="mt-8">
            <MembershipSelector />
          </div>

          {/* Coming Soon Features */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Coming Soon</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <svg className="mx-auto h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Membership Plans</h3>
                  <p className="mt-1 text-xs text-gray-500">Choose from our catering membership options</p>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <svg className="mx-auto h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Payment Management</h3>
                  <p className="mt-1 text-xs text-gray-500">Manage your payments and billing</p>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <svg className="mx-auto h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics</h3>
                  <p className="mt-1 text-xs text-gray-500">Track your usage and activity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}