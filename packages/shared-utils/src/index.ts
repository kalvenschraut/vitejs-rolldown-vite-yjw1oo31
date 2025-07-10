/**
 * Shared utilities package built with rolldown-vite
 * This package demonstrates rolldown-vite build capabilities
 */

// Export Vue components
export { default as HelloWorld } from '#src/components/HelloWorld.vue';
export { default as DataTable } from '#src/components/DataTable.vue';

// Export utilities
export * from '#src/utils/validators';
export * from '#src/utils/formatters';

// Export composables
export * from '#src/composables/useCounter';
export * from '#src/composables/useLocalStorage';

export * from '#src/Base';

/**
 * Configuration object to test object exports
 */
export const config = {
	version: '1.0.0',
	buildTool: 'rolldown-vite',
	features: [
		'typescript',
		'vue-components',
		'composables',
		'utilities',
		'tree-shaking',
		'fast-builds'
	]
} as const;

// Default export to test different export patterns
export default {
	config
};
