'use client';

import { useState } from 'react';
import { useMembership } from '@/hooks/useMembership';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Loader2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function MembershipSelector() {
  const { membershipPlans, userMembership, loading, selectMembership } = useMembership();
  const [selectingPlan, setSelectingPlan] = useState<string | null>(null);

  const handleSelectPlan = async (planId: string) => {
    try {
      setSelectingPlan(planId);
      await selectMembership(planId);
      toast({
        title: "Membership Selected!",
        description: "Your membership has been successfully activated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to select membership. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSelectingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading membership plans...</span>
      </div>
    );
  }

  if (userMembership) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Membership</h2>
          <p className="text-gray-600 mt-2">You're currently subscribed to a membership plan</p>
        </div>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{userMembership.plan.name}</CardTitle>
                <CardDescription className="text-lg">
                  Membership #{userMembership.membership_number}
                </CardDescription>
              </div>
              <Badge variant={userMembership.status === 'active' ? 'default' : 'secondary'}>
                {userMembership.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Billing Cycle:</span>
                <span>{userMembership.plan.billing_cycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Start Date:</span>
                <span>{new Date(userMembership.start_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">End Date:</span>
                <span>{new Date(userMembership.end_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="text-2xl font-bold text-green-600">
                  R{userMembership.plan.price}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Membership Plan</h2>
        <p className="text-gray-600 mt-2">Select the perfect plan for your catering needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {membershipPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.is_active ? 'ring-2 ring-green-500 shadow-lg' : 'opacity-50'}`}
          >
            {plan.is_active && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-500 text-white px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Active Plan
                </Badge>
              </div>
            )}
            
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">R{plan.price}</span>
                <span className="text-gray-500">/{plan.billing_cycle}</span>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                onClick={() => handleSelectPlan(plan.id)}
                disabled={selectingPlan === plan.id}
              >
                {selectingPlan === plan.id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Selecting...
                  </>
                ) : (
                  'Select Plan'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
