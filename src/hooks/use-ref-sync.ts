import { useRef } from 'react';

/**
 * useRef but keep the "current" value in sync
 */
export function useRefSync<T extends unknown>(value: T) {
	const ref = useRef(value);
	ref.current = value;
	return ref;
}
