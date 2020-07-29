import removeAccents from 'remove-accents';

export const preparePrefix = (prefix) =>
	typeof prefix === 'string'
		? removeAccents(prefix.toLowerCase()).replace(/[- ']/g, '')
		: prefix;

export const lettersMatching = (label, prefix = '') => {
	const pref = prefix.split('');
	let pos = -1;
	const clean = preparePrefix(label);
	return clean.split('').reduce((a, c, idx) => {
		if (pos < pref.length && pref[pos + 1] === c) {
			pos++;
			return [...a, c];
		}
		return a;
	}, []);
};

export const match = (label, prefix) => {
	const pref = prefix.split('');
	let pos = -1;
	const clean = preparePrefix(label);
	return (
		clean.split('').reduce((a, c, idx) => {
			if (pos < pref.length && pref[pos + 1] === c) {
				pos++;
				return a + 1;
			}
			return a / (idx * 0.0001 + 1);
		}, 0) / prefix.length
	);
};

/** */
export const filterOption = (options, prefix) => {
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
};
