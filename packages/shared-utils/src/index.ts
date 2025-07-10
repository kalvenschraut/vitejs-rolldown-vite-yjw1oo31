/**
 * Shared utilities package built with rolldown-vite
 * This package demonstrates rolldown-vite build capabilities
 */

// Export Base
export * from '#src/Base';

// Export Vue components
export { default as HelloWorld } from '#src/components/HelloWorld.vue';
export { default as DataTable } from '#src/components/DataTable.vue';
export { default as Input } from '#src/components/Input.vue';
export { default as Tabs } from '#src/components/Tabs.vue';
export { default as Dropdown } from '#src/components/Dropdown.vue';
export { default as Modal } from '#src/components/Modal.vue';
export { default as Button } from '#src/components/Button.vue';
export { default as Card } from '#src/components/Card.vue';
export { default as Test } from '#src/components/Test.vue';

// Export utilities
export * from '#src/utils/validators';
export * from '#src/utils/formatters';
export * from '#src/utils/object';
export * from '#src/utils/string';
export * from '#src/utils/date';
export * from '#src/utils/array';

// Export composables
export * from '#src/composables/useCounter';
export * from '#src/composables/useLocalStorage';
export * from '#src/composables/useForm';
export * from '#src/composables/useApi';
export * from '#src/composables/useDebounce';

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
