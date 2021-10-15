import tokenizer from 'string-tokenizer';
import removeAccents from 'remove-accents';
import prepareStringIndexation from './prepare-string-indexation';
import softTokenizer from './soft-tokenizer';
import createFilterStopWords from './create-filter-stop-words';
import filterStemmer from './filter-stemmer';
import filterLength from './filter-length';
import filterSynonyms from './filter-synonyms';
import getRegExpFromPattern from './get-regexp-from-pattern';

function createStemmedFiltersStack({ filterStopWords }) {
	return [filterStemmer, filterSynonyms, filterStopWords, filterLength].reduce(
		function (next, current) {
			return (tokens, args) => next(current(tokens, args), args);
		},
		(t) => t
	);
}

function defaultTokenizeIt(string) {
	return [prepareStringIndexation(string)];
}

export function tokensToArray(tokenized) {
	return Object.entries(tokenized).reduce(function (a, [k, values]) {
		if (k.startsWith('pattern')) {
			if (typeof values === 'string') {
				return [...a, values];
			}
			return [...a, ...values];
		}
		return a;
	}, []);
}

function createMapFieldsTokenizer(fields, filtersStack) {
	return fields.reduce(function (mapFieldTokenizers, field) {
		const {
			name,
			rules = [],
			min,
			language = 'French',
			stemmer = true,
			synonyms = {},
		} = field;
		if (rules === 'soft') {
			return { ...mapFieldTokenizers, [name]: softTokenizer };
		}
		if (rules.length) {
			const tokenRules = rules.reduce(function (rulesMap, pattern, index) {
				return {
					...rulesMap,
					[`pattern${name}${index}`]: getRegExpFromPattern(pattern),
				};
			}, {});

			return {
				...mapFieldTokenizers,
				[name]: function (string) {
					const what = tokenizer().input(string).tokens(tokenRules).resolve();
					// const words = stemmer
					// 	? filterStemmer(
					// 			filterSynonyms(
					// 				filterStopWords(filterLength(tokensToArray(what), min)),
					// 				language
					// 			),
					// 			synonyms
					// 	  )
					// 	: filterSynonyms(
					// 			filterStopWords(filterLength(tokensToArray(what), min)),
					// 			synonyms
					// 	  );

					return filtersStack(tokensToArray(what), {
						min,
						language,
						stemmer,
						synonyms,
					});
				},
			};
		}
		return { ...mapFieldTokenizers, [name]: defaultTokenizeIt };
	}, {});
}

function createTokenizer(fields, stopWords) {
	const filterStopWords = createFilterStopWords(stopWords);
	const filtersStack = createStemmedFiltersStack({ filterStopWords });
	const FIELDS_TOKENIZER_MAP = createMapFieldsTokenizer(
		fields || [],
		filtersStack
	);

	return function (field, entity) {
		const { name } = field;
		const tokenizeIt = FIELDS_TOKENIZER_MAP[name];
		if (name in entity) {
			const value = `${entity[name]}`;
			return tokenizeIt(removeAccents(`${value}`).toLowerCase());
		}
		return [];
	};
}

function createEntityTokenizer(fields, stopWords) {
	const tokenizeAll = createTokenizer(fields, stopWords);
	return function (entity) {
		return fields.reduce(function (a, field) {
			const { name } = field;
			return { ...a, [name]: tokenizeAll(field, entity) };
		}, {});
	};
}

export default createEntityTokenizer;
