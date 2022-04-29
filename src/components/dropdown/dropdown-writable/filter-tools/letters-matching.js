import preparePrefix from './prepare-prefix';

function lettersMatching(label, prefix = '') {
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
}

export default lettersMatching;
