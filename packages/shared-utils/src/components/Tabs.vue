<template>
  <div class="tabs">
    <div class="tabs-nav" :class="navClasses">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="selectTab(tab.key)"
        :class="tabClasses(tab)"
        :disabled="tab.disabled"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    
    <div class="tabs-content">
      <slot :activeTab="activeTab"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Tab {
  key: string
  label: string
  badge?: string | number
  disabled?: boolean
}

interface Props {
  tabs: Tab[]
  modelValue?: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [key: string]
  change: [key: string, tab: Tab]
}>()

const activeTab = ref(props.modelValue || props.tabs[0]?.key)

const navClasses = computed(() => [
  'tabs-nav',
  `tabs-nav-${props.variant}`,
  `tabs-nav-${props.size}`
])

const tabClasses = (tab: Tab) => [
  'tab',
  `tab-${props.variant}`,
  `tab-${props.size}`,
  {
    'tab-active': tab.key === activeTab.value,
    'tab-disabled': tab.disabled
  }
]

const selectTab = (key: string) => {
  const tab = props.tabs.find(t => t.key === key)
  if (tab && !tab.disabled) {
    activeTab.value = key
    emit('update:modelValue', key)
    emit('change', key, tab)
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    activeTab.value = newValue
  }
})

console.log('Tabs component loaded with rolldown-vite')
</script>

<style scoped>
.tabs {
  display: flex;
  flex-direction: column;
}

.tabs-nav {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tabs-nav-pills {
  border-bottom: none;
  gap: 0.25rem;
  padding: 0.25rem;
  background: #f3f4f6;
  border-radius: 8px;
}

.tabs-nav-underline {
  border-bottom: 2px solid #e5e7eb;
}

.tab {
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.tab-md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.tab-lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

.tab-default {
  color: #6b7280;
  border-bottom: 2px solid transparent;
}

.tab-default:hover:not(.tab-disabled) {
  color: #374151;
}

.tab-default.tab-active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-pills {
  color: #6b7280;
  border-radius: 6px;
}

.tab-pills:hover:not(.tab-disabled) {
  background: #e5e7eb;
  color: #374151;
}

.tab-pills.tab-active {
  background: white;
  color: #3b82f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-underline {
  color: #6b7280;
  border-bottom: 2px solid transparent;
  position: relative;
}

.tab-underline:hover:not(.tab-disabled) {
  color: #374151;
}

.tab-underline.tab-active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.tab-badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  min-width: 1.25rem;
  text-align: center;
}

.tabs-content {
  padding: 1.5rem 0;
}
</style>