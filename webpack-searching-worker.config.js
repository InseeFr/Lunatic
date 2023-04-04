var path = require('path');
var PACKAGE = require('./package.json');
var version = PACKAGE.workersVersion;

module.exports = {
	mode: 'production',
	entry: './src/utils/suggester-workers/searching/searching.worker.js',
	target: 'webworker',
	output: {
		path: path.resolve(`./workers-release/${version}`),
		filename: `lunatic-searching-worker-${version}.js`,
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'ts-loader',
						options: { configFile: 'tsconfig-workers.json' },
					},
				],
			},
		],
	},
};
