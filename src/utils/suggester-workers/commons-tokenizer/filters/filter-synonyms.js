const MAPS_FROM_ARRAY = new Map(); // Pour éviter de recalculer une map à chaque fois

function filterFromObject(tokens, synonyms) {
	return tokens.reduce(function (prec, token) {
		if (token in synonyms) {
			return [...prec, token, ...synonyms[token]];
		}
		return [...prec, token];
	}, []);
}

function buildSynonymsMap(array) {
	return array.reduce(function (map, { source, target }) {
		return { ...map, [source]: target };
	}, {});
}

function filterFromArray(tokens, synonyms) {
	if (!MAPS_FROM_ARRAY.has(synonyms)) {
		MAPS_FROM_ARRAY.set(synonyms, buildSynonymsMap(synonyms));
	}
	return filterFromObject(tokens, MAPS_FROM_ARRAY.get(synonyms));
}

function filterSynonyms(tokens, { synonyms }) {
	if (Array.isArray(synonyms) && synonyms.length) {
		return filterFromArray(tokens, synonyms);
	}
	if (typeof synonyms === 'object') {
		return filterFromObject(tokens, synonyms);
	}

	return tokens;
}

export default filterSynonyms;
