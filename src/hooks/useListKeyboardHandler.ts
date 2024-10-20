import { useCallback } from 'react';

/**
 * Handle navigating a list with arrow keys
 */
export function useListKeyboardHandler(
	options: { value?: string; onCheck?: () => void; checked?: boolean }[]
) {
	return useCallback(
		({ key, index }: { key: string; index: number }) => {
			const { length } = options;
			const currentOption = options[index];
			if (key === ' ' && !currentOption.checked && currentOption.onCheck) {
				currentOption.onCheck();
			} else if (key === 'ArrowRight' || key === 'ArrowDown') {
				const next = index === length - 1 ? 0 : index + 1;
				const option = options[next];
				if (option.onCheck) {
					option.onCheck();
				}
			} else if (key === 'ArrowLeft' || key === 'ArrowUp') {
				const next = index === 0 ? length - 1 : index - 1;
				const option = options[next];
				if (option.onCheck) {
					option.onCheck();
				}
			}
		},
		[options]
	);
}
