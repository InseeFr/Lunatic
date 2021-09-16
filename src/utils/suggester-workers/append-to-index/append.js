import { CONSTANTES } from '../../store-tools';
import { openDb, idbBulkInsert } from '../../idb-tools';
import MESSAGES from './store-messages';
import { createTokenizer } from '../commons-tokenizer';

function prepareEntities(fields, entities, stopWords, log) {
	const tokenizer = createTokenizer(fields, stopWords);

	let done = 0;
	const size = 1000;
	const max = entities.length;

	return entities.map(function (suggestion) {
		const { id } = suggestion;
		if (id) {
			const tokens = tokenizer(suggestion);
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
			return { id, suggestion, tokens };
		} else throw new Error(`Missing id on entity.`);
	}, []);
}

async function append(storeInfo, version, entities, log = () => null) {
	try {
		const { name, stopWords, fields } = storeInfo;
		const prepared = prepareEntities(fields, entities, stopWords, log);
		const db = await openDb(name, version);
		log({ message: MESSAGES.startInsertBatch });
		await idbBulkInsert(db, CONSTANTES.STORE_DATA_NAME, function (args) {
			const { message } = args;
			log({ message });
		})(prepared);
		log({ message: MESSAGES.insertBatchDone });
		log({ message: MESSAGES.done });
		return 'success';
	} catch (e) {
		log({ message: 'Errors occured when trying to append data.' });
		console.error(e);
	}
}

export default append;
