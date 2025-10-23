'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { UserMembership } from '@/hooks/useMembership';

interface PaymentFormProps {
  membership: UserMembership;
  onPaymentInitiated?: () => void;
}

export default function PaymentForm({ membership, onPaymentInitiated }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(membership?.plan?.price || 0);
  const [description, setDescription] = useState(`Payment for ${membership?.plan?.name || 'membership'} membership`);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');

  // Add error handling for missing membership data
  if (!membership) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Membership Found</h3>
            <p className="text-gray-600 mb-4">
              You need an active membership to make payments.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!membership.plan) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Invalid Membership Data</h3>
            <p className="text-gray-600 mb-4">
              Your membership data is incomplete. Please contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          membership_id: membership.id,
          amount: paymentAmount,
          description: description,
          payment_type: 'membership_payment'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Payment Initiated",
          description: "Redirecting to PayFast for payment processing...",
        });
        
        // Redirect to PayFast
        window.location.href = data.payfast_url;
        onPaymentInitiated?.();
      } else {
        throw new Error(data.error || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      console.error('Error details:', error);
      
      // Handle unknown error type safely
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      toast({
        title: "Error",
        description: `Failed to initiate payment: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Membership Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
          <CardDescription>
            Review your membership details and payment amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Membership Plan</Label>
              <p className="font-medium">{membership.plan.name}</p>
              <p className="text-sm text-gray-600">{membership.plan.description}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Membership Number</Label>
              <p className="font-mono font-medium">{membership.membership_number}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              <Badge 
                className={
                  membership.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }
              >
                {membership.status}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Duration</Label>
              <p className="text-sm">
                {formatDate(membership.start_date)} - {formatDate(membership.end_date)}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Plan Price</span>
              <span className="font-medium">{formatCurrency(membership.plan.price)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Payment Amount</span>
              <span className="font-bold text-lg">{formatCurrency(paymentAmount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Configure your payment amount and description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payment_type">Payment Type</Label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment_type"
                    value="full"
                    checked={paymentType === 'full'}
                    onChange={(e) => {
                      setPaymentType('full');
                      setPaymentAmount(membership.plan.price);
                    }}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Full Payment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment_type"
                    value="partial"
                    checked={paymentType === 'partial'}
                    onChange={(e) => setPaymentType('partial')}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Partial Payment</span>
                </label>
              </div>
            </div>
            
            {paymentType === 'partial' && (
              <div>
                <Label htmlFor="amount">Payment Amount (ZAR)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  min="1"
                  max={membership.plan.price}
                  step="0.01"
                  placeholder="Enter amount"
                />
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Payment Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter payment description"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Secure Payment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">PayFast Secure Payment</h4>
                <p className="text-sm text-green-700 mt-1">
                  Your payment will be processed securely through PayFast. 
                  You can pay using credit card, EFT, or other supported methods.
                </p>
                <div className="flex items-center space-x-4 mt-3 text-xs text-green-600">
                  <span>🔒 SSL Encrypted</span>
                  <span>💳 Multiple Payment Methods</span>
                  <span>🛡️ Secure Processing</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p>You will be redirected to PayFast to complete your payment.</p>
        </div>
        <Button 
          onClick={handlePayment} 
          disabled={loading || paymentAmount <= 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              Pay {formatCurrency(paymentAmount)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
