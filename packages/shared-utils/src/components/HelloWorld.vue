<template>
	<div class="hello-world">
		<h2>{{ title }}</h2>
		<p class="message">{{ message }}</p>
		<div class="counter-section">
			<button
				@click="increment"
				class="counter-btn">
				Count: {{ count }}
			</button>
			<button
				@click="reset"
				class="reset-btn">
				Reset
			</button>
		</div>
		<div class="features">
			<h3>Package Features:</h3>
			<ul>
				<li
					v-for="feature in features"
					:key="feature">
					{{ feature }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
	title?: string;
	initialCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
	title: 'Hello from @local/shared-utils',
	initialCount: 0
});

const count = ref(props.initialCount);

const message = computed(
	() =>
		`This Vue component was built with rolldown-vite! Current count: ${count.value}`
);

const features = ref([
	'Vue 3 Composition API',
	'TypeScript Support',
	'Rolldown-Vite Build',
	'Tree Shaking',
	'Fast HMR'
]);

const increment = () => {
	count.value++;
	console.log(`Count incremented to: ${count.value}`);
};

const reset = () => {
	count.value = props.initialCount;
	console.log('Count reset to initial value');
};

// Emit events for parent components
const emit = defineEmits<{
	countChanged: [value: number];
}>();

// Watch count changes and emit events
watch(count, (newCount) => {
	emit('countChanged', newCount);
});
console.log('HelloWorld component initialized with count:', count.value);
</script>

<style scoped>
.hello-world {
	padding: 2rem;
	border: 2px solid #42b883;
	border-radius: 12px;
	background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
	max-width: 500px;
	margin: 0 auto;
	text-align: center;
}

h2 {
	color: #2c3e50;
	margin-bottom: 1rem;
	font-size: 1.5rem;
}

.message {
	color: #34495e;
	font-size: 1.1rem;
	margin-bottom: 1.5rem;
	line-height: 1.6;
}

.counter-section {
	display: flex;
	gap: 1rem;
	justify-content: center;
	margin-bottom: 2rem;
}

.counter-btn,
.reset-btn {
	padding: 0.75rem 1.5rem;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
}

.counter-btn {
	background: #42b883;
	color: white;
}

.counter-btn:hover {
	background: #369870;
	transform: translateY(-2px);
}

.reset-btn {
	background: #e74c3c;
	color: white;
}

.reset-btn:hover {
	background: #c0392b;
	transform: translateY(-2px);
}

.features {
	text-align: left;
	background: rgba(255, 255, 255, 0.7);
	padding: 1rem;
	border-radius: 8px;
}

.features h3 {
	color: #2c3e50;
	margin-bottom: 0.5rem;
}

.features ul {
	list-style-type: none;
	padding: 0;
}

.features li {
	padding: 0.25rem 0;
	color: #34495e;
	position: relative;
	padding-left: 1.5rem;
}

.features li::before {
	content: '✓';
	position: absolute;
	left: 0;
	color: #42b883;
	font-weight: bold;
}
</style>
