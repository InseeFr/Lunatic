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
	array: T[] | unknown,
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

/**
 * Inject a value deep into an array and resize it if necessary
 */
export function deepSet<T extends unknown>(
	array: T[] | T,
	value: T,
	iteration: number[],
	sizes: number[]
): T[] | T {
	if (iteration.length === 0) {
		return value;
	}
	const [index, ...nextIteration] = iteration;
	const [size, ...nextSizes] = sizes;
	const newArray = resizeArray(array, size);
	newArray[index] = deepSet(newArray[index], value, nextIteration, nextSizes);
	return newArray as T;
}
