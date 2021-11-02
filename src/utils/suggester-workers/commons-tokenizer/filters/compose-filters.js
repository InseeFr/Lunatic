import filterStemmer from './filter-stemmer';
import filterLength from './filter-length';
import filterSynonyms from './filter-synonyms';

function createGetFilters({ filterStopWords }) {
	return [filterStemmer, filterSynonyms, filterStopWords, filterLength].reduce(
		(next, current) => (tokens, args) => next(current(tokens, args), args),
		(t) => t
	);
}

export default createGetFilters;
