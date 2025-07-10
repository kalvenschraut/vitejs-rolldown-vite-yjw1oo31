<template>
  <div id="app">
    <header class="app-header">
      <h1>Rolldown-Vite Monorepo Demo</h1>
      <p class="subtitle">Showcasing Vue components built with rolldown-vite</p>
    </header>

    <main class="main-content">
      <!-- HelloWorld Component Demo -->
      <section class="demo-section">
        <h2>HelloWorld Component</h2>
        <HelloWorld 
          title="Vue Component from @local/shared-utils"
          :initial-count="5"
          @count-changed="onCountChanged"
        />
      </section>

      <!-- DataTable Component Demo -->
      <section class="demo-section">
        <h2>DataTable Component</h2>
        <DataTable 
          title="Interactive Data Table"
          :initial-data="tableData"
          @item-added="onItemAdded"
          @item-removed="onItemRemoved"
        />
      </section>

      <!-- Composables Demo -->
      <section class="demo-section">
        <h2>Vue Composables Demo</h2>
        
        <div class="composables-grid">
          <!-- useCounter Demo -->
          <div class="composable-demo">
            <h3>useCounter Composable</h3>
            <div class="counter-controls">
              <button @click="counterActions.decrement" :disabled="!counterActions.canDecrement.value">
                -{{ counterOptions.step }}
              </button>
              <span class="counter-display">{{ counterState.count.value }}</span>
              <button @click="counterActions.increment" :disabled="!counterActions.canIncrement.value">
                +{{ counterOptions.step }}
              </button>
            </div>
            <div class="counter-info">
              <p>Min: {{ counterOptions.min }} | Max: {{ counterOptions.max }}</p>
              <button @click="counterActions.reset" class="reset-btn">Reset</button>
            </div>
          </div>
        </div>
          
      </section>

      <!-- Utilities Demo -->
      <section class="demo-section">
        <h2>Utility Functions Demo</h2>
        
        <div class="utilities-grid">
          <!-- Validators Demo -->
          <div class="utility-demo">
            <h3>Validators</h3>
            <div class="validator-inputs">
              <div class="input-group">
                <input 
                  v-model="emailInput" 
                  placeholder="test@example.com"
                  class="validator-input"
                  :class="{ 'invalid': emailValidation && !emailValidation.isValid }"
                />
                <div v-if="emailValidation" class="validation-result">
                  <span :class="emailValidation.isValid ? 'valid' : 'invalid'">
                    {{ emailValidation.isValid ? '✓ Valid email' : emailValidation.errors.join(', ') }}
                  </span>
                </div>
              </div>
              
              <div class="input-group">
                <input 
                  v-model="passwordInput" 
                  type="password"
                  placeholder="Enter password"
                  class="validator-input"
                  :class="{ 'invalid': passwordValidation && !passwordValidation.isValid }"
                />
                <div v-if="passwordValidation" class="validation-result">
                  <span :class="passwordValidation.isValid ? 'valid' : 'invalid'">
                    Strength: {{ passwordValidation.strength }}
                  </span>
                  <div v-if="passwordValidation.errors.length" class="errors">
                    {{ passwordValidation.errors.join(', ') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Formatters Demo -->
          <div class="utility-demo">
            <h3>Formatters</h3>
            <div class="formatter-examples">
              <div class="format-item">
                <strong>Currency:</strong> {{ formatCurrency(1234.56) }}
              </div>
              <div class="format-item">
                <strong>Date:</strong> {{ formatDate(new Date()) }}
              </div>
              <div class="format-item">
                <strong>File Size:</strong> {{ formatFileSize(1048576) }}
              </div>
              <div class="format-item">
                <strong>Phone:</strong> {{ formatPhoneNumber('1234567890') }}
              </div>
              <div class="format-item">
                <strong>Number:</strong> {{ formatNumber(1234567) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Package Info -->
      <section class="demo-section">
        <h2>Package Information</h2>
        <div class="package-info">
          <pre>{{ JSON.stringify(config, null, 2) }}</pre>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  HelloWorld, 
  DataTable,
  useCounter,
  useLocalStorage,
  validateEmail,
  validatePassword,
  formatCurrency,
  formatDate,
  formatFileSize,
  formatPhoneNumber,
  formatNumber,
  greet,
  processItems,
  config
} from '@local/shared-utils'

console.log('Demo app starting with Vue components from rolldown-vite package...')

// HelloWorld component event handler
const onCountChanged = (value: number) => {
  console.log(`HelloWorld count changed to: ${value}`)
}

// DataTable component data and event handlers
const tableData = ref([
  { id: 1, name: 'Rolldown Item', value: 100 },
  { id: 2, name: 'Vite Component', value: 250 },
  { id: 3, name: 'Vue Module', value: 175 }
])

const onItemAdded = (item: any) => {
  console.log('Item added to DataTable:', item)
}

const onItemRemoved = (id: number) => {
  console.log('Item removed from DataTable:', id)
}

// useCounter composable demo
const counterOptions = {
  initialValue: 10,
  min: 0,
  max: 20,
  step: 2
}

const counterState = useCounter(counterOptions)
const counterActions = {
  increment: counterState.increment,
  decrement: counterState.decrement,
  reset: counterState.reset,
  canIncrement: counterState.canIncrement,
  canDecrement: counterState.canDecrement
}
  
// Validators demo
const emailInput = ref('')
const passwordInput = ref('')

const emailValidation = computed(() => {
  if (!emailInput.value) return null
  return validateEmail(emailInput.value)
})

const passwordValidation = computed(() => {
  if (!passwordInput.value) return null
  return validatePassword(passwordInput.value)
})

// Test basic package functions
console.log(greet('Vue Developer'))
console.log('Processed items:', processItems(['vue', 'rolldown', 'vite']))
</script>

<style scoped>
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.app-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  margin: 0 0 1.5rem 0;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.composables-grid,
.utilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.composable-demo,
.utility-demo {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.composable-demo h3,
.utility-demo h3 {
  margin: 0 0 1rem 0;
  color: #4a5568;
}

.counter-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.counter-controls button {
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.counter-controls button:hover:not(:disabled) {
  background: #3182ce;
}

.counter-controls button:disabled {
  background: #a0aec0;
  cursor: not-allowed;
}

.counter-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  min-width: 3rem;
  text-align: center;
}

.counter-info {
  font-size: 0.9rem;
  color: #718096;
}

.reset-btn,
.clear-btn {
  padding: 0.25rem 0.75rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.reset-btn:hover,
.clear-btn:hover {
  background: #c53030;
}

.storage-demo {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.storage-input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.storage-info {
  font-size: 0.8rem;
  color: #718096;
  background: #edf2f7;
  padding: 0.5rem;
  border-radius: 4px;
  word-break: break-all;
}

.validator-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.validator-input {
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.validator-input.invalid {
  border-color: #e53e3e;
}

.validation-result {
  font-size: 0.8rem;
}

.valid {
  color: #38a169;
}

.invalid {
  color: #e53e3e;
}

.errors {
  margin-top: 0.25rem;
  font-size: 0.75rem;
}

.formatter-examples {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.format-item {
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  font-size: 0.9rem;
}

.package-info {
  background: #1a202c;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.package-info pre {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  #app {
    padding: 1rem;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .composables-grid,
  .utilities-grid {
    grid-template-columns: 1fr;
  }
}
</style>