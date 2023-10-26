#!/usr/bin/env node
const fs = require('fs');
const { currentPublicWorkersFolder, workersPath } = require('./workers-paths');

/**
 * Copy worker only if not exists
 */
const copyWorkerToPublicFolder = () => {
	if (!fs.existsSync(currentPublicWorkersFolder)) {
		fs.mkdirSync(currentPublicWorkersFolder, { recursive: true });
	}
	const isAppendWorkerExists = fs.existsSync(workersPath.append.dest);
	const isLabelWorkerExists = fs.existsSync(workersPath.label.dest);
	const isSearchingWorkerExists = fs.existsSync(workersPath.searching.dest);

	if (!isAppendWorkerExists) {
		fs.copyFileSync(workersPath.append.source, workersPath.append.dest);
	}
	if (!isLabelWorkerExists) {
		fs.copyFileSync(workersPath.label.source, workersPath.label.dest);
	}
	if (!isSearchingWorkerExists) {
		fs.copyFileSync(workersPath.searching.source, workersPath.searching.dest);
	}
};

copyWorkerToPublicFolder();
