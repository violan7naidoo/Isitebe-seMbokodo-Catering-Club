#!/bin/bash

# Fix cookies await issue in all API routes
# This script adds await to all cookies() calls

echo "Fixing cookies await issue in all API routes..."

# List of files to fix
files=(
    "src/app/api/payments/create/route.ts"
    "src/app/api/payments/notify/route.ts"
    "src/app/api/payments/route.ts"
    "src/app/api/user-profile/route.ts"
    "src/app/api/membership/route.ts"
    "src/app/api/membership-plans/route.ts"
    "src/app/api/user-membership/route.ts"
    "src/app/api/test-banking/route.ts"
    "src/app/api/test-db/route.ts"
    "src/app/api/test-schema/route.ts"
)

# Fix each file
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "Fixing $file..."
        # Replace cookies() with await cookies()
        sed -i 's/const cookieStore = cookies();/const cookieStore = await cookies();/g' "$file"
        echo "✅ Fixed $file"
    else
        echo "⚠️  File not found: $file"
    fi
done

echo "✅ All files fixed!"
