/**
 * Vue composable for localStorage integration
 * Demonstrates reactive localStorage with rolldown-vite compilation
 */

import { ref, watch, type Ref } from 'vue';

export interface UseLocalStorageOptions<T> {
	defaultValue?: T;
	serializer?: {
		read: (value: string) => T;
		write: (value: T) => string;
	};
}

/**
 * Reactive localStorage composable
 * @param key - localStorage key
 * @param options - Configuration options
 * @returns Reactive ref synced with localStorage
 */
export function useLocalStorage<T>(
	key: string,
	options: UseLocalStorageOptions<T> = {}
): [Ref<T>, (value: T) => void, () => void] {
	console.log(`Initializing useLocalStorage for key: ${key} (rolldown-vite)`);

	const {
		defaultValue,
		serializer = {
			read: JSON.parse,
			write: JSON.stringify
		}
	} = options;

	// Read initial value from localStorage
	const read = (): T => {
		try {
			const item = localStorage.getItem(key);
			if (item === null) {
				return defaultValue as T;
			}
			return serializer.read(item);
		} catch (error) {
			console.error(`Error reading localStorage key "${key}":`, error);
			return defaultValue as T;
		}
	};

	// Write value to localStorage
	const write = (value: T): void => {
		try {
			localStorage.setItem(key, serializer.write(value));
			console.log(`Saved to localStorage [${key}]:`, value);
		} catch (error) {
			console.error(`Error writing to localStorage key "${key}":`, error);
		}
	};

	// Remove value from localStorage
	const remove = (): void => {
		try {
			localStorage.removeItem(key);
			console.log(`Removed localStorage key: ${key}`);
		} catch (error) {
			console.error(`Error removing localStorage key "${key}":`, error);
		}
	};

	// Create reactive ref
	const storedValue = ref<T>(read());

	// Watch for changes and sync to localStorage
	watch(
		storedValue,
		(newValue) => {
			if (newValue === undefined || newValue === null) {
				remove();
			} else {
				write(newValue);
			}
		},
		{ deep: true }
	);

	// Listen for storage events from other tabs
	window.addEventListener('storage', (e) => {
		if (
			e.key === key &&
			e.newValue !== serializer.write(storedValue.value)
		) {
			try {
				storedValue.value = e.newValue
					? serializer.read(e.newValue)
					: (defaultValue as T);
				console.log(
					`localStorage updated from another tab [${key}]:`,
					storedValue.value
				);
			} catch (error) {
				console.error(
					`Error parsing localStorage update for key "${key}":`,
					error
				);
			}
		}
	});

	const setValue = (value: T) => {
		storedValue.value = value;
	};

	return [storedValue, setValue, remove];
}

/**
 * Specialized composable for storing objects in localStorage
 * @param key - localStorage key
 * @param defaultValue - Default object value
 * @returns Reactive object ref synced with localStorage
 */
export function useLocalStorageObject<T extends Record<string, any>>(
	key: string,
	defaultValue: T
): [Ref<T>, (updates: Partial<T>) => void, () => void] {
	console.log(`Initializing useLocalStorageObject for key: ${key}`);

	const [storedValue, setValue, remove] = useLocalStorage(key, {
		defaultValue
	});

	const updateObject = (updates: Partial<T>) => {
		setValue({ ...storedValue.value, ...updates });
		console.log(`Updated localStorage object [${key}]:`, updates);
	};

	return [storedValue, updateObject, remove];
}
