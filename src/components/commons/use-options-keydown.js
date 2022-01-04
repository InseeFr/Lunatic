import { useCallback } from 'react';

function useOptionsKeydown(options, onClick) {
	const onKeyDown = useCallback(
		function ({ key, index }) {
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

	return onKeyDown;
}

export default useOptionsKeydown;
