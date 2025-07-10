/**
 * A simple greeting function to test rolldown-vite compilation
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
	return `Hello, ${name}! This message comes from @monorepo/shared-utils built with rolldown-vite.`;
}

/**
 * A utility function to demonstrate TypeScript compilation with rolldown-vite
 * @param items - Array of items to process
 * @returns Processed items with metadata
 */
export function processItems<T>(
	items: T[]
): Array<{ item: T; index: number; timestamp: number }> {
	return items.map((item, index) => ({
		item,
		index,
		timestamp: Date.now()
	}));
}
