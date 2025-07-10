/**
 * Debounce composable for performance optimization
 * Built with rolldown-vite for reactive debouncing
 */

import { ref, watch, type Ref } from 'vue'

/**
 * Debounce a reactive value
 * @param value - Reactive value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced reactive value
 */
export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  console.log(`Initializing useDebounce with delay: ${delay}ms (rolldown-vite)`)
  
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timeoutId: number | null = null
  
  watch(value, (newValue) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = window.setTimeout(() => {
      debouncedValue.value = newValue
      console.log('Debounced value updated:', newValue)
    }, delay)
  })
  
  return debouncedValue
}

/**
 * Debounce a function call
 * @param fn - Function to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced function
 */
export function useDebouncedFunction<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 300
): T {
  console.log(`Creating debounced function with delay: ${delay}ms`)
  
  let timeoutId: number | null = null
  
  return ((...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = window.setTimeout(() => {
      fn(...args)
      console.log('Debounced function executed with args:', args)
    }, delay)
  }) as T
}

/**
 * Throttle a reactive value
 * @param value - Reactive value to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns Throttled reactive value
 */
export function useThrottle<T>(value: Ref<T>, delay: number = 300): Ref<T> {
  console.log(`Initializing useThrottle with delay: ${delay}ms (rolldown-vite)`)
  
  const throttledValue = ref<T>(value.value) as Ref<T>
  let lastUpdate = 0
  let timeoutId: number | null = null
  
  watch(value, (newValue) => {
    const now = Date.now()
    const timeSinceLastUpdate = now - lastUpdate
    
    if (timeSinceLastUpdate >= delay) {
      throttledValue.value = newValue
      lastUpdate = now
      console.log('Throttled value updated immediately:', newValue)
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = window.setTimeout(() => {
        throttledValue.value = newValue
        lastUpdate = Date.now()
        console.log('Throttled value updated after delay:', newValue)
      }, delay - timeSinceLastUpdate)
    }
  })
  
  return throttledValue
}