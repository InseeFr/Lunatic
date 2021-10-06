/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import tokenize from './tokenize';
import findBestLabel from './find-best-label';

self.onmessage = function (e) {
	const { option, search } = e.data;
	const { tokensMap } = option;
	const { search: st } = tokenize({ search });
	const label = findBestLabel(st, tokensMap);
	self.postMessage(label);
};
