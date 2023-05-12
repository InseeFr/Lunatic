/* eslint-disable no-restricted-globals */
import createDbOpener from './create-db-opener';

function onUpgradeNeeded(
	e: IDBVersionChangeEvent & {
		target: IDBOpenDBRequest;
	},
	_: unknown,
	reject: (v: { message: string }) => void
) {
	e.target.transaction?.abort();
	reject({ message: 'base seems to need an upgrade!' });
}

function onSuccess(
	e: { target: { result: IDBDatabase } },
	resolve: (db: IDBDatabase) => void
) {
	resolve(e.target.result);
}

export default createDbOpener({ onUpgradeNeeded, onSuccess });
