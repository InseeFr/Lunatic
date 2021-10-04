/* eslint-disable no-restricted-globals */
import createDbOpener from './create-db-opener';

function onUpgradeNeeded(e, _, reject) {
	e.target.transaction.abort();
	reject({ message: 'base seems to need an upgrade!' });
}

function onSuccess(e, resolve) {
	resolve(e.target.result);
}

export default createDbOpener({ onUpgradeNeeded, onSuccess });
