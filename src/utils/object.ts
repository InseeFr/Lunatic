/**
 * Array.map() but for objet
 */
export function objectMap<T extends Record<string, any>, V extends unknown>(
	object: T,
	callback: (k: keyof T, v: T[keyof T]) => [k: keyof T, v: V]
) {
	return Object.entries(object).reduce((acc, [k, v]) => {
		const [key, value] = callback(k, v);
		acc[key] = value;
		return acc;
	}, {} as Record<keyof T, V>);
}
