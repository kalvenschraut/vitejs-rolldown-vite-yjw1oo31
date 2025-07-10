import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const externalDependenciesAny = [
	'quasar',
	'sentry',
	'@rtvision/configs',
	'@rtvision/types',
	'vanilla-jsoneditor',
	'file-saver'
];
const externalDependenciesExact = [
	'vue',
	'vue-pdf-embed',
	'@rtvision/common',
	'vue-router',
	'pinia',
	'pako'
];
const externalDependenciesStartsWith = ['ol'];
export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src')
		}
	},
	build: {
		target: 'esnext',
		lib: {
			entry: {
				'shared-utils': resolve(__dirname, 'src/index.ts'),
				worker: resolve(__dirname, 'src/worker/Worker.ts')
			},
			formats: ['es']
		},
		rollupOptions: {
			external(id) {
				for (const dep of externalDependenciesStartsWith) {
					if (id.startsWith(`${dep}/`)) {
						return true;
					}
				}
				for (const dep of externalDependenciesExact) {
					if (id === dep) {
						return true;
					}
				}
				for (const dep of externalDependenciesAny) {
					if (id.includes(dep)) {
						return true;
					}
				}
				return false;
			}
		},
		sourcemap: true,
		emptyOutDir: true,
		rollupOptions: {
			external: ['vue']
		}
	},
	worker: {
		format: 'es'
	},
	experimental: {
		enableNativePlugin: true
	}
});
