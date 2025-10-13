import { useEffect, useState } from 'react';

interface Payment {
  id: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  description: string;
  created_at: string;
}

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments');
        if (!response.ok) {
          throw new Error('Failed to fetch payment history');
        }
        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { payments, loading, error };
}
