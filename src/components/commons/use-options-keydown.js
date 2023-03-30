import { useCallback } from 'react';

function useOptionsKeydown(options, checkboxStyle, onClick) {
	const onKeyDown = useCallback(
		function ({ key, index, checked }) {
			const { length } = options;

			if (key === 'ArrowRight' || key === 'ArrowDown') {
				const next = index === length - 1 ? 0 : index + 1;
				onClick(options[next].value);
			} else if (key === 'ArrowLeft' || key === 'ArrowUp') {
				const next = index === 0 ? length - 1 : index - 1;
				onClick(options[next].value);
			} else if (key === ' ') {
				checkboxStyle && checked
					? onClick(null)
					: onClick(options[index].value);
			}
		},
		[checkboxStyle, onClick, options]
	);

	return onKeyDown;
}

export default useOptionsKeydown;
