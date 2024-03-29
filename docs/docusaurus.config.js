// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],
    title: '@inseefr/lunatic',
    tagline: '',
    favicon: 'img/favicon.ico',
    // Set the production url of your site here
    url: 'https://inseefr.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: 'Lunatic/docs',

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
    i18n: {
        defaultLocale: 'fr',
        locales: ['fr'],
    },

    plugins: ['./src/plugins/lunatic-css-loader.js', [
        require.resolve("@cmfcmf/docusaurus-search-local"), {
            indexBlog: false
        }
    ]],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: 'https://github.com/InseeFr/Lunatic/tree/2.7/docs',
                    routeBasePath: '/',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],
    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'img/clipboard.png',
            navbar: {
                title: '@inseefr/lunatic',
                logo: {
                    alt: 'Lunatic',
                    src: '/img/clipboard.png',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'docs',
                        label: 'Documentation',
                    },
                    {
                        to: 'changelog',
                        label: 'Changelog'
                    },
                    {
                        href: 'https://inseefr.github.io/Lunatic/storybook-2.7',
                        label: 'Storybook',
                        position: 'right',
                    },
                    {
                        href: 'https://github.com/InseeFr/Lunatic',
                        label: 'GitHub',
                        position: 'right',
                    },
                    {
                        type: 'search',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Documentation',
                                to: '/',
                            },
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
                additionalLanguages: ['json', 'bash'],
            },
        }),
};

export default config;
