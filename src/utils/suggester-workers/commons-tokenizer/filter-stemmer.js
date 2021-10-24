import getStemmer from './get-stemmer';

function filterStemmer(tokens, { language, stemmer = true }) {
	if (stemmer) {
		const stemming = getStemmer(language);
		return tokens.map(function (token) {
			return stemming(token);
		});
	}
	return tokens;
}

export default filterStemmer;
