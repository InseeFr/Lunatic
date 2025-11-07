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

		const findFirstFocusableElement = (container: Element): HTMLElement | undefined => {
			return (
				(container.querySelector(
					'button[aria-invalid="true"], [href][aria-invalid="true"], input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"], [tabindex][aria-invalid="true"]:not([tabindex="-1"])'
				) as HTMLElement | undefined) ??
				(container.querySelector(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				) as HTMLElement | undefined)
			);
		};

		// First look for invalid fields, then all fields
		let firstFocusableElement = findFirstFocusableElement(wrapperRef.current);

		// If no focusable element found and we have a specific data-focus-key
		if (!firstFocusableElement) {
			const targetElement = wrapperRef.current.querySelector(
				`[data-focus-key="${key}"]`
			);
			if (targetElement) {
				firstFocusableElement = findFirstFocusableElement(targetElement);
			}
		}

		if (firstFocusableElement) {
			firstFocusableElement.focus();
		}
	}, [key, wrapperRef]);
}