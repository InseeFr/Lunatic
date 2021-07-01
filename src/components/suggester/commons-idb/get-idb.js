function getIDB() {
	return indexedDB;
	// const what = self || window;
	// return what.indexedDB || what.mozIndexedDB || what.webkitIndexedDB || what.msIndexedDB;
}

export default getIDB;
