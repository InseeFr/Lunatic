import { CONSTANTES } from '../../store-tools';
import { openDb, idbBulkInsert } from '../../idb-tools';
// @ts-ignore
import MESSAGES from './store-messages';
// @ts-ignore
import prepareEntities from './prepare-entities';

async function append(
	storeInfo: { name: string; stopWords?: string[]; fields: string[] },
	version: number,
	entities: unknown,
	log = (v: any) => null
) {
	try {
		const { name, stopWords, fields } = storeInfo;
		const prepared = prepareEntities(entities, { fields, stopWords }, log);
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
		log({ message: 'Errors occurred when trying to append data.' });
		console.error(e);
	}
}

export default append;
