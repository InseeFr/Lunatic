
exports.__esModule = true;
exports.createAppendTask = void 0;
var create_worker_ts_1 = require("../create-worker-ts");
var workerPath = process.env.LUNATIC_LOADER_WORKER_PATH ||
    process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH ||
    'workers/lunatic-loader-worker-0.1.0.js';
function consoleLogging() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (any) {
        console.log("suggester: " + JSON.stringify(any));
    });
}
/**
 * Only with Worker
 */
function createAppendTask(info, version, log) {
    if (log === void 0) { log = consoleLogging; }
    var name = info.name, fields = info.fields, stopWords = info.stopWords;
    var worker = create_worker_ts_1.createWorker(workerPath);
    var start = false;
    var stop = false;
    function launch(entities, post) {
        if (post === void 0) { post = function () { return null; }; }
        return new Promise(function (resolve) {
            start = true;
            if (worker) {
                worker.addEventListener('message', function (e) {
                    var data = e.data;
                    if (data === 'success') {
                        if (!stop) {
                            post();
                        }
                        resolve(true);
                    }
                    else {
                        log(data);
                    }
                });
                worker.postMessage({ name: name, version: version, fields: fields, stopWords: stopWords, entities: entities });
            }
        });
    }
    function terminate() {
        if (start) {
            stop = true;
            if (worker) {
                worker.terminate();
            }
        }
    }
    return [launch, terminate];
}
exports.createAppendTask = createAppendTask;
