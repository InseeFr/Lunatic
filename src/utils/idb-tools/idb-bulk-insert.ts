import { IDBLotItem } from './idb-types';

const BULK_LIMIT = 300;

export const BULK_INSERT_MESSAGES = {
	bulkInsertComplete: { type: 'bulk-insert/complete' },
	bulkInsertFinished: { type: 'bulk-insert/finished' },
	bulkInsertError: { type: 'bulk-insert/error' },
} as const;

const pushTask =
	(store: IDBObjectStore, transaction: IDBTransaction) =>
	([first, ...rest] = [] as IDBLotItem[]) => {
		if (first) {
			const request = store.add(first);
			request.onsuccess = () => {
				if (rest.length) {
					pushTask(store, transaction)(rest);
				}
			};

			request.onerror = (e) => {
				throw e;
			};
		}
	};

function split<T = unknown>(entities: T[], limit = BULK_LIMIT): T[][] {
	return entities.reduce(
		([f, ...r], n, i) => {
			return (i + 1) % limit === 0 ? [[n], f, ...r] : [[n, ...f], ...r];
		},
		[[]] as T[][]
	);
}

const bulkPush =
	(
		db: IDBDatabase,
		name: string,
		hook: (v: { message: unknown; error?: Event }) => void,
		resolve: (s: string) => void,
		reject: (e: unknown) => void,
		max: number
	) =>
	(lot: Array<Array<IDBLotItem>>, i = 0, treated = 0) => {
		const [first, ...rest] = lot;
		try {
			if (first) {
				const transaction = db.transaction(name, 'readwrite');
				const store = transaction.objectStore(name);
				pushTask(store, transaction)(first);
				transaction.oncomplete = function () {
					const nextTreated = treated + first.length;
					hook({
						message: {
							...BULK_INSERT_MESSAGES.bulkInsertComplete,
							nb: first.length,
							treated: nextTreated,
							step: i,
							max,
							percent: Math.round((nextTreated / max) * 100),
						},
					});
					bulkPush(
						db,
						name,
						hook,
						resolve,
						reject,
						max
					)(rest, i + 1, nextTreated);
				};
				transaction.onerror = function (e) {
					hook({ message: BULK_INSERT_MESSAGES.bulkInsertError, error: e });
					reject(e);
				};
			} else {
				hook({ message: BULK_INSERT_MESSAGES.bulkInsertFinished });
				resolve('success');
			}
		} catch (e) {
			hook({ message: BULK_INSERT_MESSAGES.bulkInsertError });
			reject(e);
		}
	};

/* */
function bulkInsert(db: IDBDatabase, store: string, hook = () => null) {
	return (entities = []) => {
		const lots = split(entities, BULK_LIMIT);
		return new Promise((resolve, reject) => {
			try {
				bulkPush(db, store, hook, resolve, reject, entities.length)(lots);
			} catch (e) {
				reject(e);
			}
		});
	};
}

export default bulkInsert;
