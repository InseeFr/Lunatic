/**
 * Call a callback x times
 */
export function times<T>(n: number, cb: (k: number) => T): T[] {
	return new Array(n).fill(null).map((_, k) => cb(k));
}

/**
 * Update an item in an array without mutating the array
 */
export function setAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
	if (index < 0) {
		throw new Error(
			`Cannot update value in an array, index out of bounds ${index}/${arr.length}`
		);
	}

	const newArray = [...arr];
	newArray[index] = newValue;
	return newArray;
}

export function resizeArray<T = unknown>(
	array: unknown,
	newLength: number,
	defaultValue?: T
): T[] {
	// The value is not an array, create an empty array
	if (!Array.isArray(array)) {
		return new Array(newLength).fill(defaultValue ?? null);
	}
	if (array.length === newLength) {
		return array
	}
	return new Array(newLength)
		.fill(defaultValue ?? null)
		.map(function (value, index) {
			return index < array.length ? array[index] : value
		}, []);
}
