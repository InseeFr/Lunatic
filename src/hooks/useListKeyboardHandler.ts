import { useCallback } from 'react';

/**
 * Handle navigating a list with arrow keys
 */
export function useListKeyboardHandler(
	options: { value: string }[],
	onClick: (s: string) => void
) {
	return useCallback(
		function ({ key, index }: { key: string; index: number }) {
			const { length } = options;

			if (key === 'ArrowRight' || key === 'ArrowDown') {
				const next = index === length - 1 ? 0 : index + 1;
				onClick(options[next].value);
			} else if (key === 'ArrowLeft' || key === 'ArrowUp') {
				const next = index === 0 ? length - 1 : index - 1;
				onClick(options[next].value);
			}
		},
		[onClick, options]
	);
}
