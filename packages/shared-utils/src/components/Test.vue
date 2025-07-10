<template>Hello world</template>
<script lang="ts">
let components: Record<
	string,
	Record<string, () => Promise<{ default: Component }>>
> = {
	common: import.meta.glob<{ default: Component }>([
		'./*.{vue,ts}',
		'!./*.d.ts',
		'!./Test.vue'
	])
};
export default {
	inheritAttrs: false
};
</script>
<script setup lang="ts">
import type { Component } from 'vue';
import { computed, defineAsyncComponent } from 'vue';

// needed to use the map for rolldown to include the files
const currentComponent = computed<Component | string | null>(() => {
	const componentLoader = components.common['HelloWorld'];
	return defineAsyncComponent({
		async loader() {
			const component = await componentLoader();
			return component;
		}
	});
});
</script>
