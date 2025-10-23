'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Building2, 
  Smartphone, 
  Banknote,
  CheckCircle, 
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import BankingDetailsForm from '@/components/payment/BankingDetailsForm';
import PaymentForm from '@/components/payment/PaymentForm';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import { UserMembership } from '@/hooks/useMembership';

export default function PaymentsPage() {
  const router = useRouter();
  const [membership, setMembership] = useState<UserMembership | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    try {
      const response = await fetch('/api/user-membership');
      if (response.ok) {
        const data = await response.json();
        setMembership(data);
      }
    } catch (error) {
      console.error('Error fetching membership:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handlePaymentMethods = () => {
    setActiveSection('payment-methods');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Membership Found</h1>
          <p className="text-gray-600 mb-6">You don't have an active membership.</p>
          <Button onClick={() => router.push('/dashboard/membership')}>
            View Membership Plans
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600 mt-2">
          Manage your payment methods, banking details, and payment history
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: CreditCard },
              { id: 'payment-methods', label: 'Payment Methods', icon: Building2 },
              { id: 'banking-details', label: 'Banking Details', icon: Banknote },
              { id: 'make-payment', label: 'Make Payment', icon: Smartphone },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSectionChange(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Membership Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Membership Summary
                </CardTitle>
                <CardDescription>
                  Your current membership and payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Membership Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{membership.plan.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={membership.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {membership.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Membership Number:</span>
                        <span className="font-medium">{membership.membership_number}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium">R {membership.plan.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">
                          {membership.payment_method ? 
                            membership.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
                            'Not Set'
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Billing Cycle:</span>
                        <span className="font-medium capitalize">{membership.plan.billing_cycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Payment:</span>
                        <span className="font-medium">
                          {new Date(membership.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSectionChange('payment-methods')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Payment Methods</h3>
                      <p className="text-sm text-gray-600">Manage your payment preferences</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSectionChange('banking-details')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Banknote className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Banking Details</h3>
                      <p className="text-sm text-gray-600">Add or update your banking information</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSectionChange('make-payment')}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold">Make Payment</h3>
                      <p className="text-sm text-gray-600">Pay for your membership</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'payment-methods' && (
          <PaymentMethodSelector
            currentMethod={membership.payment_method || 'debit_order'}
            onMethodChange={(method) => {
              // Update local state
              setMembership(prev => prev ? { ...prev, payment_method: method } : null);
            }}
          />
        )}

        {activeSection === 'banking-details' && (
          <BankingDetailsForm />
        )}

        {activeSection === 'make-payment' && (
          <PaymentForm 
            membership={membership}
            onPaymentInitiated={() => {
              // Handle payment initiation
              console.log('Payment initiated');
            }}
          />
        )}
      </div>
    </div>
  );
}
