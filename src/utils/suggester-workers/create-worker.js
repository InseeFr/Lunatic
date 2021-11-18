// Enable cross domain workers

export const createWorker = (workerUrl) => {
	const scriptOrigin = new URL(document.currentScript.src).origin;
	var worker = null;
	try {
		var blob;
		try {
			blob = new Blob([`importScripts('${scriptOrigin}${workerUrl}');`], {
				type: 'application/javascript',
			});
		} catch (e) {
			var blobBuilder = new (window.BlobBuilder ||
				window.WebKitBlobBuilder ||
				window.MozBlobBuilder)();
			blobBuilder.append(`importScripts('${scriptOrigin}${workerUrl}');`);
			blob = blobBuilder.getBlob('application/javascript');
		}
		var url = window.URL || window.webkitURL;
		var blobUrl = url.createObjectURL(blob);
		worker = new Worker(blobUrl);
	} catch (e1) {
		console.error(`Lunatic-worker : Failed to load web worker : ${workerUrl}`);
	}
	return worker;
};
