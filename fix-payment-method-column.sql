-- Fix payment method column name if it was created incorrectly
-- This script checks for common variations and fixes them

-- Check if the column exists with different names
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_memberships' 
AND (column_name LIKE '%payment%' OR column_name LIKE '%payme%');

-- If the column is named 'payme' instead of 'payment_method', rename it
DO $$ 
BEGIN
    -- Check if 'payme' column exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_memberships' 
        AND column_name = 'payme'
    ) THEN
        -- Rename the column from 'payme' to 'payment_method'
        ALTER TABLE user_memberships 
        RENAME COLUMN payme TO payment_method;
        
        RAISE NOTICE 'Column renamed from payme to payment_method';
    END IF;
    
    -- Check if 'payment' column exists (without _method)
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_memberships' 
        AND column_name = 'payment'
    ) THEN
        -- Rename the column from 'payment' to 'payment_method'
        ALTER TABLE user_memberships 
        RENAME COLUMN payment TO payment_method;
        
        RAISE NOTICE 'Column renamed from payment to payment_method';
    END IF;
END $$;

-- If payment_method column doesn't exist at all, create it
DO $$ 
BEGIN
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
        
        RAISE NOTICE 'payment_method column created';
    END IF;
END $$;

-- Verify the final column structure
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_memberships' 
AND column_name = 'payment_method';
