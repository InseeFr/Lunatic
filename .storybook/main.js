const path = require('node:path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
	env: (config) => ({
		...config,
		NODE_ENV: 'development',
	}),
	webpackFinal: async (config) => {
		// Add support for SCSS
		config.module.rules.push({
			test: /\.scss$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
			include: path.resolve(__dirname, '../'),
		});

		config.resolve = {
			modules: [
				...(config.resolve.modules || []),
				path.resolve(__dirname, '../src'),
			],
			extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json', '.cjs'],
			fallback: {
				...(config.resolve || {}).fallback,
				fs: false,
				stream: false,
				os: false,
			},
		};

		// Return the altered config
		return config;
	},
};
