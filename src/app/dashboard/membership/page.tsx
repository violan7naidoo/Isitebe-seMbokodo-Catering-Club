'use client';

import { useState } from 'react';
import { useMembership } from '@/hooks/useMembership';
import { usePayments } from '@/hooks/usePayments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  CreditCard, 
  User, 
  Package, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function MembershipPage() {
  const { userMembership, loading, refetchMembership } = useMembership();
  const { payments, loading: paymentsLoading } = usePayments();
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivateMembership = async () => {
    try {
      setIsDeactivating(true);
      
      // Call API to deactivate membership
      const response = await fetch('/api/user-membership', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'deactivate' 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to deactivate membership');
      }

      toast({
        title: "Membership Deactivated",
        description: "Your membership has been successfully deactivated.",
      });

      // Refresh membership data
      await refetchMembership();
    } catch (error) {
      console.error('Error deactivating membership:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate membership. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeactivating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading membership details...</span>
      </div>
    );
  }

  if (!userMembership) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">No Membership Found</h2>
          <p className="mt-2 text-gray-600">
            You don't have an active membership. Please select a membership plan to get started.
          </p>
          <Button asChild className="mt-4">
            <a href="/dashboard">Choose Membership Plan</a>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Membership</h1>
        <p className="text-gray-600 mt-2">Manage your membership details and view payment history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Membership Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{userMembership.plan.name}</CardTitle>
                  <CardDescription className="text-lg">
                    Membership #{userMembership.membership_number}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(userMembership.status)} flex items-center gap-1`}>
                  {getStatusIcon(userMembership.status)}
                  {userMembership.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Plan Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Plan</p>
                    <p className="font-medium">{userMembership.plan.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">R{userMembership.plan.price}/{userMembership.plan.billing_cycle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">
                      {new Date(userMembership.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">
                      {new Date(userMembership.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Plan Features */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Plan Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {userMembership.plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Membership Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Make Payment
                </Button>
                <Button variant="outline" className="flex-1">
                  <User className="h-4 w-4 mr-2" />
                  Update Billing
                </Button>
                {userMembership.status === 'active' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        <XCircle className="h-4 w-4 mr-2" />
                        Deactivate Membership
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Deactivate Membership</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to deactivate your membership? This action cannot be undone and you will lose access to all membership benefits.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeactivateMembership}
                          disabled={isDeactivating}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeactivating ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Deactivating...
                            </>
                          ) : (
                            'Deactivate Membership'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment History
              </CardTitle>
              <CardDescription>
                View your payment history and download receipts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading payment history...</span>
                </div>
              ) : payments.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No Payments Yet</h3>
                  <p className="mt-2 text-gray-600">
                    Your payment history will appear here once you make your first payment.
                  </p>
                  <Button className="mt-4">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Make First Payment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {payment.status === 'completed' ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : payment.status === 'pending' ? (
                            <Clock className="h-6 w-6 text-yellow-500" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {payment.membership?.plan?.name || 'Membership Payment'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Transaction: {payment.transaction_id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R{payment.amount}</p>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Membership Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Membership Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge className={getStatusColor(userMembership.status)}>
                  {userMembership.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Auto Renew</span>
                <span className="font-medium">
                  {userMembership.auto_renew ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">
                  {new Date(userMembership.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Change Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}