-- Populate membership plans table with sample data
-- Run this in your Supabase SQL Editor

-- Insert sample membership plans
INSERT INTO membership_plans (name, description, price, duration_months, features, is_popular) VALUES
(
  'Basic Plan',
  'Perfect for individuals starting their catering journey',
  299,
  1,
  ARRAY[
    'Access to basic recipes',
    'Monthly newsletter',
    'Community forum access',
    'Basic support'
  ],
  false
),
(
  'Professional Plan',
  'Ideal for established caterers looking to grow',
  599,
  3,
  ARRAY[
    'All Basic Plan features',
    'Advanced recipes and techniques',
    'Priority support',
    'Monthly webinars',
    'Business planning tools',
    'Marketing templates'
  ],
  true
),
(
  'Premium Plan',
  'Complete solution for catering businesses',
  999,
  6,
  ARRAY[
    'All Professional Plan features',
    '1-on-1 business coaching',
    'Custom recipe development',
    'Equipment recommendations',
    'Vendor partnerships',
    'Advanced analytics',
    'Priority booking system'
  ],
  false
);

-- Verify the data was inserted
SELECT * FROM membership_plans ORDER BY price;
