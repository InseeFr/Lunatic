module.exports = {
	collectCoverageFrom: [
		'src/**/*.{js,jsx}',
		'!src/**/index.js',
		'!src/**/*.stories.js',
	],
	testEnvironmentOptions: { url: 'http://localhost' },
	moduleNameMapper: {
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
	},
	transform: {
		'\\.[jt]sx?$': 'babel-jest',
		'.+\\.(png|jpg)$': 'jest-transform-stub',
	},
	coverageProvider: 'v8',
	testResultsProcessor: 'jest-sonar-reporter',
	coveragePathIgnorePatterns: ['/node_modules/'],
	testEnvironment: 'jsdom',
};
