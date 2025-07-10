/**
 * API composable for HTTP requests
 * Built with rolldown-vite for code splitting demonstration
 */

import { ref, computed } from 'vue'

export interface ApiResponse<T = any> {
  data: T | null
  error: string | null
  loading: boolean
  status: number | null
}

export interface ApiOptions {
  baseURL?: string
  headers?: Record<string, string>
  timeout?: number
}

/**
 * Composable for making HTTP requests
 * @param options - API configuration options
 * @returns API methods and state
 */
export function useApi(options: ApiOptions = {}) {
  console.log('Initializing useApi composable (rolldown-vite compiled)')
  
  const { baseURL = '', headers = {}, timeout = 5000 } = options
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers
  }
  
  const makeRequest = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> => {
    loading.value = true
    error.value = null
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(`${baseURL}${url}`, {
        headers: defaultHeaders,
        signal: controller.signal,
        ...options
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      return {
        data,
        error: null,
        loading: false,
        status: response.status
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error.value = errorMessage
      
      return {
        data: null,
        error: errorMessage,
        loading: false,
        status: null
      }
    } finally {
      loading.value = false
    }
  }
  
  const get = <T>(url: string, options?: RequestInit) =>
    makeRequest<T>(url, { method: 'GET', ...options })
  
  const post = <T>(url: string, data?: any, options?: RequestInit) =>
    makeRequest<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    })
  
  const put = <T>(url: string, data?: any, options?: RequestInit) =>
    makeRequest<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    })
  
  const del = <T>(url: string, options?: RequestInit) =>
    makeRequest<T>(url, { method: 'DELETE', ...options })
  
  return {
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    get,
    post,
    put,
    delete: del,
    request: makeRequest
  }
}