/* eslint-disable no-restricted-globals */
function getIDB(): IDBFactory {
	const what: any = self || window;
	return (
		what.indexedDB ||
		what.mozIndexedDB ||
		what.webkitIndexedDB ||
		what.msIndexedDB
	);
}

export default getIDB;
