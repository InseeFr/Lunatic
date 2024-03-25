/**
 * Global void function to use as default parameters
 */
export const voidFunction = () => {};

export function debounce<A extends unknown[], R = void>(
	fn: (...args: A) => R,
	ms: number
): [(...args: A) => Promise<R extends Promise<infer RR> ? RR : R>, () => void] {
	let timer: number;

	const debouncedFunc = (
		...args: A
	): Promise<R extends Promise<infer RR> ? RR : R> =>
		new Promise((resolve, reject) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = window.setTimeout(async () => {
				try {
					resolve((await fn(...args)) as any);
				} catch (e) {
					reject(e);
				}
			}, ms);
		});

	const teardown = () => clearTimeout(timer);

	return [debouncedFunc, teardown];
}
