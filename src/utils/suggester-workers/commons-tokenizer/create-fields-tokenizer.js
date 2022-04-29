import prepareStringIndexation from './prepare-string-indexation';
import softTokenizer from './soft-tokenizer';
import tokenizer from 'string-tokenizer';
import getRegExpFromPattern from './get-regexp-from-pattern';

function defaultTokenizeIt(string) {
	return [prepareStringIndexation(string)];
}

function toArray(content) {
	return Array.isArray(content) ? content : [content];
}

function tokensToArray(tokenized) {
	return Object.entries(tokenized).reduce(function (a, [k, values]) {
		if (k.startsWith('pattern')) {
			return [...a, ...toArray(values)];
		}
		return a;
	}, []);
}

function createFieldsTokenizer(field, filtersStack) {
	const {
		name,
		rules = [],
		min,
		language = 'French',
		stemmer = true,
		synonyms = {},
	} = field;
	if (rules === 'soft') {
		return softTokenizer;
	}
	if (rules.length) {
		const tokenRules = rules.reduce(function (rulesMap, pattern, index) {
			return {
				...rulesMap,
				[`pattern${name}${index}`]: getRegExpFromPattern(pattern),
			};
		}, {});

		return function (string) {
			const what = tokenizer().input(string).tokens(tokenRules).resolve();
			return filtersStack(tokensToArray(what), {
				min,
				language,
				stemmer,
				synonyms,
			});
		};
	}
	return defaultTokenizeIt;
}

export default createFieldsTokenizer;
