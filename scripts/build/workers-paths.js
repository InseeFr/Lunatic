var PACKAGE = require('../../package.json');
const path = require('path');

var version = PACKAGE.workersVersion;

const currentPublicFolder = path.resolve(`${process.cwd()}/public/workers`);
const workersReleaseFolder = path.resolve(__dirname, '../../workers-release');

const workersPath = {
	append: {
		name: 'Append worker',
		source: `${workersReleaseFolder}/lunatic-append-worker-${version}.js`,
		dest: `${currentPublicFolder}/lunatic-append-worker-${version}.js`,
		webpack: `${path.resolve(__dirname)}/webpack-append-worker.config.js`,
	},
	label: {
		name: 'Label worker',
		source: `${workersReleaseFolder}/lunatic-label-worker-${version}.js`,
		dest: `${currentPublicFolder}/lunatic-label-worker-${version}.js`,
		webpack: `${path.resolve(__dirname)}/webpack-label-worker.config.js`,
	},
	searching: {
		name: 'Searching worker',
		source: `${workersReleaseFolder}/lunatic-searching-worker-${version}.js`,
		dest: `${currentPublicFolder}/lunatic-searching-worker-${version}.js`,
		webpack: `${path.resolve(__dirname)}/webpack-searching-worker.config.js`,
	},
};

module.exports = {
	currentPublicFolder: currentPublicFolder,
	workersReleaseFolder: workersReleaseFolder,
	workersPath: workersPath,
};
