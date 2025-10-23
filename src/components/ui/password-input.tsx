import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validatePassword, getPasswordStrengthColor, getPasswordStrengthText, type PasswordValidation } from '@/lib/password-validation';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  showValidation?: boolean;
  onValidationChange?: (validation: PasswordValidation) => void;
  currentPassword?: string;
  confirmPassword?: string;
}

export function PasswordInput({ 
  className, 
  showValidation = false, 
  onValidationChange,
  currentPassword,
  confirmPassword,
  value,
  ...props 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<PasswordValidation>({
    isValid: false,
    errors: [],
    strength: 'weak'
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (showValidation && value) {
      const passwordValidation = validatePassword(value as string, currentPassword, confirmPassword);
      setValidation(passwordValidation);
      onValidationChange?.(passwordValidation);
    }
  }, [value, showValidation, onValidationChange, currentPassword, confirmPassword]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...props}
          value={value}
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      </div>
      
      {showValidation && value && (
        <div className="space-y-2">
          {/* Password Strength Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Password strength:</span>
            <span className={cn('text-sm font-medium', getPasswordStrengthColor(validation.strength))}>
              {getPasswordStrengthText(validation.strength)}
            </span>
            {validation.isValid ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          
          {/* Validation Errors */}
          {validation.errors.length > 0 && (
            <div className="space-y-1">
              {validation.errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-red-600">
                  <XCircle className="h-3 w-3 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Password Requirements */}
          <div className="text-xs text-gray-500 space-y-1">
            <div>Password requirements:</div>
            <div>• 6-15 characters</div>
            <div>• At least 1 number</div>
            <div>• At least 1 capital letter</div>
          </div>
        </div>
      )}
    </div>
  );
}
