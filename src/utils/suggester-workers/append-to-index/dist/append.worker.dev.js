

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _append = _interopRequireDefault(require("./append"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-restricted-globals */
self.onmessage = function (e) {
  function log(message) {
    self.postMessage(message);
  }

  var _e$data = e.data,
      name = _e$data.name,
      version = _e$data.version,
      stopWords = _e$data.stopWords,
      fields = _e$data.fields,
      entities = _e$data.entities;
  (0, _append["default"])({
    name: name,
    version: version,
    stopWords: stopWords,
    fields: fields
  }, version, entities, log).then(function () {
    self.postMessage('success');
  });
};

var test = 'test';
exports.test = test;