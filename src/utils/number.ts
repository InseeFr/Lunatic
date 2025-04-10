export function forceInt(n: unknown): number {
	if (typeof n === 'string') {
		const casted = parseInt(n, 10);
		if (Number.isNaN(casted)) {
			throw new Error(`Cannot cast ${n} to int`);
		}
		return casted;
	}
	if (typeof n === 'number') {
		return n;
	}
	throw new Error(`Cannot cast ${typeof n} to int`);
}

/**
 * Limit a number between 2 values
 */
export function between(n: number, min: number, max: number): number {
	if (n < min) {
		return min;
	}
	if (n > max) {
		return max;
	}
	return n;
}

/**
 * Check if the value is a number
 */
export function isNumber(n: unknown): n is number {
	return typeof n === 'number' && Number.isFinite(n);
}

/** Check if a value is within an interval.
 * Both minimum and maximum can be undefined, then we just compare with the defined bounds.
 */
export function isNumberInInterval(
	value: number,
	min?: number,
	max?: number
): boolean {
	if (
		(min !== undefined && value < min) ||
		(max !== undefined && value > max)
	) {
		return false;
	}

	return true;
}
