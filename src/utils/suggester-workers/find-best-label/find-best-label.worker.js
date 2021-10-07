/* eslint-disable no-restricted-globals */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import tokenize from './tokenize';
import findBestLabel from './find-best-label';

const TASKS = [];
let RUN = false;

function executeTask(task) {
	const { option, search, idTask } = task;
	const { tokensMap } = option;
	const { search: st } = tokenize({ search });
	const label = findBestLabel(st, tokensMap);

	self.postMessage({ response: label, idTask });
}

function appendTask(task) {
	TASKS.push(task);
	if (!RUN) {
		activate();
	}
}

function activate() {
	RUN = true;
	while (TASKS.length) {
		const task = TASKS.pop();
		executeTask(task);
	}
	RUN = false;
}

self.onmessage = function (e) {
	const { option, search, idTask } = e.data;
	if (option && search && idTask) {
		appendTask({ option, search, idTask });
	}
};
