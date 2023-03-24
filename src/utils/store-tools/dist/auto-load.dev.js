"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSuggesters = void 0;

var _openOrCreateStore = _interopRequireDefault(require("./open-or-create-store"));

var _updateStoreInfo = _interopRequireDefault(require("./create/update-store-info"));

var _clearStoreData = _interopRequireDefault(require("./clear-store-data"));

var _clearStoreInfo = _interopRequireDefault(require("./clear-store-info"));

var _createWorker = require("../suggester-workers/create-worker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var workerPath = process.env.LUNATIC_LOADER_WORKER_PATH || process.env.REACT_APP_LUNATIC_LOADER_WORKER_PATH || 'workers/lunatic-loader-worker-0.1.0.js';

var loadSuggesters = function loadSuggesters(suggesterFetcher) {
  return function _callee3(suggesters) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            Object.entries(suggesters).forEach(function _callee(_ref) {
              var _ref2, name, attrs, version, db;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _ref2 = _slicedToArray(_ref, 2), name = _ref2[0], attrs = _ref2[1];
                      version = attrs.version;
                      _context.next = 4;
                      return regeneratorRuntime.awrap((0, _openOrCreateStore["default"])(name, version));

                    case 4:
                      db = _context.sent;

                      if (!db) {
                        _context.next = 12;
                        break;
                      }

                      _context.next = 8;
                      return regeneratorRuntime.awrap((0, _clearStoreData["default"])(db));

                    case 8:
                      _context.next = 10;
                      return regeneratorRuntime.awrap((0, _clearStoreInfo["default"])(db));

                    case 10:
                      _context.next = 12;
                      return regeneratorRuntime.awrap((0, _updateStoreInfo["default"])(db, attrs));

                    case 12:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
            Object.entries(suggesters).forEach(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                  name = _ref4[0],
                  attrs = _ref4[1];

              var url = attrs.url,
                  version = attrs.version,
                  fields = attrs.fields,
                  stopWords = attrs.stopWords;
              var f = suggesterFetcher || fetch;
              f(url).then(function _callee2(res) {
                var data, _task, _task2, launch, terminate;

                return regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(res.json());

                      case 2:
                        data = _context2.sent;
                        _task = task({
                          name: name,
                          fields: fields,
                          stopWords: stopWords
                        }, version), _task2 = _slicedToArray(_task, 2), launch = _task2[0], terminate = _task2[1];
                        _context2.next = 6;
                        return regeneratorRuntime.awrap(launch(data));

                      case 6:
                        terminate();

                      case 7:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};
/**
 * Only with Worker
 */


exports.loadSuggesters = loadSuggesters;

function task(_ref5, version) {
  var name = _ref5.name,
      fields = _ref5.fields,
      stopWords = _ref5.stopWords;
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return null;
  };
  var worker = (0, _createWorker.createWorker)(workerPath);
  var start = false;
  var stop = false;

  function launch(entities) {
    var post = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return null;
    };
    return new Promise(function (resolve) {
      start = true;
      worker.postMessage({
        name: name,
        version: version,
        fields: fields,
        entities: entities,
        stopWords: stopWords
      });
      worker.addEventListener('message', function (e) {
        var data = e.data;

        if (data === 'success') {
          if (!stop) {
            post();
          }

          resolve(data);
        } else {
          log(data);
        }
      });
    });
  }

  function terminate() {
    if (start) {
      stop = true;
      worker.terminate();
    }
  }

  return [launch, terminate];
}