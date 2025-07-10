/**
 * Date utility functions
 * Built with rolldown-vite for date manipulation
 */

/**
 * Add days to a date
 * @param date - Base date
 * @param days - Number of days to add
 * @returns New date with added days
 */
export function addDays(date: Date, days: number): Date {
  console.log(`Adding ${days} days to date (rolldown-vite compiled)`)
  
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Add months to a date
 * @param date - Base date
 * @param months - Number of months to add
 * @returns New date with added months
 */
export function addMonths(date: Date, months: number): Date {
  console.log(`Adding ${months} months to date`)
  
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

/**
 * Add years to a date
 * @param date - Base date
 * @param years - Number of years to add
 * @returns New date with added years
 */
export function addYears(date: Date, years: number): Date {
  console.log(`Adding ${years} years to date`)
  
  const result = new Date(date)
  result.setFullYear(result.getFullYear() + years)
  return result
}

/**
 * Get difference between dates in days
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Difference in days
 */
export function diffInDays(date1: Date, date2: Date): number {
  console.log('Calculating difference in days between dates')
  
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

/**
 * Get difference between dates in hours
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Difference in hours
 */
export function diffInHours(date1: Date, date2: Date): number {
  console.log('Calculating difference in hours between dates')
  
  const timeDiff = Math.abs(date2.getTime() - date1.getTime())
  return Math.ceil(timeDiff / (1000 * 3600))
}

/**
 * Check if date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date): boolean {
  console.log('Checking if date is today')
  
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

/**
 * Check if date is yesterday
 * @param date - Date to check
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date): boolean {
  console.log('Checking if date is yesterday')
  
  const yesterday = addDays(new Date(), -1)
  return date.toDateString() === yesterday.toDateString()
}

/**
 * Check if date is tomorrow
 * @param date - Date to check
 * @returns True if date is tomorrow
 */
export function isTomorrow(date: Date): boolean {
  console.log('Checking if date is tomorrow')
  
  const tomorrow = addDays(new Date(), 1)
  return date.toDateString() === tomorrow.toDateString()
}

/**
 * Get start of day
 * @param date - Date to get start of day for
 * @returns Date at start of day (00:00:00)
 */
export function startOfDay(date: Date): Date {
  console.log('Getting start of day')
  
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

/**
 * Get end of day
 * @param date - Date to get end of day for
 * @returns Date at end of day (23:59:59.999)
 */
export function endOfDay(date: Date): Date {
  console.log('Getting end of day')
  
  const result = new Date(date)
  result.setHours(23, 59, 59, 999)
  return result
}

/**
 * Get start of week
 * @param date - Date to get start of week for
 * @param startOfWeek - Day of week to start (0 = Sunday, 1 = Monday)
 * @returns Date at start of week
 */
export function startOfWeek(date: Date, startOfWeek: number = 0): Date {
  console.log(`Getting start of week (starts on ${startOfWeek})`)
  
  const result = new Date(date)
  const day = result.getDay()
  const diff = (day < startOfWeek ? 7 : 0) + day - startOfWeek
  
  result.setDate(result.getDate() - diff)
  return startOfDay(result)
}

/**
 * Get end of week
 * @param date - Date to get end of week for
 * @param startOfWeek - Day of week to start (0 = Sunday, 1 = Monday)
 * @returns Date at end of week
 */
export function endOfWeek(date: Date, startOfWeek: number = 0): Date {
  console.log('Getting end of week')
  
  const start = startOfWeek(date, startOfWeek)
  const end = addDays(start, 6)
  return endOfDay(end)
}

/**
 * Format date as relative time
 * @param date - Date to format
 * @param locale - Locale for formatting
 * @returns Relative time string
 */
export function formatRelative(date: Date, locale: string = 'en-US'): string {
  console.log('Formatting date as relative time')
  
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  
  if (diffSec < 60) return 'just now'
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`
  if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`
  if (diffDay < 7) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`
  
  return new Intl.DateTimeFormat(locale).format(date)
}

/**
 * Check if year is leap year
 * @param year - Year to check
 * @returns True if leap year
 */
export function isLeapYear(year: number): boolean {
  console.log(`Checking if ${year} is a leap year`)
  
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
}

/**
 * Get days in month
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Number of days in month
 */
export function getDaysInMonth(year: number, month: number): number {
  console.log(`Getting days in month ${month + 1}/${year}`)
  
  return new Date(year, month + 1, 0).getDate()
}