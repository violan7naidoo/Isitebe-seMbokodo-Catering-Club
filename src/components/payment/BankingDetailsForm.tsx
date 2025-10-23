'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Loader2,
  Building2,
  User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BankingDetail {
  id: string;
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  branch_code: string;
  account_type: string;
  is_primary: boolean;
  is_active: boolean;
  created_at: string;
}

interface BankingDetailsFormProps {
  onBankingDetailsChange?: () => void;
}

export default function BankingDetailsForm({ onBankingDetailsChange }: BankingDetailsFormProps) {
  const [bankingDetails, setBankingDetails] = useState<BankingDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState<BankingDetail | null>(null);
  
  const [formData, setFormData] = useState({
    bank_name: '',
    account_holder_name: '',
    account_number: '',
    branch_code: '',
    account_type: '',
    is_primary: false
  });

  // Fetch banking details
  const fetchBankingDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/banking-details');
      const data = await response.json();
      
      if (response.ok) {
        setBankingDetails(data);
      } else {
        console.error('Error fetching banking details:', data.error);
        toast({
          title: "Error",
          description: "Failed to fetch banking details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching banking details:', error);
      toast({
        title: "Error",
        description: "Failed to fetch banking details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankingDetails();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      const url = editingDetail ? '/api/banking-details' : '/api/banking-details';
      const method = editingDetail ? 'PATCH' : 'POST';
      
      const requestBody = editingDetail 
        ? { id: editingDetail.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: editingDetail 
            ? "Banking details updated successfully." 
            : "Banking details added successfully.",
        });
        
        setDialogOpen(false);
        setEditingDetail(null);
        resetForm();
        fetchBankingDetails();
        onBankingDetailsChange?.();
      } else {
        throw new Error(data.error || 'Failed to save banking details');
      }
    } catch (error) {
      console.error('Error saving banking details:', error);
      toast({
        title: "Error",
        description: "Failed to save banking details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (detail: BankingDetail) => {
    setEditingDetail(detail);
    setFormData({
      bank_name: detail.bank_name,
      account_holder_name: detail.account_holder_name,
      account_number: detail.account_number,
      branch_code: detail.branch_code,
      account_type: detail.account_type,
      is_primary: detail.is_primary
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banking detail?')) {
      return;
    }

    try {
      const response = await fetch(`/api/banking-details?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Banking details deleted successfully.",
        });
        fetchBankingDetails();
        onBankingDetailsChange?.();
      } else {
        throw new Error('Failed to delete banking details');
      }
    } catch (error) {
      console.error('Error deleting banking details:', error);
      toast({
        title: "Error",
        description: "Failed to delete banking details. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      bank_name: '',
      account_holder_name: '',
      account_number: '',
      branch_code: '',
      account_type: '',
      is_primary: false
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingDetail(null);
    resetForm();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading banking details...
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Banking Details</h3>
          <p className="text-sm text-gray-600">
            Manage your banking details for payments and debits
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleDialogClose()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Banking Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingDetail ? 'Edit Banking Details' : 'Add Banking Details'}
              </DialogTitle>
              <DialogDescription>
                {editingDetail 
                  ? 'Update your banking information.' 
                  : 'Add your banking details for payments and automatic debits.'
                }
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="bank_name">Bank Name</Label>
                <Input
                  id="bank_name"
                  value={formData.bank_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                  placeholder="e.g., Standard Bank, FNB, ABSA"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="account_holder_name">Account Holder Name</Label>
                <Input
                  id="account_holder_name"
                  value={formData.account_holder_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_holder_name: e.target.value }))}
                  placeholder="Full name as it appears on the account"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="account_number">Account Number</Label>
                <Input
                  id="account_number"
                  value={formData.account_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_number: e.target.value }))}
                  placeholder="Your bank account number"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="branch_code">Branch Code</Label>
                <Input
                  id="branch_code"
                  value={formData.branch_code}
                  onChange={(e) => setFormData(prev => ({ ...prev, branch_code: e.target.value }))}
                  placeholder="6-digit branch code"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="account_type">Account Type</Label>
                <Select
                  value={formData.account_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, account_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="cheque">Cheque Account</SelectItem>
                    <SelectItem value="business">Business Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_primary"
                  checked={formData.is_primary}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_primary: !!checked }))}
                />
                <Label htmlFor="is_primary" className="text-sm">
                  Set as primary payment method
                </Label>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleDialogClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    editingDetail ? 'Update' : 'Add'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banking Details List */}
      {bankingDetails.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Banking Details</h3>
            <p className="text-gray-600 mb-4">
              Add your banking details to enable payments and automatic debits.
            </p>
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Banking Details
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bankingDetails.map((detail) => (
            <Card key={detail.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{detail.bank_name}</h4>
                        {detail.is_primary && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Account Holder:</span> {detail.account_holder_name}
                        </div>
                        <div>
                          <span className="font-medium">Account Type:</span> {detail.account_type}
                        </div>
                        <div>
                          <span className="font-medium">Account Number:</span> ****{detail.account_number.slice(-4)}
                        </div>
                        <div>
                          <span className="font-medium">Branch Code:</span> {detail.branch_code}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(detail)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(detail.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
