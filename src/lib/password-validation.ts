export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
  strength: 'weak' | 'medium' | 'strong';
}

export const validatePassword = (password: string, currentPassword?: string, confirmPassword?: string): PasswordValidation => {
  const errors: string[] = [];
  
  // Check if password is the same as current password
  if (currentPassword && password === currentPassword) {
    errors.push('New password must be different from your current password');
  }
  
  // Check if passwords match for confirmation
  if (confirmPassword && password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  // Check length
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (password.length > 15) {
    errors.push('Password must be no more than 15 characters long');
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for at least one capital letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one capital letter');
  }
  
  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  if (errors.length === 0) {
    if (password.length >= 12 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength = 'strong';
    } else if (password.length >= 8) {
      strength = 'medium';
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength
  };
};

export const getPasswordStrengthColor = (strength: 'weak' | 'medium' | 'strong') => {
  switch (strength) {
    case 'weak':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'strong':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export const getPasswordStrengthText = (strength: 'weak' | 'medium' | 'strong') => {
  switch (strength) {
    case 'weak':
      return 'Weak';
    case 'medium':
      return 'Medium';
    case 'strong':
      return 'Strong';
    default:
      return '';
  }
};
