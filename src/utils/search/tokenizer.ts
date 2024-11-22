import type { SearchInfo } from './SearchInterface';
import type { ItemOf } from '../../type.utils';

/**
 * Generates a tokenize method
 */
export const tokenizer =
	(info: SearchInfo) => (str: string, fieldName?: string) => {
		const field = info.fields.find((f) => f.name === fieldName);
		const stopWords = info.stopWords;

		return field
			? tokenizeIndex(str, field, stopWords)
			: tokenizeQuery(str, info.queryParser, stopWords);
	};

/**
 * Tokenizer used for the query entered by the user (based on "queryParser" info)
 */
export const tokenizeQuery = (
	str: string,
	info: SearchInfo['queryParser'],
	stopWords?: string[]
) => {
	if (info.type === 'soft') {
		return filterStopWords(normalizeStr(str), stopWords)
			.split(/[^a-z0-9]+/)
			.filter((w) => w.length > 0);
	}

	const wordRegex =
		info.params.pattern && info.params.pattern !== 'soft'
			? new RegExp(info.params.pattern, 'gi')
			: /\w+/gi;
	const minLength = info.params.min ?? 1;

	return (
		filterStopWords(normalizeStr(str), stopWords)
			.match(wordRegex)
			?.filter((w) => w.length >= minLength) ?? []
	);
};

/**
 * Tokenizer used for indexing (based on "fields" specification)
 */
export const tokenizeIndex = (
	str: string,
	info: ItemOf<SearchInfo['fields']>,
	stopWords?: string[]
) => {
	const wordRegex =
		info.rules && info.rules !== 'soft'
			? new RegExp(info.rules![0], 'gi')
			: /\w+/gi;
	const minLength = info.min ?? 1;

	// For synonyms, add the synonyms to the string
	if (info.synonyms) {
		for (const source in info.synonyms) {
			const synonyms = info.synonyms[source].join(' ');
			str = str.replaceAll(source, `${source} ${synonyms}`);
		}
	}

	return (
		filterStopWords(normalizeStr(str), stopWords)
			.match(wordRegex)
			?.filter((w) => w.length >= minLength) ?? []
	);
};

/**
 * Normalize a string
 * - Remove accent (é => e, à => a
 * - Lowercase
 */
const normalizeStr = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
};

/**
 * remove from a string all the words that are included in a stopwords list
 */
export function filterStopWords(input: string, stopWords?: string[]): string {
	if (!stopWords) {
		return input;
	}
	const lowerCaseStopWords = stopWords.map((word) => word.toLowerCase());
	const words = input.split(/\s+/);
	const filteredWords = words.filter(
		(word) => !lowerCaseStopWords.includes(word.toLowerCase())
	);
	return filteredWords.join(' ');
}
