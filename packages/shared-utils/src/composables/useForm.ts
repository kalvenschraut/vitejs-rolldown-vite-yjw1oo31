/**
 * Form handling composable
 * Built with rolldown-vite for advanced form management
 */

import { ref, reactive, computed, watch } from 'vue'

export interface FormField {
  value: any
  error: string | null
  touched: boolean
  dirty: boolean
}

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

export interface FormSchema {
  [key: string]: {
    initialValue?: any
    rules?: ValidationRule
  }
}

/**
 * Composable for form state management and validation
 * @param schema - Form field definitions
 * @returns Form state and methods
 */
export function useForm<T extends Record<string, any>>(schema: FormSchema) {
  console.log('Initializing useForm composable (rolldown-vite compiled)')
  
  // Initialize form fields
  const fields = reactive<Record<string, FormField>>({})
  const formData = reactive<T>({} as T)
  
  // Setup fields from schema
  Object.keys(schema).forEach(key => {
    const fieldSchema = schema[key]
    fields[key] = {
      value: fieldSchema.initialValue || '',
      error: null,
      touched: false,
      dirty: false
    }
    formData[key as keyof T] = fieldSchema.initialValue || ''
  })
  
  const isSubmitting = ref(false)
  const submitCount = ref(0)
  
  // Computed properties
  const isValid = computed(() => 
    Object.values(fields).every(field => !field.error)
  )
  
  const isDirty = computed(() =>
    Object.values(fields).some(field => field.dirty)
  )
  
  const touchedFields = computed(() =>
    Object.values(fields).filter(field => field.touched)
  )
  
  const errors = computed(() => {
    const errorObj: Record<string, string> = {}
    Object.keys(fields).forEach(key => {
      if (fields[key].error) {
        errorObj[key] = fields[key].error!
      }
    })
    return errorObj
  })
  
  // Validation function
  const validateField = (fieldName: string, value: any): string | null => {
    const rules = schema[fieldName]?.rules
    if (!rules) return null
    
    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return `${fieldName} is required`
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) return null
    
    // Min length validation
    if (rules.minLength && value.toString().length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`
    }
    
    // Max length validation
    if (rules.maxLength && value.toString().length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value.toString())) {
      return `${fieldName} format is invalid`
    }
    
    // Custom validation
    if (rules.custom) {
      return rules.custom(value)
    }
    
    return null
  }
  
  // Field methods
  const setFieldValue = (fieldName: string, value: any) => {
    if (fields[fieldName]) {
      const oldValue = fields[fieldName].value
      fields[fieldName].value = value
      fields[fieldName].dirty = value !== schema[fieldName]?.initialValue
      formData[fieldName as keyof T] = value
      
      // Validate on change if field was touched
      if (fields[fieldName].touched) {
        fields[fieldName].error = validateField(fieldName, value)
      }
      
      console.log(`Field ${fieldName} updated:`, { oldValue, newValue: value })
    }
  }
  
  const setFieldTouched = (fieldName: string, touched = true) => {
    if (fields[fieldName]) {
      fields[fieldName].touched = touched
      
      // Validate when field is touched
      if (touched) {
        fields[fieldName].error = validateField(fieldName, fields[fieldName].value)
      }
    }
  }
  
  const setFieldError = (fieldName: string, error: string | null) => {
    if (fields[fieldName]) {
      fields[fieldName].error = error
    }
  }
  
  // Form methods
  const validateForm = (): boolean => {
    let hasErrors = false
    
    Object.keys(fields).forEach(fieldName => {
      const error = validateField(fieldName, fields[fieldName].value)
      fields[fieldName].error = error
      fields[fieldName].touched = true
      
      if (error) hasErrors = true
    })
    
    console.log('Form validation result:', { hasErrors, errors: errors.value })
    return !hasErrors
  }
  
  const resetForm = () => {
    Object.keys(fields).forEach(fieldName => {
      const initialValue = schema[fieldName]?.initialValue || ''
      fields[fieldName] = {
        value: initialValue,
        error: null,
        touched: false,
        dirty: false
      }
      formData[fieldName as keyof T] = initialValue
    })
    
    isSubmitting.value = false
    submitCount.value = 0
    console.log('Form reset to initial state')
  }
  
  const submitForm = async (onSubmit: (data: T) => Promise<void> | void) => {
    submitCount.value++
    
    if (!validateForm()) {
      console.warn('Form submission blocked due to validation errors')
      return false
    }
    
    isSubmitting.value = true
    
    try {
      await onSubmit(formData)
      console.log('Form submitted successfully:', formData)
      return true
    } catch (error) {
      console.error('Form submission error:', error)
      return false
    } finally {
      isSubmitting.value = false
    }
  }
  
  // Watch for changes to provide reactive updates
  watch(formData, (newData) => {
    console.log('Form data changed:', newData)
  }, { deep: true })
  
  return {
    // State
    fields,
    formData,
    isSubmitting,
    submitCount,
    
    // Computed
    isValid,
    isDirty,
    touchedFields,
    errors,
    
    // Methods
    setFieldValue,
    setFieldTouched,
    setFieldError,
    validateForm,
    resetForm,
    submitForm
  }
}