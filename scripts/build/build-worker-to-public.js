#!/usr/bin/env node
const webpack = require('webpack');

const appendWorkerConfig = require('./webpack-append-worker.config.js');
const labelWorkerConfig = require('./webpack-label-worker.config.js');
const searchingWorkerConfig = require('./webpack-searching-worker.config.js');

const workersCompilerConfig = [
	{ name: 'Append worker', compiler: webpack(appendWorkerConfig) },
	{ name: 'Label worker', compiler: webpack(labelWorkerConfig) },
	{ name: 'Searching worker', compiler: webpack(searchingWorkerConfig) },
];

const buildWorkers = async () => {
	console.log('Build lunatic workers...');
	await workersCompilerConfig.forEach(({ name, compiler }) => {
		compiler.run((err, stats) => {
			if (err) console.log(err);
			if (stats?.hasErrors()) console.log(stats);
		});
		console.log(`${name} built !`);
	});
};
buildWorkers();
