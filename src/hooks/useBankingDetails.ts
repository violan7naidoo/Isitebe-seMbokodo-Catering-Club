import { useState, useEffect } from 'react';

export interface BankingDetail {
  id: string;
  user_id: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  branch_code: string;
  account_type: string;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useBankingDetails = () => {
  const [bankingDetails, setBankingDetails] = useState<BankingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBankingDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/banking-details');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch banking details');
      }
      
      setBankingDetails(data);
    } catch (err) {
      console.error('Error fetching banking details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch banking details');
    } finally {
      setLoading(false);
    }
  };

  const addBankingDetail = async (bankingDetail: Omit<BankingDetail, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/banking-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankingDetail),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add banking details');
      }

      await fetchBankingDetails();
      return data;
    } catch (err) {
      console.error('Error adding banking details:', err);
      setError(err instanceof Error ? err.message : 'Failed to add banking details');
      throw err;
    }
  };

  const updateBankingDetail = async (id: string, updates: Partial<BankingDetail>) => {
    try {
      const response = await fetch('/api/banking-details', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updates }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update banking details');
      }

      await fetchBankingDetails();
      return data;
    } catch (err) {
      console.error('Error updating banking details:', err);
      setError(err instanceof Error ? err.message : 'Failed to update banking details');
      throw err;
    }
  };

  const deleteBankingDetail = async (id: string) => {
    try {
      const response = await fetch(`/api/banking-details?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete banking details');
      }

      await fetchBankingDetails();
    } catch (err) {
      console.error('Error deleting banking details:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete banking details');
      throw err;
    }
  };

  useEffect(() => {
    fetchBankingDetails();
  }, []);

  return {
    bankingDetails,
    loading,
    error,
    refetch: fetchBankingDetails,
    addBankingDetail,
    updateBankingDetail,
    deleteBankingDetail,
  };
};
