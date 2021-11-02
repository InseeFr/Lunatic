import createFieldsTokenizer from './create-field-tokenizer';
import { composeFilters, createFilterStopWords } from './filters';

function createMapFieldsTokenizer(fields, filters) {
	return fields.reduce(function (mapFieldTokenizers, field) {
		const { name } = field;
		return {
			...mapFieldTokenizers,
			[name]: createFieldsTokenizer(field, filters),
		};
	}, {});
}

function createTokenizer(fields, stopWords) {
	const filterStopWords = createFilterStopWords(stopWords);
	const filters = composeFilters({ filterStopWords });
	const FIELDS_TOKENIZER_MAP = createMapFieldsTokenizer(fields || [], filters);

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
	const tokenizeAll = createTokenizer(fields, stopWords);
	return function (entity) {
		return fields.reduce(function (a, field) {
			const { name } = field;
			return { ...a, [name]: tokenizeAll(field, entity) };
		}, {});
	};
}

export default createEntityTokenizer;
