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
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isAvailable: boolean;
}

interface PaymentMethodSelectorProps {
  currentMethod?: string;
  onMethodChange?: (method: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'website',
    name: 'Website Payment',
    description: 'Pay securely through our website using PayFast',
    icon: <CreditCard className="h-5 w-5" />,
    isAvailable: true
  },
  {
    id: 'debit_order',
    name: 'Debit Order',
    description: 'Automatic monthly deduction from your bank account',
    icon: <Building2 className="h-5 w-5" />,
    isAvailable: true
  },
  {
    id: 'eft',
    name: 'EFT Transfer',
    description: 'Manual bank transfer to our account',
    icon: <Smartphone className="h-5 w-5" />,
    isAvailable: true
  },
  {
    id: 'cash',
    name: 'Cash Payment',
    description: 'Pay in person at our office or events',
    icon: <Banknote className="h-5 w-5" />,
    isAvailable: true
  }
];

export default function PaymentMethodSelector({ currentMethod, onMethodChange }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState(currentMethod || 'website');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current payment method
  const fetchCurrentMethod = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-membership');
      const data = await response.json();
      
      if (response.ok && data.payment_method) {
        setSelectedMethod(data.payment_method);
      }
    } catch (error) {
      console.error('Error fetching payment method:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentMethod();
  }, []);

  const handleMethodChange = (method: string) => {
    console.log('Method changing to:', method);
    setSelectedMethod(method);
    onMethodChange?.(method);
  };

  const handleSave = async () => {
    try {
      console.log('Saving payment method:', selectedMethod);
      console.log('Current method:', currentMethod);
      console.log('Selected method:', selectedMethod);
      setSaving(true);
      
      const response = await fetch('/api/user-membership', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          payment_method: selectedMethod 
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);
      console.log('Response status:', response.status);

      if (response.ok) {
        console.log('Payment method updated successfully:', data);
        // Update the current method in parent component
        onMethodChange?.(selectedMethod);
        alert('Payment method updated successfully!');
      } else {
        console.error('API Error:', data);
        throw new Error(data.error || `HTTP ${response.status}: Failed to update payment method`);
      }
    } catch (error) {
      console.error('Error updating payment method:', error);
      console.error('Error details:', error);
      
      // Handle unknown error type safely
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error updating payment method: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  const getMethodDisplay = (methodId: string) => {
    const method = paymentMethods.find(m => m.id === methodId);
    return method ? method.name : 'Website Payment';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading payment methods...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Current Payment Method
          </CardTitle>
          <CardDescription>
            Your currently selected payment method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              {paymentMethods.find(m => m.id === selectedMethod)?.icon}
              <div>
                <p className="font-medium text-green-800">
                  {getMethodDisplay(selectedMethod)}
                </p>
                <p className="text-sm text-green-600">
                  {paymentMethods.find(m => m.id === selectedMethod)?.description}
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Selection Status */}
      {selectedMethod !== currentMethod && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Payment method changed</span>
            </div>
            <p className="text-sm text-orange-600 mt-1">
              Click "Save Payment Method" to apply your changes.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Payment Method</CardTitle>
          <CardDescription>
            Choose how you would like to pay for your membership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="space-y-2">
                <Button
                  type="button"
                  variant={selectedMethod === method.id ? "default" : "outline"}
                  className={`w-full h-auto p-4 flex flex-col items-start space-y-2 ${
                    selectedMethod === method.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMethodChange(method.id);
                  }}
                  disabled={!method.isAvailable}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{method.name}</span>
                        {!method.isAvailable && (
                          <Badge variant="secondary" className="text-xs">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm opacity-80 mt-1">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex justify-end">
            <Button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSave();
              }}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Payment Method'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Website Payment:</strong> Pay securely through PayFast with credit card, EFT, or other methods</li>
              <li>• <strong>Debit Order:</strong> We'll automatically deduct your membership fee monthly from your bank account</li>
              <li>• <strong>EFT Transfer:</strong> You'll receive our bank details to make manual transfers</li>
              <li>• <strong>Cash Payment:</strong> Pay in person at our office or during events</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
