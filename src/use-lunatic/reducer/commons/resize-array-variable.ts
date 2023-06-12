/**
 * Cast the variable into an array and adjust the length if necessary
 */
function resizeArrayVariable<T = unknown>(
	array: unknown,
	length: number,
	defaultValue?: T
): T[] {
	if (!Array.isArray(array)) {
		// create the array
		return new Array(length).fill(defaultValue);
	} else if (array.length !== length) {
		// renew array end keep previous values
		return new Array(length)
			.fill(defaultValue)
			.reduce(function (step, current, index) {
				if (index < array.length) {
					return [...step, array[index]];
				}
				return [...step, current];
			}, []);
	}
	return array;
}

export default resizeArrayVariable;
