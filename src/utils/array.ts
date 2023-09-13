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
