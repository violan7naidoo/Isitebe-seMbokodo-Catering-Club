'use client';

import { useAuth } from '@/contexts/AuthContext';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type MembershipPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  billing_cycle: string;
  features: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type UserMembership = {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
  membership_number: string;
  plan_name: string;
};

type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  membership_number: string;
};

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [userMembership, setUserMembership] = useState<UserMembership | null>(null);
  const [membershipPlan, setMembershipPlan] = useState<MembershipPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user membership
        const { data: membershipData, error: membershipError } = await supabase
          .from('user_memberships')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (membershipError) throw membershipError;
        
        if (membershipData) {
          setUserMembership(membershipData);
          
          // Fetch the membership plan details
          const { data: planData, error: planError } = await supabase
            .from('membership_plans')
            .select('*')
            .eq('id', membershipData.plan_id)
            .single();
            
          if (planError) throw planError;
          
          setMembershipPlan({
            ...planData,
            features: Array.isArray(planData.features) ? planData.features : 
                     (typeof planData.features === 'string' ? JSON.parse(planData.features) : [])
          });
        }
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.user_metadata?.first_name || 'User'}!
          </h1>
          
          {/* Membership Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Your Membership</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              {userMembership ? (
                <>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {userMembership.plan_name}
                        </h3>
                        {membershipPlan && (
                          <p className="mt-1 text-sm text-gray-500">
                            {membershipPlan.description}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        userMembership?.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {userMembership?.status?.charAt(0)?.toUpperCase() + userMembership?.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {new Date(userMembership.start_date).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Renewal Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {new Date(userMembership.end_date).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </dd>
                      </div>
                      {membershipPlan?.features && membershipPlan.features.length > 0 && (
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Benefits</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <ul className="list-disc pl-5 space-y-1">
                              {membershipPlan.features?.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      )}
                    </div>
                </>
              ) : (
                <div className="px-4 py-5 sm:p-6 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No active membership</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by selecting a membership plan.</p>
                  <div className="mt-6">
                    <Link
                      href="/membership/plans"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Membership Plans
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Payment History</h2>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Make Payment
              </button>
            </div>
            <div className="mt-4">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No payment history</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your payment history will appear here once you make a payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}