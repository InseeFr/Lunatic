#!/usr/bin/env node
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const { workersPath } = require('./workers-paths');

const getWebpackConfig = ({ entry, filename }) => {
	return {
		mode: 'production',
		entry: entry,
		target: 'webworker',
		output: {
			path: path.resolve(`workers-release`),
			filename: filename,
			libraryTarget: 'umd',
		},
		resolve: {
			extensions: ['.js', '.ts', '.tsx'],
		},
		module: {
			rules: [
				{
					test: /\.([cm]?ts|tsx|js)$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
								['@babel/preset-react', { runtime: 'automatic' }],
							],
						},
					},
				},
			],
		},
	};
};

const buildWorker = async (webpackConfig) => {
	const compiler = webpack(webpackConfig);
	compiler.run((err, stats) => {
		if (err) console.log(err);
		if (stats?.hasErrors()) console.log(stats);
	});
};

const buildWorkers = () => {
	Object.keys(workersPath).forEach((worker) => {
		const { name, source, webpack } = workersPath[worker];
		const isWorkerExists = fs.existsSync(source);

		if (!isWorkerExists) {
			console.log(`Build : ${name}`);
			buildWorker(getWebpackConfig(webpack));
		} else {
			console.log(`${name} is already built -> Skipped`);
		}
	});
};

buildWorkers();
