'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PaymentCancelPage() {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push('/dashboard/membership');
  };

  const handleGoHome = () => {
    router.push('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader className="text-center">
          <XCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-orange-600">Payment Cancelled</CardTitle>
          <CardDescription>
            Your payment was cancelled. No charges have been made to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">What happened?</h3>
            <p className="text-sm text-orange-700">
              You cancelled the payment process. This could be because you changed your mind 
              or encountered an issue during payment.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Need help?</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Check your internet connection</li>
              <li>• Ensure your payment method is valid</li>
              <li>• Contact support if you continue having issues</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={handleTryAgain} className="bg-blue-600 hover:bg-blue-700">
              Try Payment Again
            </Button>
            <Button onClick={handleGoHome} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
