export function compose(...functions) {
	return functions.reverse().reduce(
		function (next, current) {
			return (first, ...rest) => next(current(first, ...rest), ...rest);
		},
		(t) => t
	);
}

export default compose;
