import preparePrefix from './prepare-prefix';

function lettersMatching(label: string, prefix: string = ''): string[] {
	const pref = prefix.split('');
	let pos = -1;
	const clean = preparePrefix(label);
	return clean.split('').reduce((a: string[], c: string) => {
		if (pos < pref.length && pref[pos + 1] === c) {
			pos++;
			return [...a, c];
		}
		return a;
	}, []);
}

export default lettersMatching;
