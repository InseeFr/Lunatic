export function composeFilters(...args) {
	return args.reduce(
		function (next, current) {
			return (tokens, args) => next(current(tokens, args), args);
		},
		(t) => t
	);
}

export default composeFilters;
