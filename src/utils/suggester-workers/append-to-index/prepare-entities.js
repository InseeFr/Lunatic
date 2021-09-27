import { createTokenizer } from '../commons-tokenizer';
import MESSAGES from './store-messages';

const DEFAULT_BATCH_SIZE = 1000;

function prepareEntities(entities, { fields, stopWords, stemmer }, log) {
	const tokenizer = createTokenizer(fields, stopWords, stemmer);

	let done = 0;
	const size = DEFAULT_BATCH_SIZE;
	const { length: max } = entities || [];

	return entities.map(function (suggestion) {
		const { id } = suggestion;
		if (id) {
			const tokensMap = tokenizer(suggestion);
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
