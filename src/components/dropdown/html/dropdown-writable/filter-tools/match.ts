import preparePrefix from './prepare-prefix';

function match(label: string, prefix: string): number {
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
}

export default match;
