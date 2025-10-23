'use client';

import { useState } from 'react';
import { useMembership } from '@/hooks/useMembership';
import { useRouter } from 'next/navigation';
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
import { MembershipSkeleton } from '@/components/dashboard/MembershipSkeleton';

export default function MembershipPage() {
  const { userMembership, loading, refetchMembership } = useMembership();
  const [isDeactivating, setIsDeactivating] = useState(false);
  const router = useRouter();

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

  const handleUpdateProfile = () => {
    router.push('/dashboard/profile');
  };

  const handlePaymentMethods = () => {
    router.push('/dashboard/payments');
  };

  const handleChangePlan = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return <MembershipSkeleton />;
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

  const getPaymentMethodDisplay = (paymentMethod?: string) => {
    if (!paymentMethod) return 'Website Payment';
    
    switch (paymentMethod.toLowerCase()) {
      case 'direct_deposit':
        return 'Direct Deposit';
      case 'website_payment':
        return 'Website Payment';
      case 'debit_order':
        return 'Debit Order';
      case 'eft':
        return 'EFT Transfer';
      case 'bank_transfer':
        return 'Bank Transfer';
      default:
        return paymentMethod;
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge className={getStatusColor(userMembership.status)}>
                    {userMembership.status}
                  </Badge>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {getPaymentMethodDisplay(userMembership.payment_method)}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {new Date(userMembership.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleUpdateProfile}
              >
                <User className="h-4 w-4 mr-2" />
                Update Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/dashboard/payments')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Payments
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleChangePlan}
              >
                <Package className="h-4 w-4 mr-2" />
                Change Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Deactivate Membership Section - Bottom of Page */}
      {userMembership.status === 'active' && (
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-600">
                Irreversible actions that will affect your membership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-800">Deactivate Membership</h3>
                  <p className="text-sm text-red-600 mt-1">
                    This will immediately deactivate your membership and you will lose access to all benefits.
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
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
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}