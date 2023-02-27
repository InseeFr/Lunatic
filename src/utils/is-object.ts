/**
 * isObject function with type narrowing
 */
export function isObject<T = unknown>(
	v: unknown
): v is Record<string, unknown> {
	return typeof v === 'object' && v !== null;
}
