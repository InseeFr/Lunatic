#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { currentPublicFolder, workersPath } = require('./workers-paths');

const currentPackageJson = require(path.resolve(
	`${process.cwd()}/package.json`
));
const lunaticPackageJson = require('../../package.json');

/**
 * Copy worker only if not exists
 */
const copyWorkerToPublicFolder = () => {
	if (!fs.existsSync(currentPublicFolder)) {
		fs.mkdirSync(currentPublicFolder, { recursive: true });
	}
	const isAppendWorkerExists = fs.existsSync(workersPath.append.dest);
	const isLabelWorkerExists = fs.existsSync(workersPath.label.dest);
	const isSearchingWorkerExists = fs.existsSync(workersPath.searching.dest);

	if (!isAppendWorkerExists) {
		console.log(`Copy : ${workersPath.append.name} to ${currentPublicFolder}`);
		fs.copyFileSync(workersPath.append.source, workersPath.append.dest);
	} else {
		console.log(
			`${workersPath.append.name} is already in ${currentPublicFolder} -> Skipped`
		);
	}
	if (!isLabelWorkerExists) {
		console.log(`Copy : ${workersPath.label.name} to ${currentPublicFolder}`);
		fs.copyFileSync(workersPath.label.source, workersPath.label.dest);
	} else {
		console.log(
			`${workersPath.label.name} is already in ${currentPublicFolder} -> Skipped`
		);
	}
	if (!isSearchingWorkerExists) {
		console.log(
			`Copy : ${workersPath.searching.name} to ${currentPublicFolder}`
		);
		fs.copyFileSync(workersPath.searching.source, workersPath.searching.dest);
	} else {
		console.log(
			`${workersPath.searching.name} is already in ${currentPublicFolder} -> Skipped`
		);
	}
};

const isLunaticPostInstall = () => {
	const lunaticName = lunaticPackageJson.name;
	const currentName = currentPackageJson.name;

	const currentNpmLiveCycle = process.env.npm_lifecycle_event;
	return lunaticName === currentName && currentNpmLiveCycle === 'postinstall';
};

if (isLunaticPostInstall()) {
	console.log('PostInstall skiped !');
} else copyWorkerToPublicFolder();
