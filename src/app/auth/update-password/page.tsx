'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const supabase = createClientComponentClient();

function UpdatePasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showRetry, setShowRetry] = useState(false);
  const { updatePassword } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [tokenHash, setTokenHash] = useState<string | null>(null);

  const verifyToken = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError('');
      
      if (!tokenHash) {
        throw new Error('No token provided');
      }

      const { data, error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: 'recovery',
      });
      
      if (error) {
        console.error('Token verification error:', error);
        
        if (error.message.includes('expired') || error.message.includes('invalid')) {
          setError('This password reset link has expired or is invalid. Please request a new one.');
          setShowRetry(true);
        } else if (error.message.includes('network')) {
          if (retryCount < 3) {
            console.log(`Retrying token verification (attempt ${retryCount + 1})`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
            return verifyToken(retryCount + 1);
          }
          setError('Network error. Please check your connection and try again.');
        } else {
          setError('An error occurred while verifying your reset link. Please try again.');
        }
        return;
      }
      
      setToken(tokenHash);
    } catch (error) {
      console.error('Error in verifyToken:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setError('');
    setShowRetry(false);
    const newTokenHash = searchParams.get('token') || searchParams.get('token_hash') || searchParams.get('code');
    if (newTokenHash) {
      setTokenHash(newTokenHash);
      await verifyToken();
    }
  };

  useEffect(() => {
    // Get the token from the URL
    const newTokenHash = searchParams.get('token') || searchParams.get('token_hash') || searchParams.get('code');
    
    if (!newTokenHash) {
      router.push('/auth/login');
      return;
    }

    setTokenHash(newTokenHash);
  }, [searchParams, router]);

  useEffect(() => {
    if (tokenHash) {
      verifyToken();
    }
  }, [tokenHash]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!token) {
      setError('Invalid or expired reset link');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updatePassword(token, password);
      setSuccess(true);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Password updated</h2>
          <p className="text-muted-foreground">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <Button className="mt-4" onClick={() => router.push('/auth/login')}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Verifying your reset link...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <span>{error}</span>
              {showRetry && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  className="mt-2 self-start"
                >
                  Request New Reset Link
                </Button>
              )}
            </AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Button type="submit" className="w-full" disabled={loading || !token}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
            <div className="text-center text-sm">
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Back to login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    }>
      <UpdatePasswordForm />
    </Suspense>
  );
}
      try {
        setLoading(true);
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash,
          type: 'recovery',
        });
        
        if (error) {
          console.error('Token verification error:', error);
          
          // More specific error handling
          if (error.message.includes('expired') || error.message.includes('invalid')) {
            setError('This password reset link has expired or is invalid. Please request a new one.');
            setShowRetry(true);
          } else if (error.message.includes('network')) {
            // Retry on network errors
            if (retryCount < 3) {
              console.log(`Retrying token verification (attempt ${retryCount + 1})`);
              await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
              return verifyToken(retryCount + 1);
            }
            setError('Network error. Please check your connection and try again.');
          } else {
            setError('An error occurred while verifying your reset link. Please try again.');
          }
          return;
        }
        
        setToken(tokenHash);
      } catch (error) {
        console.error('Error in verifyToken:', error);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const handleRetry = async () => {
      setError('');
      setShowRetry(false);
      const tokenHash = searchParams.get('token') || searchParams.get('token_hash') || searchParams.get('code');
      if (tokenHash) {
        setToken(tokenHash);
        await verifyToken();
      }
    };

    verifyToken();
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!token) {
      setError('Invalid or expired reset link');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await updatePassword(token, password);
      setSuccess(true);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Failed to update password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-foreground">Password updated</h2>
          <p className="text-muted-foreground">
            Your password has been successfully updated. You can now sign in with your new password.
          </p>
          <Button className="mt-4" onClick={() => router.push('/auth/login')}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Verifying your reset link...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full" disabled={loading || !token}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UpdatePasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    }>
      <UpdatePasswordForm />
    </Suspense>
  );
}
