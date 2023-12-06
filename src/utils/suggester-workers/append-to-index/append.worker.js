/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import append from './append';

self.onmessage = function (e) {
	function log(message) {
		self.postMessage(message);
	}
	const { name, version, stopWords, fields, entities } = e.data;
	append({ name, version, stopWords, fields }, version, entities, log).then(
		function () {
			self.postMessage('success');
			self.close()
		}
	);
};

export const test = 'test';
