/**
 * Call a callback x times
 */
export function times<T>(n: number, cb: (k: number) => T): T[] {
	return new Array(n).fill(null).map((_, k) => cb(k));
}

/**
 * Update an item in an array without mutating the array
 */
export function setAtIndex<T>(
	arr: T,
	index: number | number[],
	newValue: unknown
): T {
	if (!Array.isArray(index)) {
		return setAtIndex(arr, [index], newValue);
	}

	const [currentIndex, ...restIndex] = index;

	let newArray = Array.isArray(arr) ? [...arr] : [arr];
	if (newArray.length < currentIndex + 1) {
		newArray = resizeArray(newArray, currentIndex + 1, null);
	}
	newArray[currentIndex] =
		restIndex.length === 0
			? newValue
			: setAtIndex(newArray[currentIndex], restIndex, newValue);
	return newArray as T;
}

/**
 * Get a value inside an array
 */
export function getAtIndex(arr: unknown, indexes: number[]): unknown {
	let current = arr;

	if (!Array.isArray(current)) {
		return undefined;
	}

	for (const index of indexes) {
		if (index < 0 || index >= (current as unknown[]).length) {
			return undefined; // Index out of bounds, return undefined
		}

		current = (current as unknown[])[index];
	}

	return current;
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
		return array;
	}
	return new Array(newLength)
		.fill(defaultValue ?? null)
		.map(function (value, index) {
			return index < array.length ? array[index] : value;
		}, []);
}

/**
 * Return the first non null/undefined value of an array
 */
export function firstValueItem<T = unknown>(items: T | T[]): T | undefined {
	if (!Array.isArray(items)) {
		return items;
	}
	return items.find((v) => v !== undefined && v !== null);
}

/**
 * Return a list of partial array
 *
 * Example :
 * - subArray([1, 2, 3]) // [[1], [1, 2], [1, 2, 3]]
 */
export function subArrays<T = unknown>(items: T[] | T): T[][] {
	if (!Array.isArray(items)) {
		return [];
	}
	if (items.length === 1) {
		return [items];
	}
	const arrays = [] as T[][];
	for (let i = 1; i <= items.length; i++) {
		arrays.push(items.slice(0, i));
	}
	return arrays;
}

/**
 * Calculates the depth of an array
 */
export function depth(arr: unknown, base = 0) {
	if (!Array.isArray(arr)) {
		return base;
	}
	return depth(arr[0], base + 1);
}
