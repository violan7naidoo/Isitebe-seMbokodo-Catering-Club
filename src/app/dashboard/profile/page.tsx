'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Edit, 
  Save, 
  X,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ProfileSkeleton } from '@/components/dashboard/ProfileSkeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at: string;
  membership_number?: string;
  membership_status?: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  
  // Dialog states
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false);
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  // Form data for updates
  const [emailData, setEmailData] = useState({ email: '' });
  const [phoneData, setPhoneData] = useState({ phone: '' });
  const [addressData, setAddressData] = useState({ address: '' });
  const [passwordData, setPasswordData] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-profile');
      const data = await response.json();
      
      if (response.ok) {
        setProfile(data);
        setEditData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || ''
        });
      } else {
        console.error('Error fetching profile:', data.error);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      email: profile?.email || ''
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setEditing(false);
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
      } else {
        throw new Error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update email function
  const handleUpdateEmail = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setEmailDialogOpen(false);
        setEmailData({ email: '' });
        toast({
          title: "Email Updated",
          description: "Your email has been successfully updated. You can now login with your new email.",
        });
      } else {
        throw new Error(data.error || 'Failed to update email');
      }
    } catch (error) {
      console.error('Error updating email:', error);
      toast({
        title: "Error",
        description: "Failed to update email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update phone function
  const handleUpdatePhone = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneData.phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setPhoneDialogOpen(false);
        setPhoneData({ phone: '' });
        toast({
          title: "Phone Updated",
          description: "Your phone number has been successfully updated.",
        });
      } else {
        throw new Error(data.error || 'Failed to update phone');
      }
    } catch (error) {
      console.error('Error updating phone:', error);
      toast({
        title: "Error",
        description: "Failed to update phone number. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update address function
  const handleUpdateAddress = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: addressData.address }),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data);
        setAddressDialogOpen(false);
        setAddressData({ address: '' });
        toast({
          title: "Address Updated",
          description: "Your address has been successfully updated.",
        });
      } else {
        throw new Error(data.error || 'Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Error",
        description: "Failed to update address. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Change password function
  const handleChangePassword = async () => {
    try {
      setSaving(true);
      
      // Validate passwords match
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast({
          title: "Error",
          description: "New passwords do not match.",
          variant: "destructive",
        });
        return;
      }

      // Validate password length
      if (passwordData.newPassword.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordDialogOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        toast({
          title: "Password Updated",
          description: "Your password has been successfully updated.",
        });
      } else {
        throw new Error(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: "Failed to update password. Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (authLoading || loading) {
    return <ProfileSkeleton />;
  }

  if (!user || !profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Profile Not Found</h2>
          <p className="mt-2 text-gray-600">
            Unable to load your profile information.
          </p>
        </div>
      </div>
    );
  }

  const getMembershipStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
        </div>
        {!editing && (
          <Button onClick={handleEdit} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic account details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        value={editData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="last_name">Last Name</Label>
                      <Input
                        id="last_name"
                        value={editData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">
                          {profile.first_name} {profile.last_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="font-medium">{profile.phone}</p>
                        </div>
                      </div>
                    )}
                    {profile.address && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p className="font-medium">{profile.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your account status and membership details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(profile.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {profile.membership_number && (
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Membership Number</p>
                      <p className="font-medium font-mono">{profile.membership_number}</p>
                    </div>
                  </div>
                )}
                {profile.membership_status && (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Membership Status</p>
                      <Badge className={getMembershipStatusColor(profile.membership_status)}>
                        {profile.membership_status}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Privacy
              </CardTitle>
              <CardDescription>
                Manage your account security and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Change Password</h3>
                  <p className="text-sm text-gray-600">Update your account password</p>
                </div>
                <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your current password and choose a new password.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          placeholder="Confirm your new password"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleChangePassword} 
                        disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                      >
                        {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Change Password
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Account Deletion</h3>
                  <p className="text-sm text-gray-600">Permanently delete your account</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{profile.first_name} {profile.last_name}</p>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Status</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Verified</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="text-sm">{new Date(profile.created_at).toLocaleDateString()}</span>
                </div>
                {profile.membership_number && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membership Number</span>
                    <span className="text-sm font-medium text-blue-600">#{profile.membership_number}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Update Email
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Email Address</DialogTitle>
                    <DialogDescription>
                      Enter your new email address. You will be able to login with this new email.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">New Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={emailData.email}
                        onChange={(e) => setEmailData({ email: e.target.value })}
                        placeholder="Enter your new email address"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateEmail} disabled={saving || !emailData.email}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Update Email
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={phoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="h-4 w-4 mr-2" />
                    {profile?.phone ? 'Update Phone' : 'Add Phone Number'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{profile?.phone ? 'Update Phone Number' : 'Add Phone Number'}</DialogTitle>
                    <DialogDescription>
                      {profile?.phone ? 'Update your phone number.' : 'Add your phone number to your profile.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneData.phone}
                        onChange={(e) => setPhoneData({ phone: e.target.value })}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPhoneDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdatePhone} disabled={saving || !phoneData.phone}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {profile?.phone ? 'Update Phone' : 'Add Phone'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    {profile?.address ? 'Update Address' : 'Add Address'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{profile?.address ? 'Update Address' : 'Add Address'}</DialogTitle>
                    <DialogDescription>
                      {profile?.address ? 'Update your address.' : 'Add your address to your profile.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        type="text"
                        value={addressData.address}
                        onChange={(e) => setAddressData({ address: e.target.value })}
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddressDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateAddress} disabled={saving || !addressData.address}>
                      {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      {profile?.address ? 'Update Address' : 'Add Address'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-gray-600">Days as Member</div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">1</div>
                  <div className="text-xs text-gray-600">Membership</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">0</div>
                  <div className="text-xs text-gray-600">Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}