import { useEffect } from 'react';
import { findFirstFocusableElement } from '../utils/focus';
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

		const firstFocusableElement = findFirstFocusableElement(wrapperRef.current);

		if (firstFocusableElement) {
			firstFocusableElement.focus();
		}
	}, [key, wrapperRef]);
}

/**
 * Focus the first focusable element in the wrapper when the "key" changes and is defined (row only)
 */
export function useAutoFocusRow(
	wrapperRef: { current: HTMLDivElement | null },
	key?: string
) {
	useEffect(() => {
		if (!key || !wrapperRef.current) {
			return;
		}

		// Find the row on which to focus on 
		const targetElement = wrapperRef.current.querySelector(
			`[data-focus-key="${key}"]`
		) ?? wrapperRef.current;

		const firstFocusableElement = findFirstFocusableElement(targetElement);

		if (firstFocusableElement) {
			firstFocusableElement.focus();
		}
	}, [key, wrapperRef]);
}