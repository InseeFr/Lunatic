/* eslint-disable no-restricted-globals */
function getIDB(): IDBFactory {
	if (typeof window === 'undefined') {
		return {} as any;
	}
	const what: any = self || window;
	return (
		what.indexedDB ||
		what.mozIndexedDB ||
		what.webkitIndexedDB ||
		what.msIndexedDB
	);
}

export default getIDB;
