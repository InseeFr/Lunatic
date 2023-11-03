// Enable cross domain workers
import { Logger } from '../logger';

declare let window: any;

const logStyle = 'color: #915211; font-size: 20px;';

const getRegisterError = (workerUrl: string) =>
	`%cFailed to register Lunatic-Worker at : "${workerUrl}".`;

const testSameOrigin = (url: string) => {
	let loc = window.location;
	let a = document.createElement('a');
	a.href = url;
	return (
		a.hostname === loc.hostname &&
		a.port === loc.port &&
		a.protocol === loc.protocol
	);
};

const createWorkerFallback = (workerUrl: string) => {
	Logger.info('Create worker for MFE');
	let worker = null;
	try {
		let blob;
		try {
			blob = new Blob([`importScripts('${workerUrl}');`], {
				type: 'application/javascript',
			});
		} catch (e) {
			let blobBuilder = new (window.BlobBuilder ||
				window.WebKitBlobBuilder ||
				window.MozBlobBuilder)();
			blobBuilder.append(`importScripts('${workerUrl}');`);
			blob = blobBuilder.getBlob('application/javascript');
		}
		let url = window.URL || window.webkitURL;
		let blobUrl = url.createObjectURL(blob);
		worker = new Worker(blobUrl);
		worker.onerror = (event) => {
			event.preventDefault();
			console.error(getRegisterError(workerUrl));
			console.error(
				`%cAre you sure that the worker is available at "${workerUrl}" ? \n Did you run "npx @inseefr/lunatic workers" to add Lunatic workers to your project ?`,
				logStyle
			);
		};
	} catch (e1) {
		console.error(
			`Lunatic-worker : Failed to load web worker at : "${workerUrl}"`
		);
	}
	return worker;
};

export const createWorker = (workerUrl: string) => {
	let worker = null;
	try {
		if (testSameOrigin(workerUrl)) {
			worker = new Worker(workerUrl);
			worker.onerror = (event) => {
				event.preventDefault();
				worker = createWorkerFallback(workerUrl);
			};
		} else {
			worker = createWorkerFallback(workerUrl);
		}
	} catch (e) {
		worker = createWorkerFallback(workerUrl);
	}
	return worker;
};
