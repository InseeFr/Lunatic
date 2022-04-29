import tokenizer from 'string-tokenizer';
import {
	filterStemmer,
	filterLength,
	filterDouble,
	getRegExpFromPattern,
	filterToLower,
} from '../../commons-tokenizer';
import { composeFilters } from '../../commons-tokenizer/filters';

const filterTokens = composeFilters(
	filterDouble,
	filterStemmer,
	filterToLower,
	filterLength
);

function toArray(tokens) {
	if (tokens) {
		return Array.isArray(tokens) ? tokens : [tokens];
	}
	return [];
}

function queryParserTokenized(query = '', { pattern, ...args } = {}) {
	const patternForTokens = { tokens: getRegExpFromPattern(pattern) };
	const { tokens } = tokenizer()
		.input(query)
		.tokens(patternForTokens)
		.resolve();
	return filterTokens(toArray(tokens), args);
}

export default queryParserTokenized;
