const compose = <T extends any[], R>(
	fn1: (...args: T) => R,
	...fns: Array<(a: R) => R>
) => {
	const piped = fns.reduce(
		(prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
		(value) => value
	);
	return (...args: T) => piped(fn1(...args));
};

export default compose;
