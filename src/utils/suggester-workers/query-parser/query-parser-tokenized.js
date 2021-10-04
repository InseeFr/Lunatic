import tokenizer from 'string-tokenizer';
import removeAccents from 'remove-accents';
import {
	filterStemmer,
	filterLength,
	filterDouble,
} from '../commons-tokenizer';
import { getRegExpFromPattern } from '../commons-tokenizer';

function toArray(tokens) {
	if (tokens) {
		return Array.isArray(tokens) ? tokens : [tokens];
	}
	return [];
}

function parser(
	query = '',
	{ language = 'French', pattern = /[\w]+/, min = 2, stemmer = true } = {}
) {
	const patternForTokens = { tokens: getRegExpFromPattern(pattern) };
	const { tokens } = tokenizer()
		.input(removeAccents(query).toLowerCase())
		.tokens(patternForTokens)
		.resolve();
	return stemmer
		? filterDouble(filterStemmer(filterLength(toArray(tokens), min), language))
		: filterDouble(filterLength(toArray(tokens), min));
}

export default parser;
