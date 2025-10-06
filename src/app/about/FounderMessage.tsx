'use client';

import { useState } from 'react';  // Add this import
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

interface FounderMessageProps {
  fullMessage: string;
}

export default function FounderMessage({ fullMessage }: FounderMessageProps) {
  // If you want to keep the loading state for future use
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="prose max-w-none">
      {fullMessage.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}