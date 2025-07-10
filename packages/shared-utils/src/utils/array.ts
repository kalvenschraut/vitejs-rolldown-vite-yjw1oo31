/**
 * Array utility functions
 * Built with rolldown-vite for tree-shaking optimization
 */

/**
 * Remove duplicates from an array
 * @param array - Array to deduplicate
 * @param key - Optional key function for object arrays
 * @returns Array without duplicates
 */
export function unique<T>(array: T[], key?: (item: T) => any): T[] {
  console.log(`Removing duplicates from array of ${array.length} items (rolldown-vite)`)
  
  if (key) {
    const seen = new Set()
    return array.filter(item => {
      const keyValue = key(item)
      if (seen.has(keyValue)) {
        return false
      }
      seen.add(keyValue)
      return true
    })
  }
  
  return [...new Set(array)]
}

/**
 * Group array items by a key
 * @param array - Array to group
 * @param key - Key function or property name
 * @returns Grouped object
 */
export function groupBy<T>(
  array: T[],
  key: keyof T | ((item: T) => string | number)
): Record<string, T[]> {
  console.log(`Grouping array of ${array.length} items`)
  
  const getKey = typeof key === 'function' ? key : (item: T) => item[key] as string | number
  
  return array.reduce((groups, item) => {
    const groupKey = String(getKey(item))
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by multiple criteria
 * @param array - Array to sort
 * @param sortBy - Sort criteria
 * @returns Sorted array
 */
export function sortBy<T>(
  array: T[],
  sortBy: Array<{
    key: keyof T | ((item: T) => any)
    direction?: 'asc' | 'desc'
  }>
): T[] {
  console.log(`Sorting array by ${sortBy.length} criteria`)
  
  return [...array].sort((a, b) => {
    for (const criteria of sortBy) {
      const { key, direction = 'asc' } = criteria
      const getValue = typeof key === 'function' ? key : (item: T) => item[key]
      
      const aVal = getValue(a)
      const bVal = getValue(b)
      
      let comparison = 0
      if (aVal < bVal) comparison = -1
      else if (aVal > bVal) comparison = 1
      
      if (comparison !== 0) {
        return direction === 'desc' ? -comparison : comparison
      }
    }
    return 0
  })
}

/**
 * Chunk array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  console.log(`Chunking array of ${array.length} items into size ${size}`)
  
  if (size <= 0) throw new Error('Chunk size must be positive')
  
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

/**
 * Flatten nested arrays
 * @param array - Array to flatten
 * @param depth - Depth to flatten (default: 1)
 * @returns Flattened array
 */
export function flatten<T>(array: any[], depth: number = 1): T[] {
  console.log(`Flattening array with depth ${depth}`)
  
  if (depth <= 0) return array
  
  return array.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val, depth - 1))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

/**
 * Find intersection of multiple arrays
 * @param arrays - Arrays to intersect
 * @returns Intersection array
 */
export function intersection<T>(...arrays: T[][]): T[] {
  console.log(`Finding intersection of ${arrays.length} arrays`)
  
  if (arrays.length === 0) return []
  if (arrays.length === 1) return arrays[0]
  
  return arrays.reduce((acc, current) =>
    acc.filter(item => current.includes(item))
  )
}

/**
 * Find difference between arrays
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Items in array1 but not in array2
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  console.log(`Finding difference between arrays of size ${array1.length} and ${array2.length}`)
  
  return array1.filter(item => !array2.includes(item))
}

/**
 * Shuffle array randomly
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  console.log(`Shuffling array of ${array.length} items`)
  
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}