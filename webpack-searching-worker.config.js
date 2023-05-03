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
