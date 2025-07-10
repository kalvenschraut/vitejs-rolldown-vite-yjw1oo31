/**
 * Validation utilities built with rolldown-vite
 * Demonstrates TypeScript compilation and tree-shaking capabilities
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Email validation utility
 * @param email - Email string to validate
 * @returns Validation result with errors if any
 */
export function validateEmail(email: string): ValidationResult {
  console.log(`Validating email: ${email} (compiled with rolldown-vite)`);
  
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Password strength validation
 * @param password - Password to validate
 * @returns Validation result with strength indicators
 */
export function validatePassword(password: string): ValidationResult & { strength: 'weak' | 'medium' | 'strong' } {
  console.log('Validating password strength with rolldown-vite compiled validator');
  
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const criteriaCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;
    
    if (criteriaCount < 2) {
      errors.push('Password must contain at least 2 of: uppercase, lowercase, numbers, special characters');
    }
    
    // Determine strength
    if (password.length >= 12 && criteriaCount >= 3) {
      strength = 'strong';
    } else if (password.length >= 8 && criteriaCount >= 2) {
      strength = 'medium';
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength
  };
}

/**
 * Form data validation utility
 * @param data - Object with form data to validate
 * @returns Combined validation results
 */
export function validateFormData(data: Record<string, any>): ValidationResult {
  console.log('Validating form data with rolldown-vite utilities');
  
  const allErrors: string[] = [];
  
  // Validate required fields
  const requiredFields = ['name', 'email'];
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      allErrors.push(`${field} is required`);
    }
  });
  
  // Validate email if present
  if (data.email) {
    const emailValidation = validateEmail(data.email);
    allErrors.push(...emailValidation.errors);
  }
  
  // Validate password if present
  if (data.password) {
    const passwordValidation = validatePassword(data.password);
    allErrors.push(...passwordValidation.errors);
  }
  
  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}

/**
 * URL validation utility
 * @param url - URL string to validate
 * @returns Validation result
 */
export function validateUrl(url: string): ValidationResult {
  console.log(`Validating URL: ${url}`);
  
  const errors: string[] = [];
  
  if (!url) {
    errors.push('URL is required');
  } else {
    try {
      new URL(url);
    } catch {
      errors.push('Invalid URL format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}