/**
 * Object utility functions
 * Built with rolldown-vite for advanced object manipulation
 */

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  console.log('Deep cloning object (rolldown-vite compiled)')
  
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T
  }
  
  if (typeof obj === 'object') {
    const cloned = {} as T
    Object.keys(obj).forEach(key => {
      cloned[key as keyof T] = deepClone((obj as any)[key])
    })
    return cloned
  }
  
  return obj
}

/**
 * Deep merge objects
 * @param target - Target object
 * @param sources - Source objects to merge
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T {
  console.log(`Deep merging ${sources.length} objects into target`)
  
  if (!sources.length) return target
  
  const source = sources.shift()
  if (!source) return target
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    })
  }
  
  return deepMerge(target, ...sources)
}

/**
 * Check if value is an object
 * @param item - Value to check
 * @returns True if object
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Get nested property value
 * @param obj - Object to search
 * @param path - Property path (dot notation)
 * @param defaultValue - Default value if not found
 * @returns Property value or default
 */
export function get<T = any>(obj: any, path: string, defaultValue?: T): T {
  console.log(`Getting nested property: ${path}`)
  
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result === null || result === undefined || !(key in result)) {
      return defaultValue as T
    }
    result = result[key]
  }
  
  return result
}

/**
 * Set nested property value
 * @param obj - Object to modify
 * @param path - Property path (dot notation)
 * @param value - Value to set
 * @returns Modified object
 */
export function set<T extends Record<string, any>>(obj: T, path: string, value: any): T {
  console.log(`Setting nested property: ${path}`)
  
  const keys = path.split('.')
  const lastKey = keys.pop()!
  
  let current = obj
  for (const key of keys) {
    if (!(key in current) || !isObject(current[key])) {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[lastKey] = value
  return obj
}

/**
 * Remove properties from object
 * @param obj - Object to modify
 * @param keys - Keys to remove
 * @returns Object without specified keys
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  console.log(`Omitting ${keys.length} keys from object`)
  
  const result = { ...obj }
  keys.forEach(key => delete result[key])
  return result
}

/**
 * Pick properties from object
 * @param obj - Object to pick from
 * @param keys - Keys to pick
 * @returns Object with only specified keys
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  console.log(`Picking ${keys.length} keys from object`)
  
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * Check if objects are deeply equal
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if deeply equal
 */
export function isEqual(obj1: any, obj2: any): boolean {
  console.log('Checking deep equality of objects')
  
  if (obj1 === obj2) return true
  
  if (obj1 == null || obj2 == null) return obj1 === obj2
  
  if (typeof obj1 !== typeof obj2) return false
  
  if (typeof obj1 !== 'object') return obj1 === obj2
  
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false
    if (!isEqual(obj1[key], obj2[key])) return false
  }
  
  return true
}

/**
 * Transform object keys
 * @param obj - Object to transform
 * @param transformer - Key transformation function
 * @returns Object with transformed keys
 */
export function transformKeys<T extends Record<string, any>>(
  obj: T,
  transformer: (key: string) => string
): Record<string, any> {
  console.log('Transforming object keys')
  
  const result: Record<string, any> = {}
  
  Object.keys(obj).forEach(key => {
    const newKey = transformer(key)
    result[newKey] = isObject(obj[key]) ? transformKeys(obj[key], transformer) : obj[key]
  })
  
  return result
}