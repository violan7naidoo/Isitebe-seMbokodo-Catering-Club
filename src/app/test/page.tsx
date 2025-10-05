'use client';
import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function TestConnection() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createClientComponentClient();
        console.log('Testing Supabase connection...');
        
        // Test 1: Check if we can connect
        const { data, error } = await supabase.from('users').select('*').limit(1);
        
        if (error) {
          console.error('Supabase query error:', error);
          alert(`Error: ${error.message}`);
        } else {
          console.log('Success! Database connection works:', data);
          alert('Successfully connected to Supabase database!');
        }

        // Test 2: Check authentication
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session);
        
      } catch (err) {
        console.error('Connection test failed:', err);
        alert('Failed to connect to Supabase. Check console for details.');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Testing Supabase Connection</h1>
      <p>Check your browser's console (F12) for detailed logs.</p>
    </div>
  );
}