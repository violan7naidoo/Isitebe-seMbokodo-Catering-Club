import { useState, useEffect } from 'react';

export interface Payment {
  id: string;
  user_id: string;
  membership_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  transaction_id: string;
  description: string;
  created_at: string;
  updated_at: string;
  membership?: {
    plan: {
      name: string;
    };
  };
}

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payments');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch payments');
      }
      
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return {
    payments,
    loading,
    error,
    refetch: fetchPayments,
  };
};