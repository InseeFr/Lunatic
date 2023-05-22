import getIDB from './get-idb';

const IDB_REF = getIDB();

function onSuccessDefault(
	e: Event & { target: IDBOpenDBRequest },
	resolve: (v: IDBDatabase) => void,
	reject?: (v: any) => void
) {
	resolve(e.target.result);
}

function onUpgradeNeededDefault(
	e: IDBVersionChangeEvent & {
		target: IDBOpenDBRequest;
	},
	resolve: (v: IDBDatabase) => void,
	reject: (v: any) => void
) {
	throw new Error('Upgrade needed hook required!');
}

function onErrorDefault(e: Event, _: unknown, reject: (v: unknown) => void) {
	reject((e as any).error);
}

function createDbOpener({
	onSuccess = onSuccessDefault,
	onUpgradeNeeded = onUpgradeNeededDefault,
	onError = onErrorDefault,
} = {}) {
	return function (name: string, version = 1): Promise<IDBDatabase> {
		return new Promise((resolve, reject) => {
			if (!IDB_REF) {
				reject('indexedDb not supported !');
			}
			const request = IDB_REF.open(name, version);
			request.onupgradeneeded = function (e) {
				if (isOpenDBRequestEvent(e)) {
					onUpgradeNeeded(e, resolve, reject);
				}
			};

			request.onsuccess = function (e) {
				if (isOpenDBRequestEvent(e)) {
					onSuccess(e, resolve, reject);
				}
			};

			request.onerror = function (e) {
				onError(e, resolve, reject);
			};
		});
	};
}

function isOpenDBRequestEvent<T extends Event>(
	e: T
): e is T & {
	target: IDBOpenDBRequest;
} {
	return e.target instanceof IDBOpenDBRequest;
}

export default createDbOpener;
