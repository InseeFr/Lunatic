import match from './match';

/** */
function filterOptions(options, prefix) {
	if (!prefix || prefix.length === 0) {
		return options;
	}

	return options
		.reduce((acc, o) => {
			const { label, search } = o;
			const how = match(search || label, prefix);
			return how >= 0.6
				? [{ o, how }, ...acc].sort((a, b) => a.how <= b.how)
				: acc;
		}, [])
		.map(({ o }) => o);
}

export default filterOptions;
