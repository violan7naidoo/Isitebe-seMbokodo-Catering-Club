'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  values: z.infer<typeof contactFormSchema>
): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid form data. Please check your entries.',
    };
  }

  // In a real-world application, you would integrate with an email service
  // like SendGrid, Resend, or Nodemailer to send the email.
  console.log('Form data received:', validatedFields.data);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a successful submission
  return {
    success: true,
    message: "Thank you for your message! We'll be in touch soon.",
  };
}
