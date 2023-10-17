import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
		'@storybook/addon-mdx-gfm',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {
			legacyRootApi: false,
		},
	},
	env: (config) => ({
		...config,
		NODE_ENV: 'development',
	}),
	docs: {
		autodocs: false,
	},
};
export default config;
