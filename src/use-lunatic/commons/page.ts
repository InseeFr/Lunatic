export function incrementPage(
	pages: readonly number[],
	max: readonly number[]
): number[] {
	const newPages = [...pages];
	const newValue = pages[pages.length - 1] + 1;
	if (newValue > max[pages.length - 1]) {
		newPages.pop();
		return incrementPage(newPages, max);
	}
	newPages[pages.length - 1] = newValue;
	return newPages;
}

/**
 * Converts a page number (3.1.2) to an array of numbers [3, 1, 2]
 */
export function pageStringToNumbers(page: string): number[] {
	return page.split('.').map((v) => parseInt(v, 10));
}
