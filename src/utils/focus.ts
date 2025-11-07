/**
 * Helper function to find the first focusable element in a container
 */
export function findFirstFocusableElement(
	container: Element
): HTMLElement | undefined {
	return (
		(container.querySelector(
			'button[aria-invalid="true"], [href][aria-invalid="true"], input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"], [tabindex][aria-invalid="true"]:not([tabindex="-1"])'
		) as HTMLElement | undefined) ??
		(container.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		) as HTMLElement | undefined)
	);
}
