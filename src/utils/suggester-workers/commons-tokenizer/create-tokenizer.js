import tokenizer from 'string-tokenizer';
import removeAccents from 'remove-accents';
import prepareStringIndexation from './prepare-string-indexation';
import softTokenizer from './soft-tokenizer';
import createFilterStopWords from './create-filter-stop-words';
import filterStemmer from './filter-stemmer';
import filterLength from './filter-length';
import getRegExpFromPattern from './get-regexp-from-pattern';

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

function createMapFieldsTokenizer(fields, filterStopWords) {
	return fields.reduce(function (mapFieldTokenizers, f) {
		const { name, rules = [], min, language = 'French' } = f;
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
					return filterStemmer(
						filterStopWords(filterLength(tokensToArray(what), min)),
						language
					);
				},
			};
		}
		return { ...mapFieldTokenizers, [name]: defaultTokenizeIt };
	}, {});
}

function createTokenizer(fields, stopWords) {
	const filterStopWords = createFilterStopWords(stopWords);
	const FIELDS_TOKENIZER_MAP = createMapFieldsTokenizer(
		fields || [],
		filterStopWords
	);

	return function (field, entity) {
		const { name } = field;
		const tokenizeIt = FIELDS_TOKENIZER_MAP[name];
		const value = `${entity[name]}`;
		return tokenizeIt(removeAccents(`${value}`).toLowerCase());
	};
}

function createEntityTokenizer(fields, stopWords) {
	const tokenizeAll = createTokenizer(fields, stopWords);
	return function (entity) {
		return fields.reduce(function (a, field) {
			return [...a, ...tokenizeAll(field, entity)];
		}, []);
	};
}

export default createEntityTokenizer;
