import type { SearchInfo } from './SearchInterface';
import type { ItemOf } from '../../type.utils';

/**
 * Generates a tokenize method
 */
export const tokenizer =
	(info: SearchInfo) => (str: string, fieldName?: string) => {
		const field = info.fields.find((f) => f.name === fieldName);

		return field
			? tokenizeIndex(str, field)
			: tokenizeQuery(str, info.queryParser);
	};

/**
 * Tokenizer used for the query entered by the user (based on "queryParser" info)
 */
export const tokenizeQuery = (str: string, info: SearchInfo['queryParser']) => {
	if (info.type === 'soft') {
		return normalizeStr(str)
			.split(/[^a-z0-9]+/)
			.filter((w) => w.length > 0);
	}

	const wordRegex =
		info.params.pattern && info.params.pattern !== 'soft'
			? /\w+/gi
			: new RegExp(info.params.pattern, 'gi');
	const minLength = info.params.min ?? 1;

	return (
		normalizeStr(str)
			.match(wordRegex)
			?.filter((w) => w.length >= minLength) ?? []
	);
};

/**
 * Tokenizer used for indexing (based on "fields" specification)
 */
export const tokenizeIndex = (
	str: string,
	info: ItemOf<SearchInfo['fields']>
) => {
	const wordRegex =
		info.rules && info.rules !== 'soft'
			? /\w+/gi
			: new RegExp(info.rules![0], 'gi');
	const minLength = info.min ?? 1;

	// For synonyms, add the synonyms to the string
	if (info.synonyms) {
		for (const source in info.synonyms) {
			const synonyms = info.synonyms[source].join(' ');
			str = str.replaceAll(source, `${source} ${synonyms}`);
		}
	}

	return (
		normalizeStr(str)
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
