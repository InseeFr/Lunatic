import defaultStopWords from './stop-words';

function createFilterStopWords(stops = defaultStopWords) {
	const mapSW = stops.reduce(function (a, w) {
		return { ...a, [w]: undefined };
	}, {});
	return function filter(tokens) {
		return tokens.reduce(function (a, t) {
			if (t in mapSW) {
				return a;
			}
			return [...a, t];
		}, []);
	};
}

export default createFilterStopWords;
