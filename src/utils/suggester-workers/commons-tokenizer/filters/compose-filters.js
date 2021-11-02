import filterStemmer from './filter-stemmer';
import filterLength from './filter-length';
import filterSynonyms from './filter-synonyms';
import filterAccentsToLower from './filter-accents-to-lower';

function createGetFilters({ filterStopWords }) {
	return [
		filterAccentsToLower,
		filterStemmer,
		filterSynonyms,
		filterStopWords,
		filterLength,
	].reduce(
		(next, current) => (tokens, args) => next(current(tokens, args), args),
		(t) => t
	);
}

export default createGetFilters;
