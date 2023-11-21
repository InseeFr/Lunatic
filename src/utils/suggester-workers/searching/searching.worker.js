/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searching from './searching';

let LAST_SEARCH = undefined;

self.onmessage = function (e) {
	const { search, name, version, meloto } = e.data;
	LAST_SEARCH = search;
	searching(search, { name, version, meloto }).then(function (result) {
		if (search === LAST_SEARCH) {
			self.postMessage(result);
		}
	});
};
