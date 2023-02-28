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

/**
 * Deep for each loop inside nested arrays
 * Exclude values that are not at the max depth for the array
 */
export function deepForEach(
	value: unknown[],
	callback: (v: unknown, k: number[]) => void
) {
	// Find the max depth for the array
	const valueDepth = depth(value);
	// We need recursion
	const loop = (row: unknown[], index: number[]) => {
		row.map((v, k) => {
			const newIndex = [...index, k];
			// We reached the bottom of the array
			if (newIndex.length === valueDepth) {
				callback(v, newIndex);
				return;
			}
			// Otherwise go deeper
			if (Array.isArray(v)) {
				loop(v, newIndex);
				return;
			}
		});
	};
	loop(value, []);
}

export function depth(value: unknown[], baseDepth: number = 0): number {
	return Math.max.apply(
		Math,
		value.map((v) => {
			return Array.isArray(v) ? depth(v, baseDepth + 1) : baseDepth + 1;
		})
	);
}

/**
 * Return the depths of the array at multiple level
 */
export function deepLengths(value: unknown, index: number[]): number[] {
	// Recursion is required
	const loop = (v: typeof value, i: typeof index, acc: number[]): number[] => {
		// we reached the end of indexes
		if (i.length === 0) {
			return acc;
		}
		// Move one level deeper
		const nextLevel = Array.isArray(v) ? v[i[0]] : [];
		return loop(nextLevel, i.slice(1), [...acc, nextLevel?.length ?? 0]);
	};
	if (!Array.isArray(value)) {
		return [];
	}
	return loop(value, index, [value.length]);
}
