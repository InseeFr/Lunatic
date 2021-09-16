import getStemmer from './get-stemmer';

function filterStemmer(tokens, language) {
	const stemmer = getStemmer(language);
	return tokens.map(function (token) {
		return stemmer(token);
	});
}

export default filterStemmer;
