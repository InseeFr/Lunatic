"use strict";
exports.__esModule = true;
exports.createWorker = void 0;
var testSameOrigin = function (url) {
    var loc = window.location;
    var a = document.createElement('a');
    a.href = url;
    return (a.hostname === loc.hostname &&
        a.port === loc.port &&
        a.protocol === loc.protocol);
};
var createWorkerFallback = function (workerUrl) {
    console.log('Create worker for MFE');
    var worker = null;
    try {
        var blob;
        try {
            blob = new Blob(["importScripts('" + workerUrl + "');"], {
                type: 'application/javascript'
            });
        }
        catch (e) {
            var blobBuilder = new (window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder)();
            blobBuilder.append("importScripts('" + workerUrl + "');");
            blob = blobBuilder.getBlob('application/javascript');
        }
        var url = window.URL || window.webkitURL;
        var blobUrl = url.createObjectURL(blob);
        worker = new Worker(blobUrl);
    }
    catch (e1) {
        console.error("Lunatic-worker : Failed to load web worker : " + workerUrl);
    }
    return worker;
};
exports.createWorker = function (workerUrl) {
    var worker = null;
    try {
        if (testSameOrigin(workerUrl)) {
            worker = new Worker(workerUrl);
            worker.onerror = function (event) {
                event.preventDefault();
                worker = createWorkerFallback(workerUrl);
            };
        }
        else {
            worker = createWorkerFallback(workerUrl);
        }
    }
    catch (e) {
        worker = createWorkerFallback(workerUrl);
    }
    return worker;
};
