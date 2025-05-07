import { LunaticData } from '../use-lunatic/type';

/**
 * Array.map() but for objet
 */
export function objectMap<T extends Record<string, any>, V>(
	object: T,
	callback: (k: keyof T, v: T[keyof T]) => [k: keyof T, v: V] | null
) {
	return Object.entries(object).reduce(
		(acc, [k, v]) => {
			const result = callback(k, v);
			if (!Array.isArray(result)) {
				return acc;
			}
			const [key, value] = result;
			acc[key] = value;
			return acc;
		},
		{} as Record<keyof T, V>
	);
}

/**
 * Filter items from an object
 */
export function objectFilter<T extends Record<string, any>>(
	object: T,
	callback: (k: keyof T, v: T[keyof T]) => boolean
): T {
	return Object.fromEntries(
		Object.entries(object).filter(([k, v]) => {
			return callback(k, v);
		})
	) as T;
}

// Adds the possibility of preserving the original type of the object's keys.
// The native function produces an array of strings. (Object.keys)
export function objectKeys<T extends Record<string, unknown>>(object: T) {
	return Object.keys(object) as (keyof T)[];
}

export function mergeDefault<
	T extends Record<string, unknown>,
	D extends Record<string, unknown>,
>(obj: T, defaults: D): T & D {
	return objectMap({ ...obj, ...defaults }, (k) => {
		// @ts-expect-error Ignore this line since TS is not able to handle this case
		return [k, obj[k] ?? defaults[k]] as const;
	});
}

export const dataFromObject = (o: Record<string, unknown>): LunaticData => {
	return {
		EXTERNAL: {},
		COLLECTED: Object.keys(o).reduce(
			(acc, k) => ({
				...acc,
				[k]: {
					COLLECTED: o[k],
				},
			}),
			{}
		),
		CALCULATED: {},
	};
};

/**
 * isObject function with type narrowing
 */
export function isObject(v: unknown): v is Record<string, unknown> {
	return typeof v === 'object' && v !== null;
}
