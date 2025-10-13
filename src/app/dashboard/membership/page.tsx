'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Package, AlertCircle, Calendar, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type MembershipPackage = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  status: 'active' | 'expired' | 'pending';
  renewalDate: string;
};

type Payment = {
  id: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
};

export default function MembershipDashboard() {
  const [membership, setMembership] = useState<MembershipPackage | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchMembershipData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockMembership: MembershipPackage = {
          id: '1',
          name: 'Premium Package',
          price: 'R150',
          description: 'Expanded support for funerals and events.',
          features: [
            'Funeral catering services',
            'One major event catering per annum',
          ],
          status: 'active',
          renewalDate: '2024-12-31',
        };

        const mockPayments: Payment[] = [
          {
            id: '1',
            date: '2023-10-01',
            amount: 'R150',
            status: 'completed',
            description: 'Monthly membership fee - October 2023',
          },
          {
            id: '2',
            date: '2023-09-01',
            amount: 'R150',
            status: 'completed',
            description: 'Monthly membership fee - September 2023',
          },
          {
            id: '3',
            date: '2023-08-01',
            amount: 'R150',
            status: 'completed',
            description: 'Monthly membership fee - August 2023',
          },
        ];

        setMembership(mockMembership);
        setPayments(mockPayments);
      } catch (err) {
        console.error('Error fetching membership data:', err);
        setError('Failed to load membership data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your membership information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Membership</h1>
          <p className="text-muted-foreground">
            View your membership details and payment history
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Membership Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Your Membership</CardTitle>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                {membership?.status ? membership.status.charAt(0).toUpperCase() + membership.status.slice(1) : 'Loading...'}
              </span>
            </div>
            <CardDescription>
              {membership?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Package</span>
                </div>
                <span>{membership?.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Monthly Fee</span>
                </div>
                <span>{membership?.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Renewal Date</span>
                </div>
                <span>{membership?.renewalDate ? formatDate(membership.renewalDate) : 'N/A'}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline">Change Plan</Button>
            <Button>Make Payment</Button>
          </CardFooter>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Your recent payments and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {payments.length > 0 ? (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}</p>
                      <span className={`text-xs ${
                        payment.status === 'completed' ? 'text-green-600' : 
                        payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No payment history found</p>
              </div>
            )}
          </CardContent>
          {payments.length > 0 && (
            <CardFooter className="border-t px-6 py-4">
              <Button variant="ghost" className="w-full">
                View All Payments
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Membership Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Your Membership Benefits</CardTitle>
          <CardDescription>
            Features included in your {membership?.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {membership?.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
