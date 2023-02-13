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
