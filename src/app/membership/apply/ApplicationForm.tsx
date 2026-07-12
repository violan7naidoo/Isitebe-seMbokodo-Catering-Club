'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Plus, Trash2 } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

const PACKAGE_OPTIONS = [
  { value: 'essential', label: 'Essential Package' },
  { value: 'comfort', label: 'Comfort Package' },
  { value: 'premium', label: 'Premium Package' },
] as const;

const dependantSchema = z.object({
  name: z.string().optional(),
  relationship: z.string().optional(),
  idNumber: z.string().optional(),
});

const beneficiarySchema = z.object({
  name: z.string().optional(),
  relationship: z.string().optional(),
  idNumber: z.string().optional(),
  contactNumber: z.string().optional(),
});

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Please enter your full name.' }),
  idNumber: z
    .string()
    .min(13, { message: 'Please enter a valid 13-digit South African ID number.' })
    .max(13, { message: 'Please enter a valid 13-digit South African ID number.' }),
  dateOfBirth: z.string().min(1, { message: 'Please provide your date of birth.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  address: z.string().min(5, { message: 'Please provide your physical address.' }),
  membershipPackage: z.enum(['essential', 'comfort', 'premium'], {
    required_error: 'Please select a membership package.',
  }),
  dependants: z.array(dependantSchema),
  beneficiaries: z.array(beneficiarySchema),
  paymentMethod: z.enum(['debit-order', 'eft', 'cash'], {
    required_error: 'Please select a payment method.',
  }),
  accountHolder: z.string().optional(),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountType: z.string().optional(),
  emergencyName: z.string().min(2, { message: 'Please provide an emergency contact name.' }),
  emergencyRelationship: z.string().min(2, { message: 'Please provide the relationship.' }),
  emergencyPhone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  declarationAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the declaration to submit your application.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const VALID_PACKAGES = ['essential', 'comfort', 'premium'] as const;

interface ApplicationFormProps {
  defaultPackage?: FormValues['membershipPackage'];
}

export function ApplicationForm({ defaultPackage }: ApplicationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      address: '',
      membershipPackage: defaultPackage,
      dependants: [{ name: '', relationship: '', idNumber: '' }],
      beneficiaries: [{ name: '', relationship: '', idNumber: '', contactNumber: '' }],
      paymentMethod: 'debit-order',
      accountHolder: '',
      bankName: '',
      accountNumber: '',
      accountType: '',
      emergencyName: '',
      emergencyRelationship: '',
      emergencyPhone: '',
      declarationAccepted: false,
    },
  });

  const dependantsArray = useFieldArray({ control: form.control, name: 'dependants' });
  const beneficiariesArray = useFieldArray({ control: form.control, name: 'beneficiaries' });

  const paymentMethod = form.watch('paymentMethod');

  function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    // Frontend-only application form: no backend/database is wired up yet.
    setTimeout(() => {
      console.log('Membership application submitted:', values);
      toast({
        title: 'Application received!',
        description:
          "Thank you for applying to Isithebe seMbokodo Catering Club. Our team will be in touch to confirm your membership.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 800);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>South African ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="13-digit ID number" maxLength={13} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 082 123 4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Physical Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Proof of residence not older than 3 months" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membership Package</CardTitle>
            <CardDescription>Choose the package you would like to apply for.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="membershipPackage"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-4 sm:grid-cols-3"
                    >
                      {PACKAGE_OPTIONS.map((option) => (
                        <FormItem key={option.value}>
                          <FormLabel className="flex items-center gap-3 rounded-lg border border-input p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <span className="font-normal">{option.label}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dependants</CardTitle>
            <CardDescription>Add any family members you would like covered under your membership (optional).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {dependantsArray.fields.map((item, index) => (
              <div key={item.id} className="grid gap-4 sm:grid-cols-3 rounded-lg border border-border/50 p-4 relative">
                <FormField
                  control={form.control}
                  name={`dependants.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dependant's name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`dependants.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Spouse, Child" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`dependants.${index}.idNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ID or birth certificate number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {dependantsArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background border"
                    onClick={() => dependantsArray.remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dependantsArray.append({ name: '', relationship: '', idNumber: '' })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Dependant
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiaries</CardTitle>
            <CardDescription>Nominate the person(s) who should be informed in the event of a claim.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {beneficiariesArray.fields.map((item, index) => (
              <div key={item.id} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 rounded-lg border border-border/50 p-4 relative">
                <FormField
                  control={form.control}
                  name={`beneficiaries.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Beneficiary's name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`beneficiaries.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Spouse, Sibling" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`beneficiaries.${index}.idNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="ID number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`beneficiaries.${index}.contactNumber`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {beneficiariesArray.fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-background border"
                    onClick={() => beneficiariesArray.remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                beneficiariesArray.append({ name: '', relationship: '', idNumber: '', contactNumber: '' })
              }
            >
              <Plus className="h-4 w-4 mr-2" /> Add Beneficiary
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you would like to pay your registration fee and monthly contribution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid gap-4 sm:grid-cols-3"
                    >
                      {[
                        { value: 'debit-order', label: 'Debit Order' },
                        { value: 'eft', label: 'EFT / Bank Transfer' },
                        { value: 'cash', label: 'Cash / In Person' },
                      ].map((option) => (
                        <FormItem key={option.value}>
                          <FormLabel className="flex items-center gap-3 rounded-lg border border-input p-4 cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <span className="font-normal">{option.label}</span>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === 'debit-order' && (
              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <FormField
                  control={form.control}
                  name="accountHolder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name as it appears on your bank account" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Standard Bank" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Account number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cheque">Cheque / Current</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="emergencyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Emergency contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyRelationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sister, Friend" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Declaration</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="declarationAccepted"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal leading-snug">
                      I declare that the information provided in this application is true and correct, and I agree to abide by the Isithebe seMbokodo Catering Club Membership Agreement, policies, and applicable waiting periods.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="text-center">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
