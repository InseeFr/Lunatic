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
	console.log('Running add-workers-to-public....');

	if (!fs.existsSync(currentPublicFolder)) {
		fs.mkdirSync(currentPublicFolder, { recursive: true });
	}

	Object.keys(workersPath).forEach((worker) => {
		const { name, source, dest } = workersPath[worker];
		const isWorkerExists = fs.existsSync(dest);

		if (!isWorkerExists) {
			console.log(`Copy : ${name} to ${currentPublicFolder}`);
			fs.copyFileSync(source, dest);
		} else {
			console.log(`${name} is already in ${currentPublicFolder} -> Skipped`);
		}
	});
};

const isLunaticPostInstall = () => {
	const lunaticName = lunaticPackageJson.name;
	const currentName = currentPackageJson.name;

	const currentNpmLiveCycle = process.env.npm_lifecycle_event;
	return lunaticName === currentName && currentNpmLiveCycle === 'postinstall';
};

if (isLunaticPostInstall()) {
	console.log('PostInstall skipped !');
} else copyWorkerToPublicFolder();
