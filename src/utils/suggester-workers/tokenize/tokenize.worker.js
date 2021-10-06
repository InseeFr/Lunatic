/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import tokenize from './tokenize';

self.onmessage = function (e) {
	const { input, pattern } = e.data;
	const tokens = tokenize(input, pattern);
	self.postMessage(tokens);
};
