import {
	openOrCreateStore,
	clearStoreInfo,
	clearStoreData,
	updateStoreInfo,
} from '../../utils/store-tools';
import { createAppendTask } from '../../utils/suggester-workers/append-to-index';

async function prepareStore(storeInfo, idbVersion) {
	const { name } = storeInfo;
	const db = await openOrCreateStore(name, idbVersion);
	if (db) {
		await clearStoreInfo(db);
		await clearStoreData(db);
		await updateStoreInfo(db, storeInfo);

		return true;
	}
	return false;
}

async function loadOne(suggester, logging) {
	const { idbVersion, fetch, ...storeInfo } = suggester;
	const ready = await prepareStore(storeInfo, idbVersion);

	if (ready) {
		const data = await fetch();
		const [launch, terminate] = createAppendTask(
			storeInfo,
			idbVersion,
			logging
		);
		await launch(data);
		terminate();
	}
}

async function loadSuggesters(suggesters = []) {
	try {
		for (let suggester of suggesters) {
			const { autoLoad } = suggester;
			if (autoLoad) {
				await loadOne(suggester, () => {});
			}
		}
		return true;
	} catch (e) {
		console.warn(
			"Une erreur s'est produite lors de l'initialisation des suggesters."
		);
		return false;
	}
}

export default loadSuggesters;
