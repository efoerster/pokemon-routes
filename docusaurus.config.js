module.exports = {
  title: 'Pokemon Routes',
  tagline: 'Interactive speedrunning guides of the Pokemon series',
  url: 'http://efoerster.github.io/pokemon-routes',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'efoerster',
  projectName: 'pokemon-routes',
  themeConfig: {
    navbar: {
      title: 'Pokemon Routes',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/efoerster/pokemon-routes',
          label: 'GitHub',
          position: 'right',
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
