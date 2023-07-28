import { useRef } from 'react';

/**
 * Hook for debug purpose that log the data that changed between 2 renders
 */
export function useDidChange(obj: Record<string, unknown>, suffix?: string) {
	const ref = useRef(obj);

	for (const key in obj) {
		if (obj[key] !== ref.current[key]) {
			console.log(`"${key}" has changed ${suffix ?? ''}`, obj[key]);
		}
	}

	ref.current = obj;
}
