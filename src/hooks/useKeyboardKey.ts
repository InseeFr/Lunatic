import { useEffect } from 'react';
import { useRefSync } from './useRefSync';

/**
 * Triggers a callback when a key is pressed
 */
export function useKeyboardKey(
	key: string[],
	cb: (e: KeyboardEvent) => void,
	enabled: boolean = true,
	allowWhileTyping: boolean = true
) {
	const cbRef = useRefSync(cb);
	const keyRef = useRefSync(key);
	useEffect(() => {
		if (!enabled) {
			return;
		}
		const listener = (e: KeyboardEvent) => {
			const activeEl = document.activeElement;
			const tag = activeEl?.tagName?.toLowerCase();

			if (!allowWhileTyping) {
				const isTyping =
					tag === 'input' ||
					tag === 'textarea' ||
					(activeEl as HTMLElement)?.isContentEditable;

				if (isTyping) return;
			}

			if (
				keyRef.current.map((s) => s.toLowerCase()).includes(e.key.toLowerCase())
			) {
				cbRef.current(e);
			}
		};
		window.addEventListener('keydown', listener);
		return () => {
			window.removeEventListener('keydown', listener);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enabled]);
}
