/**
 * Form Validators
 *
 * Common validation functions for form inputs.
 */

export const validators = {
  required: (value: string): string | undefined => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return undefined;
  },

  email: (value: string): string | undefined => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  },

  url: (value: string): string | undefined => {
    if (!value) return undefined;
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  minLength: (min: number) => (value: string): string | undefined => {
    if (!value) return undefined;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return undefined;
  },

  maxLength: (max: number) => (value: string): string | undefined => {
    if (!value) return undefined;
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return undefined;
  },

  year: (value: string): string | undefined => {
    if (!value) return undefined;
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear + 10) {
      return `Please enter a valid year between 1900 and ${currentYear + 10}`;
    }
    return undefined;
  },
} as const;
