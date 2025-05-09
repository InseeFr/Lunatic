import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	markdown: {
		mermaid: true,
	},
	themes: [
		'@docusaurus/theme-mermaid',
		[
			require.resolve("@easyops-cn/docusaurus-search-local"),
			/** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
			({
				language: ['fr'],
				docsRouteBasePath: '/',
				hashed: true,
				indexBlog: false,
			}),
		]
	],
	title: '@inseefr/lunatic',
	favicon: 'img/favicon.ico',
	// Set the production url of your site here
	url: 'https://inseefr.github.io/',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: 'Lunatic/docs',
	plugins: [
		'./src/plugins/lunaticFixesPlugin.ts',
		[
			'docusaurus-plugin-typedoc',
			{
				entryPoints: ['../src/index.ts'],
				tsconfig: '../tsconfig.json',
				out: './docs/api',
				readme: 'none',
				enumMembersFormat: 'table',
				indexFormat: 'table',
				parametersFormat: 'table',
				propertiesFormat: 'table',
				propertyMembersFormat: 'table',
			},
		],
	],

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: 'InseeFr', // Usually your GitHub org/user name.
	projectName: 'lunatic', // Usually your repo name.
	trailingSlash: false,
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: { defaultLocale: 'fr', locales: ['fr'] },

	presets: [
		[
			'@docusaurus/preset-classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
					editUrl: 'https://github.com/InseeFr/Lunatic/tree/3.0/docs',
					routeBasePath: '/',
					remarkPlugins: [
						[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
					],
				},
				blog: false,
				pages: {
					remarkPlugins: [
						[require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
					],
				},
				theme: {
					customCss: [require.resolve('./src/css/custom.css')],
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		image: 'img/clipboard.png',
		navbar: {
			title: '@inseefr/lunatic',
			logo: {
				alt: 'Lunatic',
				src: '/img/clipboard.png',
			},
			items: [
				{ type: 'docSidebar', sidebarId: 'docs', label: 'Documentation' },
				{ to: 'changelog', label: 'Changelog' },
				{ to: 'api', label: 'API' },
				{
					href: 'https://inseefr.github.io/Lunatic/storybook-3.0',
					label: 'Storybook',
					position: 'right',
				},
				{
					href: 'https://github.com/InseeFr/Lunatic',
					label: 'GitHub',
					position: 'right',
				},
				{ type: 'search', position: 'right' },
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{ label: 'Documentation', to: '/' },
						{ label: 'API', to: '/api' },
					],
				},
				{
					title: 'Community',
					items: [
						{
							label: 'Github',
							href: 'https://github.com/InseeFr/Lunatic',
						},
						{
							label: 'Issues',
							href: 'https://github.com/InseeFr/Lunatic/issues',
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} InseeFr. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
			defaultLanguage: 'javascript',
			additionalLanguages: ['json', 'bash'],
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
