import { BULK_INSERT_MESSAGES } from '../../idb-tools';

const MESSAGES = {
	...BULK_INSERT_MESSAGES,
	startCreateIndex: { type: 'fill-store/start-create-index' },
	indexBatch: {
		type: 'fill-store/index-batch',
		max: undefined,
		done: undefined,
		percent: undefined,
	},
	createIndexDone: { type: 'fill-store/create-index-done' },
	//
	storeClear: { type: 'fill-store/clear-store' },
	startInsertBatch: { type: 'fill-store/start-insert-bacth' },
	insertBatchDone: { type: 'fill-store/insert-done' },
	done: { type: 'fill-store/done' },
	error: { type: 'fill-store/error' },
};

export default MESSAGES;
