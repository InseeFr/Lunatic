/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searching from './searching';

self.onmessage = function (e) {
	const { search, name, version } = e.data;
	searching(search, { name, version }).then(function (result) {
		self.postMessage(result);
	});
};
