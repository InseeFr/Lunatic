import { useRef } from 'react';

/**
 * Debugging hook that log what changed between 2 renders
 */
export function useWhyRender(props: Record<string, any>, prefix: string = '') {
	const propsRef = useRef(props);
	for (const key in props) {
		if (propsRef.current[key] !== props[key]) {
			console.log(`${prefix}: ${key} changed`);
		}
	}
	propsRef.current = props;
}
