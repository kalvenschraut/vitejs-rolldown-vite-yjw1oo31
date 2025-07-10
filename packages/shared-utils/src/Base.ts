
/**
 * A simple greeting function to test rolldown-vite compilation
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  console.log(`Creating greeting for: ${name}`);
  return `Hello, ${name}! This message comes from @monorepo/shared-utils built with rolldown-vite.`;
}

console.log('Shared utils package loaded with rolldown-vite compilation');

/**
 * A utility function to demonstrate TypeScript compilation with rolldown-vite
 * @param items - Array of items to process
 * @returns Processed items with metadata
 */
export function processItems<T>(items: T[]): Array<{ item: T; index: number; timestamp: number }> {
  console.log(`Processing ${items.length} items with rolldown-vite compiled code`);
  
  return items.map((item, index) => ({
    item,
    index,
    timestamp: Date.now()
  }));
}
