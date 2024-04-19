import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
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
  plugins: [
    'docusaurus-plugin-sass',
      './src/plugins/lunaticFixesPlugin.ts',
    [require.resolve("@cmfcmf/docusaurus-search-local"), {
      indexBlog: false
    }]
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
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/InseeFr/Lunatic/tree/3.0/docs',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
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
  } satisfies Preset.ThemeConfig,
};

export default config;
