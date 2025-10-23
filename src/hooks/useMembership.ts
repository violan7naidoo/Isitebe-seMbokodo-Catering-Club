import { useState, useEffect } from 'react';

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing_cycle: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserMembership {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  start_date: string;
  end_date: string;
  auto_renew: boolean;
  payment_method?: string;
  membership_number: string;
  created_at: string;
  updated_at: string;
  plan: MembershipPlan;
}

export const useMembership = () => {
  const [membershipPlans, setMembershipPlans] = useState<MembershipPlan[]>([]);
  const [userMembership, setUserMembership] = useState<UserMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all membership plans
  const fetchMembershipPlans = async (setLoadingState = true) => {
    try {
      if (setLoadingState) setLoading(true);
      const response = await fetch('/api/membership-plans');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch membership plans');
      }
      
      setMembershipPlans(data);
    } catch (err) {
      console.error('Error fetching membership plans:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch membership plans');
    } finally {
      if (setLoadingState) setLoading(false);
    }
  };

  // Fetch user's current membership
  const fetchUserMembership = async (setLoadingState = true) => {
    try {
      if (setLoadingState) setLoading(true);
      const response = await fetch('/api/user-membership');
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 404) {
          // User has no membership yet
          setUserMembership(null);
          return;
        }
        throw new Error(data.error || 'Failed to fetch user membership');
      }
      
      setUserMembership(data);
    } catch (err) {
      console.error('Error fetching user membership:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user membership');
    } finally {
      if (setLoadingState) setLoading(false);
    }
  };

  // Select a membership plan
  const selectMembership = async (planId: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id: planId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to select membership');
      }
      
      setUserMembership(data);
      return data;
    } catch (err) {
      console.error('Error selecting membership:', err);
      setError(err instanceof Error ? err.message : 'Failed to select membership');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchMembershipPlans(false),
          fetchUserMembership(false)
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return {
    membershipPlans,
    userMembership,
    loading,
    error,
    selectMembership,
    refetchMembership: fetchUserMembership,
    refetchPlans: fetchMembershipPlans,
  };
};