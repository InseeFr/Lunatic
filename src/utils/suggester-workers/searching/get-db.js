import { openDb } from '../../idb-tools';

let STORES = {};

async function getDb(name, version) {
	if (name in STORES) {
		return STORES[name];
	}
	try {
		const store = await openDb(name, version);
		STORES[name] = store;
		return store;
	} catch (e) {
		throw new Error(`Can't open store ${name} ${version}`);
	}
}

export default getDb;
