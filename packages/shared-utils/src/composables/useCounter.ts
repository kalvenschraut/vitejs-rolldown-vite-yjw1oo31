/**
 * Vue composable for counter functionality
 * Built with rolldown-vite to demonstrate Vue 3 + TypeScript compilation
 */

import { ref, computed, watch } from 'vue';

export interface CounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface CounterReturn {
  count: ReturnType<typeof ref<number>>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
  canIncrement: ReturnType<typeof computed<boolean>>;
  canDecrement: ReturnType<typeof computed<boolean>>;
  isAtMin: ReturnType<typeof computed<boolean>>;
  isAtMax: ReturnType<typeof computed<boolean>>;
}

/**
 * Composable for counter functionality with bounds checking
 * @param options - Counter configuration options
 * @returns Counter state and methods
 */
export function useCounter(options: CounterOptions = {}): CounterReturn {
  console.log('Initializing useCounter composable (rolldown-vite compiled)');
  
  const {
    initialValue = 0,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    step = 1
  } = options;
  
  const count = ref(initialValue);
  
  // Computed properties for state checking
  const canIncrement = computed(() => count.value + step <= max);
  const canDecrement = computed(() => count.value - step >= min);
  const isAtMin = computed(() => count.value === min);
  const isAtMax = computed(() => count.value === max);
  
  // Methods
  const increment = () => {
    if (canIncrement.value) {
      count.value += step;
      console.log(`Counter incremented to: ${count.value}`);
    } else {
      console.warn(`Cannot increment: would exceed maximum of ${max}`);
    }
  };
  
  const decrement = () => {
    if (canDecrement.value) {
      count.value -= step;
      console.log(`Counter decremented to: ${count.value}`);
    } else {
      console.warn(`Cannot decrement: would go below minimum of ${min}`);
    }
  };
  
  const reset = () => {
    count.value = initialValue;
    console.log(`Counter reset to initial value: ${initialValue}`);
  };
  
  const set = (value: number) => {
    if (value >= min && value <= max) {
      count.value = value;
      console.log(`Counter set to: ${value}`);
    } else {
      console.warn(`Cannot set counter to ${value}: outside bounds [${min}, ${max}]`);
    }
  };
  
  // Watch for changes and log them
  watch(count, (newValue, oldValue) => {
    console.log(`Counter changed from ${oldValue} to ${newValue}`);
  });
  
  return {
    count,
    increment,
    decrement,
    reset,
    set,
    canIncrement,
    canDecrement,
    isAtMin,
    isAtMax
  };
}