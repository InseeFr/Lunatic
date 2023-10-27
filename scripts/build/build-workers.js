#!/usr/bin/env node
const webpack = require('webpack');
const fs = require('fs');

const { workersPath } = require('./workers-paths');

const appendWorkerConfig = require(workersPath.append.webpack);
const labelWorkerConfig = require(workersPath.label.webpack);
const searchingWorkerConfig = require(workersPath.searching.webpack);

const buildWorker = async (webpackConfig) => {
	const compiler = webpack(webpackConfig);
	compiler.run((err, stats) => {
		if (err) console.log(err);
		if (stats?.hasErrors()) console.log(stats);
	});
};

const buildWorkers = () => {
	const isAppendWorkerExists = fs.existsSync(workersPath.append.source);
	const isLabelWorkerExists = fs.existsSync(workersPath.label.source);
	const isSearchingWorkerExists = fs.existsSync(workersPath.searching.source);

	if (!isAppendWorkerExists) {
		console.log(`Build : ${workersPath.append.name}`);
		buildWorker(appendWorkerConfig);
	} else console.log(`${workersPath.append.name} is already built -> Skipped`);

	if (!isLabelWorkerExists) {
		console.log(`Build : ${workersPath.label.name}`);
		buildWorker(labelWorkerConfig);
	} else console.log(`${workersPath.label.name} is already built -> Skipped`);
	if (!isSearchingWorkerExists) {
		console.log(`Build : ${workersPath.searching.name}`);
		buildWorker(searchingWorkerConfig);
	} else
		console.log(`${workersPath.searching.name} is already built -> Skipped`);
};

buildWorkers();
