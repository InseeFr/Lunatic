import { useEffect } from 'react';

/**
 * Focus the first focusable element in the wrapper when the "key" changes and is defined
 */
export function useAutoFocus(
	wrapperRef: { current: HTMLDivElement | null },
	key?: string
) {
	useEffect(() => {
		if (!key || !wrapperRef.current) {
			return;
		}

		// First look for invalid fields, then all fields
		const firstFocusableElement =
			(wrapperRef.current?.querySelector(
				'button[aria-invalid], [href][aria-invalid], input[aria-invalid], select[aria-invalid], textarea[aria-invalid], [tabindex][aria-invalid]:not([tabindex="-1"])'
			) as HTMLElement | undefined) ??
			(wrapperRef.current?.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			) as HTMLElement | undefined);

		// The first element can be focusable
		if (firstFocusableElement) {
			return firstFocusableElement.focus();
		}
	}, [key, wrapperRef]);
}
