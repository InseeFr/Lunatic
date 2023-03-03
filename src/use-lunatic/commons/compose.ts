const compose = <V extends unknown, Rest extends unknown[]>(
	...functions: Array<(acc: V, ...rest: Rest) => V>
) => {
	return functions.reverse().reduce(
		function (next, current) {
			return (first, ...rest) => next(current(first, ...rest), ...rest);
		},
		(value: V, ...rest: Rest) => value
	);
};

export default compose;
