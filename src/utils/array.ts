export function extractValue(v: unknown, path: number[]) {
	if (!Array.isArray(v)) {
		return v;
	}
	for (const n of path) {
		v = v[n];
		if (!Array.isArray(v)) {
			return v;
		}
	}
	return v;
}

/**
 * Resize an array and fill with defaultValue
 */
export function resizeArray<T extends unknown = unknown>(
	array: T[],
	length: number,
	defaultValue?: T
): T[] {
	if (!Array.isArray(array)) {
		// If the value is not an array create an empty array
		return new Array(length).fill(defaultValue);
	} else if (array.length !== length) {
		// Create a new array, filled with the previous value
		return new Array(length).fill(defaultValue).map(function (value, index) {
			return index < array.length ? array[index] : value;
		}, []);
	}
	return array;
}
