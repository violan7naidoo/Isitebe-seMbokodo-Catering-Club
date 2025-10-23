-- Add payment_method column to user_memberships table if it doesn't exist
-- This script is safe to run multiple times

-- Check if the column exists and add it if it doesn't
DO $$ 
BEGIN
    -- Add payment_method column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_memberships' 
        AND column_name = 'payment_method'
    ) THEN
        ALTER TABLE user_memberships 
        ADD COLUMN payment_method VARCHAR(50) DEFAULT 'debit_order';
        
        -- Add a comment to the column
        COMMENT ON COLUMN user_memberships.payment_method IS 'Payment method for membership fees: debit_order, eft_transfer, cash_payment';
        
        -- Update existing records to have a default payment method
        UPDATE user_memberships 
        SET payment_method = 'debit_order' 
        WHERE payment_method IS NULL;
        
        RAISE NOTICE 'payment_method column added to user_memberships table';
    ELSE
        RAISE NOTICE 'payment_method column already exists in user_memberships table';
    END IF;
END $$;

-- Verify the column was added
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_memberships' 
AND column_name = 'payment_method';
