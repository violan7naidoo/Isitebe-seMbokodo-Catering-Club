import { useEffect, useState } from 'react';

interface Membership {
  id: string;
  status: 'active' | 'inactive' | 'expired';
  package: {
    name: string;
    monthly_fee: number;
    description: string;
    benefits: string[];
  };
  renewal_date: string;
  created_at: string;
}

export function useMembership() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await fetch('/api/membership');
        if (!response.ok) {
          throw new Error('Failed to fetch membership data');
        }
        const data = await response.json();
        setMembership(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  return { membership, loading, error };
}
