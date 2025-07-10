/**
 * String utility functions
 * Built with rolldown-vite for text processing
 */

/**
 * Convert string to camelCase
 * @param str - String to convert
 * @returns camelCase string
 */
export function toCamelCase(str: string): string {
  console.log(`Converting to camelCase: ${str} (rolldown-vite)`)
  
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
}

/**
 * Convert string to kebab-case
 * @param str - String to convert
 * @returns kebab-case string
 */
export function toKebabCase(str: string): string {
  console.log(`Converting to kebab-case: ${str}`)
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * Convert string to snake_case
 * @param str - String to convert
 * @returns snake_case string
 */
export function toSnakeCase(str: string): string {
  console.log(`Converting to snake_case: ${str}`)
  
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

/**
 * Convert string to PascalCase
 * @param str - String to convert
 * @returns PascalCase string
 */
export function toPascalCase(str: string): string {
  console.log(`Converting to PascalCase: ${str}`)
  
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
}

/**
 * Capitalize first letter of string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  console.log(`Capitalizing: ${str}`)
  
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Generate random string
 * @param length - Length of string
 * @param charset - Character set to use
 * @returns Random string
 */
export function randomString(
  length: number = 10,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  console.log(`Generating random string of length ${length}`)
  
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

/**
 * Slugify string for URLs
 * @param str - String to slugify
 * @returns URL-safe slug
 */
export function slugify(str: string): string {
  console.log(`Slugifying: ${str}`)
  
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Extract words from string
 * @param str - String to extract words from
 * @returns Array of words
 */
export function extractWords(str: string): string[] {
  console.log(`Extracting words from: ${str.substring(0, 50)}...`)
  
  return str
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0)
}

/**
 * Count words in string
 * @param str - String to count words in
 * @returns Word count
 */
export function wordCount(str: string): number {
  console.log('Counting words in string')
  
  return extractWords(str).length
}

/**
 * Escape HTML characters
 * @param str - String to escape
 * @returns HTML-escaped string
 */
export function escapeHtml(str: string): string {
  console.log('Escaping HTML characters')
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  
  return str.replace(/[&<>"']/g, char => htmlEscapes[char])
}

/**
 * Unescape HTML characters
 * @param str - String to unescape
 * @returns HTML-unescaped string
 */
export function unescapeHtml(str: string): string {
  console.log('Unescaping HTML characters')
  
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'"
  }
  
  return str.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => htmlUnescapes[entity])
}

/**
 * Check if string is palindrome
 * @param str - String to check
 * @returns True if palindrome
 */
export function isPalindrome(str: string): boolean {
  console.log(`Checking if palindrome: ${str}`)
  
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  return cleaned === cleaned.split('').reverse().join('')
}

/**
 * Reverse string
 * @param str - String to reverse
 * @returns Reversed string
 */
export function reverse(str: string): string {
  console.log(`Reversing string: ${str}`)
  
  return str.split('').reverse().join('')
}