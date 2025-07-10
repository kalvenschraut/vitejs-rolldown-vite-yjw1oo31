<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h3 class="card-title">{{ title }}</h3>
        <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md'
})

const cardClasses = computed(() => [
  'card',
  `card-${props.variant}`,
  `card-padding-${props.padding}`
])

console.log('Card component loaded with rolldown-vite')
</script>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
}

.card-default {
  background: white;
  border: 1px solid #e5e7eb;
}

.card-outlined {
  background: white;
  border: 2px solid #d1d5db;
}

.card-elevated {
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
}

.card-padding-none .card-body {
  padding: 0;
}

.card-padding-sm .card-body {
  padding: 0.75rem;
}

.card-padding-md .card-body {
  padding: 1.5rem;
}

.card-padding-lg .card-body {
  padding: 2rem;
}

.card-header {
  padding: 1.5rem 1.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.card-subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #f3f4f6;
}
</style>