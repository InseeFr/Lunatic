import { useRef } from 'react';

/**
 * useRef, but keep the value in sync on every render
 */
export function useRefSync<T extends unknown>(value: T) {
	const ref = useRef(value);
	ref.current = value;
	return ref;
}
