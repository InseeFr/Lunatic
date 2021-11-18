// Enable cross domain workers
export const createWorker = (workerUrl) => {
	var worker = null;
	try {
		worker = new Worker(workerUrl);
	} catch (e) {
		try {
			var blob;
			try {
				blob = new Blob([`importScripts('${workerUrl}');`], {
					type: 'application/javascript',
				});
			} catch (e) {
				var blobBuilder = new (window.BlobBuilder ||
					window.WebKitBlobBuilder ||
					window.MozBlobBuilder)();
				blobBuilder.append(`importScripts('${workerUrl}');`);
				blob = blobBuilder.getBlob('application/javascript');
			}
			var url = window.URL || window.webkitURL;
			var blobUrl = url.createObjectURL(blob);
			worker = new Worker(blobUrl);
		} catch (e1) {
			console.error(
				`Lunatic-worker : Failed to load web worker : ${workerUrl}`
			);
		}
	}
	return worker;
};
