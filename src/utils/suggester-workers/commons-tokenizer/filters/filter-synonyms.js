function filterSynonyms(tokens, { synonyms }) {
	return tokens.reduce(function (prec, token) {
		if (token in synonyms) {
			return [...prec, token, ...synonyms[token]];
		}
		return [...prec, token];
	}, []);
}

export default filterSynonyms;
