/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');

module.exports = {
  title: 'Pokemon Routes',
  tagline: 'Interactive speedrunning guides of the Pokemon series',
  url: 'https://efoerster.github.io',
  baseUrl: '/pokemon-routes/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'efoerster',
  projectName: 'pokemon-routes',
  plugins: [path.resolve(__dirname, './plugins/ts-loader')],
  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Pokemon Routes',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          href: 'https://www.speedrun.com/pokemon',
          label: 'SRC Leaderboards',
        },
        {
          href: 'https://discord.gg/0UUw8zDe2hWlwRsm',
          position: 'right',
          className: 'header-discord-link',
          'aria-label': 'Discord server',
        },
        {
          href: 'https://github.com/efoerster/pokemon-routes',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'src',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          showLastUpdateTime: true,
          editUrl: 'https://github.com/efoerster/pokemon-routes/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
