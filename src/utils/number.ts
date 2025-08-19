export function forceInt(n: unknown, message?: string): number {
	if (typeof n === 'string') {
		const casted = parseInt(n, 10);
		if (Number.isNaN(casted)) {
			throw new Error(message ?? `Cannot cast ${n} to int`);
		}
		return casted;
	}
	if (typeof n === 'number') {
		return n;
	}
	throw new Error(message ?? `Cannot cast ${typeof n} to int`);
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

/**
 * Convert an unknown value into a number
 */
export function toNumber(v: unknown): number | null {
	if (typeof v === 'number') {
		return v;
	}
	if (typeof v === 'string') {
		return parseInt(v, 10);
	}
	return null;
}
