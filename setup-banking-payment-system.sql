-- Setup Banking and Payment System
-- Run this in your Supabase SQL Editor

-- Create banking_details table for storing user banking information
CREATE TABLE IF NOT EXISTS banking_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bank_name TEXT NOT NULL,
  account_holder_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  branch_code TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('savings', 'cheque', 'business')),
  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE banking_details ENABLE ROW LEVEL SECURITY;

-- Create policies for banking_details
CREATE POLICY "Users can view own banking details" ON banking_details
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own banking details" ON banking_details
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own banking details" ON banking_details
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own banking details" ON banking_details
  FOR DELETE USING (auth.uid() = user_id);

-- Update payments table to include more fields for PayFast integration
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payfast_merchant_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payfast_merchant_key TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payfast_signature TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payfast_payment_id TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payfast_token TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS payment_method_details JSONB;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS callback_data JSONB;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS return_url TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS cancel_url TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS notify_url TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_banking_details_user_id ON banking_details(user_id);
CREATE INDEX IF NOT EXISTS idx_banking_details_is_primary ON banking_details(is_primary);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.banking_details TO anon, authenticated;
GRANT ALL ON public.payments TO anon, authenticated;

-- Add comments for documentation
COMMENT ON TABLE banking_details IS 'Stores user banking details for payment processing';
COMMENT ON COLUMN banking_details.bank_name IS 'Name of the bank';
COMMENT ON COLUMN banking_details.account_holder_name IS 'Name of the account holder';
COMMENT ON COLUMN banking_details.account_number IS 'Bank account number';
COMMENT ON COLUMN banking_details.branch_code IS 'Bank branch code';
COMMENT ON COLUMN banking_details.account_type IS 'Type of account: savings, cheque, or business';
COMMENT ON COLUMN banking_details.is_primary IS 'Whether this is the primary payment method';
COMMENT ON COLUMN banking_details.is_active IS 'Whether this banking detail is active';

COMMENT ON COLUMN payments.payfast_merchant_id IS 'PayFast merchant ID for this payment';
COMMENT ON COLUMN payments.payfast_merchant_key IS 'PayFast merchant key for this payment';
COMMENT ON COLUMN payments.payfast_signature IS 'PayFast signature for verification';
COMMENT ON COLUMN payments.payfast_payment_id IS 'PayFast payment ID';
COMMENT ON COLUMN payments.payfast_token IS 'PayFast token';
COMMENT ON COLUMN payments.payment_method_details IS 'Additional payment method details as JSON';
COMMENT ON COLUMN payments.callback_data IS 'Data received from PayFast callbacks';
COMMENT ON COLUMN payments.return_url IS 'URL to redirect after successful payment';
COMMENT ON COLUMN payments.cancel_url IS 'URL to redirect after cancelled payment';
COMMENT ON COLUMN payments.notify_url IS 'URL for PayFast to send notifications';
