import createFieldsTokenizer from './create-fields-tokenizer';
import { composeFilters, createFilterStopWords } from './filters';
import filterStemmer from './filters/filter-stemmer';
import filterLength from './filters/filter-length';
import filterSynonyms from './filters/filter-synonyms';
import filterAccentsToLower from './filters/filter-accents-to-lower';
import filterDouble from './filters/filter-double';

function createMapFieldsTokenizer(fields, filters) {
	return fields.reduce(function (mapFieldTokenizers, field) {
		const { name } = field;
		return {
			...mapFieldTokenizers,
			[name]: createFieldsTokenizer(field, filters),
		};
	}, {});
}

function createFilterTokens(fields, stopWords) {
	const filterStopWords = createFilterStopWords(stopWords);
	const getFilters = composeFilters(
		filterDouble,
		filterAccentsToLower,
		filterStemmer,
		filterSynonyms,
		filterStopWords,
		filterLength
	);
	const FIELDS_TOKENIZER_MAP = createMapFieldsTokenizer(
		fields || [],
		getFilters
	);

	return function (field, entity) {
		const { name } = field;
		const tokenizeIt = FIELDS_TOKENIZER_MAP[name];
		if (name in entity) {
			return tokenizeIt(`${entity[name]}`);
		}
		return [];
	};
}

function createEntityTokenizer(fields, stopWords) {
	const tokenizeAll = createFilterTokens(fields, stopWords);
	return function (entity) {
		return fields.reduce(function (a, field) {
			const { name } = field;
			return { ...a, [name]: tokenizeAll(field, entity) };
		}, {});
	};
}

export default createEntityTokenizer;
