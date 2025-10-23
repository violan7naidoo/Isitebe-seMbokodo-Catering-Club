'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'completed' | 'pending' | 'failed' | null>(null);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        const transactionId = searchParams.get('m_payment_id');

        if (!paymentId && !transactionId) {
          setPaymentStatus('failed');
          setLoading(false);
          return;
        }

        // Fetch payment status from API
        const response = await fetch('/api/payments');
        const payments = await response.json();

        if (response.ok && payments.length > 0) {
          // Find the payment by ID or transaction ID
          const payment = payments.find((p: any) => 
            p.id === paymentId || p.transaction_id === transactionId
          );

          if (payment) {
            setPaymentStatus(payment.status);
          } else {
            setPaymentStatus('pending');
          }
        } else {
          setPaymentStatus('pending');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentStatus('failed');
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  const handleContinue = () => {
    router.push('/dashboard');
  };

  const handleViewPayments = () => {
    router.push('/dashboard/membership');
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Verifying your payment...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader className="text-center">
          {paymentStatus === 'success' || paymentStatus === 'completed' ? (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
              <CardDescription>
                Your payment has been processed successfully. Your membership is now active.
              </CardDescription>
            </>
          ) : paymentStatus === 'pending' ? (
            <>
              <Loader2 className="h-16 w-16 text-yellow-500 mx-auto mb-4 animate-spin" />
              <CardTitle className="text-2xl text-yellow-600">Payment Pending</CardTitle>
              <CardDescription>
                Your payment is being processed. You will receive an email confirmation once it's complete.
              </CardDescription>
            </>
          ) : (
            <>
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
              <CardDescription>
                There was an issue processing your payment. Please try again or contact support.
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {paymentStatus === 'success' || paymentStatus === 'completed' ? (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">What's Next?</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Your membership is now active</li>
                  <li>• You can access all member benefits</li>
                  <li>• You'll receive a confirmation email shortly</li>
                </ul>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
                  Continue to Dashboard
                </Button>
                <Button onClick={handleViewPayments} variant="outline">
                  View Membership
                </Button>
              </div>
            </div>
          ) : paymentStatus === 'pending' ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Payment Processing</h3>
                <p className="text-sm text-yellow-700">
                  Your payment is being verified. This usually takes a few minutes. 
                  You'll receive an email once it's confirmed.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleContinue} variant="outline">
                  Go to Dashboard
                </Button>
                <Button onClick={handleViewPayments}>
                  Check Membership Status
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Payment Issue</h3>
                <p className="text-sm text-red-700">
                  If you believe this is an error, please contact our support team 
                  or try making the payment again.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleContinue} variant="outline">
                  Go to Dashboard
                </Button>
                <Button onClick={() => router.push('/dashboard/membership')}>
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
