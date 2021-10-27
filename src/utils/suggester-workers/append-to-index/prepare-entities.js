import { createTokenizer } from '../commons-tokenizer';
import MESSAGES from './store-messages';

const DEFAULT_BATCH_SIZE = 1000;

function appendField(fields, field) {
	if (fields.indexOf(field) !== -1) {
		return fields;
	}
	return [...fields, field];
}

function createTokensMap(tokensFields) {
	return Object.entries(tokensFields).reduce(function (map, [field, tokens]) {
		return tokens.reduce(function (map2, token) {
			if (token in map2) {
				const entry = map2[token];
				const { fields, count } = entry;
				return {
					...map2,
					[token]: {
						count: count + 1,
						fields: appendField(fields, field),
					},
				};
			}
			return { ...map2, [token]: { count: 1, fields: [field] } };
		}, map);
	}, {});
}

function prepareEntities(entities, { fields, stopWords }, log) {
	const tokenizer = createTokenizer(fields, stopWords);

	let done = 0;
	const size = DEFAULT_BATCH_SIZE;
	const { length: max } = entities || [];

	return entities.map(function (suggestion) {
		const { id } = suggestion;
		if (id) {
			const tokensFields = tokenizer(suggestion);
			const tokensMap = createTokensMap(tokensFields);

			done++;
			if (done % size === 0 || done === max) {
				log({
					message: {
						...MESSAGES.indexBatch,
						max,
						done,
						percent: (done / max) * 100,
					},
				});
			}
			return { id, suggestion, tokens: Object.keys(tokensMap), tokensMap };
		} else throw new Error(`Missing id on entity.`);
	}, []);
}

export default prepareEntities;
