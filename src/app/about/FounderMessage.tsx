'use client';

import { useEffect, useState } from 'react';
import { summarizeFoundersMessage } from '@/ai/flows/summarize-founders-message';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

interface FounderMessageProps {
  fullMessage: string;
}

export default function FounderMessage({ fullMessage }: FounderMessageProps) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        const result = await summarizeFoundersMessage({
          foundersMessage: fullMessage,
        });
        setSummary(result.summary);
      } catch (err) {
        console.error('Error summarizing message:', err);
        setError('Could not load summary.');
      } finally {
        setLoading(false);
      }
    }
    getSummary();
  }, [fullMessage]);

  if (loading) {
    return <Skeleton className="h-6 w-full" />;
  }

  if (error) {
    return null; // Don't show anything if there's an error
  }

  return (
    <Alert className="bg-primary/10 border-primary/20">
      <Lightbulb className="h-4 w-4 text-primary" />
      <AlertDescription className="font-headline text-lg italic text-foreground/90">
        {summary}
      </AlertDescription>
    </Alert>
  );
}
