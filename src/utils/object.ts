/**
 * Array.map() but for objet
 */
export function objectMap<T extends Record<string, any>, V extends unknown>(
	object: T,
	callback: (k: keyof T, v: T[keyof T]) => [k: keyof T, v: V] | null
) {
	return Object.entries(object).reduce((acc, [k, v]) => {
		const result = callback(k, v);
		if (!Array.isArray(result)) {
			return acc;
		}
		const [key, value] = result;
		acc[key] = value;
		return acc;
	}, {} as Record<keyof T, V>);
}
// Adds the possibility of preserving the original type of the object's keys.
// The native function produces an array of strings. (Object.keys)
export function objectKeys<T extends Record<string, unknown>>(object: T) {
	return Object.keys(object) as (keyof T)[];
}
