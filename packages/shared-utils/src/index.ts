/**
 * Shared utilities package built with rolldown-vite
 * This package demonstrates rolldown-vite build capabilities
 */

// Export Vue components
export { default as HelloWorld } from './components/HelloWorld.vue';
export { default as DataTable } from './components/DataTable.vue';

// Export utilities
export * from './utils/validators';
export * from './utils/formatters';

// Export composables
export * from './composables/useCounter';
export * from './composables/useLocalStorage';

export * from './Base';

/**
 * Configuration object to test object exports
 */
export const config = {
  version: '1.0.0',
  buildTool: 'rolldown-vite',
  features: ['typescript', 'vue-components', 'composables', 'utilities', 'tree-shaking', 'fast-builds']
} as const;

// Default export to test different export patterns
export default {
  config
};