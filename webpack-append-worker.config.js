var path = require('path');
var PACKAGE = require('./package.json');
var version = PACKAGE.workersVersion;

module.exports = {
	mode: 'production',
	entry: './src/utils/suggester-workers/append-to-index/append.worker.js',
	target: 'webworker',
	output: {
		path: path.resolve(`./workers-release/${version}`),
		filename: `lunatic-append-worker-${version}.js`,
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader',
			},
		],
	},
};
