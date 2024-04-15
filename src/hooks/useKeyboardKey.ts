import { useEffect } from 'react';
import { useRefSync } from './useRefSync';

/**
 * Triggers a callback when a key is pressed
 */
export function useKeyboardKey(
	key: string[],
	cb: (e: KeyboardEvent) => void,
	enabled: boolean = true
) {
	const cbRef = useRefSync(cb);
	const keyRef = useRefSync(key);
	useEffect(() => {
		if (!enabled) {
			return;
		}
		const listener = (e: KeyboardEvent) => {
			if (keyRef.current.includes(e.key)) {
				cbRef.current(e);
			}
		};
		window.addEventListener('keydown', listener);
		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, [enabled]);
}
