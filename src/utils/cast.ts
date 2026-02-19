/**
 * Cast functions that force an unknown type to a specific type
 */

/**
 * Force a number (throw if it cannot be converted)
 */
export function castNumber(v: unknown): number {
	if (typeof v === 'number') {
		return v;
	}
	if (typeof v === 'string') {
		return Number.parseInt(v, 10);
	}
	if (Array.isArray(v) && v.length > 0) {
		return castNumber(v[0]);
	}
	throw new Error(`Cannot cast "${v}" to number`);
}

/**
 * Force a number, with a default value if an unmanageable type is encountered
 */
export const castNumberWithDefault =
	(initial: number = 0) =>
	(v: unknown): number => {
		try {
			return castNumber(v);
		} catch {
			return initial;
		}
	};

/**
 * Force a bool
 */
export function castBool(v: unknown): boolean {
	if (typeof v === 'boolean') {
		return v;
	}
	if (Array.isArray(v) && v.length > 0) {
		return castBool(v[0]);
	}
	if (Array.isArray(v)) {
		return false;
	}
	return Boolean(v);
}

/**
 * Force a string
 */
export function castString(v: unknown): string {
	if (typeof v === 'string') {
		return v;
	}
	if (typeof v === 'number') {
		return v.toString();
	}
	if (Array.isArray(v)) {
		return v.map(castString).join(', ');
	}
	if (!v) {
		return '';
	}
	return v.toString();
}
