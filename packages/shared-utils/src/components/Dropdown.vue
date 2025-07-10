<template>
  <div class="dropdown" ref="dropdownRef">
    <button
      @click="toggle"
      :class="triggerClasses"
      :disabled="disabled"
    >
      <slot name="trigger">
        <span>{{ selectedLabel || placeholder }}</span>
        <svg class="dropdown-icon" :class="{ 'dropdown-icon-open': isOpen }" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </slot>
    </button>
    
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu" :class="menuClasses">
        <div
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          :class="optionClasses(option)"
        >
          <slot name="option" :option="option">
            {{ option.label }}
          </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  options: DropdownOption[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom' | 'top'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  size: 'md',
  position: 'bottom'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [option: DropdownOption]
}>()

const dropdownRef = ref<HTMLElement>()
const isOpen = ref(false)

const selectedOption = computed(() => 
  props.options.find(option => option.value === props.modelValue)
)

const selectedLabel = computed(() => selectedOption.value?.label)

const triggerClasses = computed(() => [
  'dropdown-trigger',
  `dropdown-trigger-${props.size}`,
  {
    'dropdown-trigger-disabled': props.disabled,
    'dropdown-trigger-open': isOpen.value
  }
])

const menuClasses = computed(() => [
  `dropdown-menu-${props.position}`
])

const optionClasses = (option: DropdownOption) => [
  'dropdown-option',
  {
    'dropdown-option-selected': option.value === props.modelValue,
    'dropdown-option-disabled': option.disabled
  }
]

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const selectOption = (option: DropdownOption) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value)
    emit('change', option)
    isOpen.value = false
  }
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

console.log('Dropdown component loaded with rolldown-vite')
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.dropdown-trigger:hover:not(.dropdown-trigger-disabled) {
  border-color: #9ca3af;
}

.dropdown-trigger:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dropdown-trigger-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.dropdown-trigger-md {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
}

.dropdown-trigger-lg {
  padding: 0.75rem 1rem;
  font-size: 1.125rem;
}

.dropdown-trigger-disabled {
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.dropdown-trigger-open {
  border-color: #3b82f6;
}

.dropdown-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s;
}

.dropdown-icon-open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-menu-bottom {
  top: 100%;
  margin-top: 0.25rem;
}

.dropdown-menu-top {
  bottom: 100%;
  margin-bottom: 0.25rem;
}

.dropdown-option {
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-option:hover:not(.dropdown-option-disabled) {
  background: #f3f4f6;
}

.dropdown-option-selected {
  background: #eff6ff;
  color: #1d4ed8;
}

.dropdown-option-disabled {
  color: #9ca3af;
  cursor: not-allowed;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>