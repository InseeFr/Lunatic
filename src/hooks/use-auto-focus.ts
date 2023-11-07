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
				'button[aria-invalid="true"], [href][aria-invalid="true"], input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"], [tabindex][aria-invalid="true"]:not([tabindex="-1"])'
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
