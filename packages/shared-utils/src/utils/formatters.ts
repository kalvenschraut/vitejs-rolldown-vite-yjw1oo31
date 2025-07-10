/**
 * Formatting utilities built with rolldown-vite
 * Demonstrates advanced TypeScript features and utility functions
 */

/**
 * Currency formatting options
 */
export interface CurrencyOptions {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * Date formatting options
 */
export interface DateFormatOptions {
  locale?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
  includeTime?: boolean;
}

/**
 * Format currency values with internationalization support
 * @param amount - Numeric amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, options: CurrencyOptions = {}): string {
  console.log(`Formatting currency: ${amount} (rolldown-vite compiled)`);
  
  const {
    currency = 'USD',
    locale = 'en-US',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount);
}

/**
 * Format dates with flexible options
 * @param date - Date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(date: Date | string | number, options: DateFormatOptions = {}): string {
  console.log('Formatting date with rolldown-vite formatter');
  
  const dateObj = new Date(date);
  const {
    locale = 'en-US',
    dateStyle = 'medium',
    timeStyle,
    includeTime = false
  } = options;
  
  const formatOptions: Intl.DateTimeFormatOptions = { dateStyle };
  
  if (includeTime || timeStyle) {
    formatOptions.timeStyle = timeStyle || 'short';
  }
  
  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
}

/**
 * Format file sizes in human-readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  console.log(`Formatting file size: ${bytes} bytes`);
  
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format phone numbers (US format)
 * @param phoneNumber - Raw phone number string
 * @returns Formatted phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  console.log(`Formatting phone number: ${phoneNumber}`);
  
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if it's a valid US phone number length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phoneNumber; // Return original if not valid format
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  console.log(`Truncating text: "${text.substring(0, 20)}..." to ${maxLength} chars`);
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength - suffix.length) + suffix;
}

/**
 * Format numbers with thousand separators
 * @param num - Number to format
 * @param locale - Locale for formatting
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  console.log(`Formatting number: ${num} with locale: ${locale}`);
  
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Convert camelCase to Title Case
 * @param camelStr - camelCase string
 * @returns Title Case string
 */
export function camelToTitle(camelStr: string): string {
  console.log(`Converting camelCase to Title Case: ${camelStr}`);
  
  return camelStr
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}