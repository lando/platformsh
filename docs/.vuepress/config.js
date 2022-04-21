module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando is the best local development environment option for Platform.sh, the fastest way to build modern web apps.',
  base: '/platformsh/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/platformsh/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/platformsh/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: '@lando/vuepress-theme-default-plus',
  themeConfig: {
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/platformsh',
    sidebarHeader: {
      enabled: true,
      title: 'Platform.sh Plugin',
      icon: '/images/pshicon.png',
    },
    sidebar: [
      {
        text: 'Overview',
        link: '/index.html',
      },
      '/getting-started.html',
      '/config.html',
      '/tooling.html',
      '/sync.html',
      '/caveats.html',
      {
        text: 'Guides',
        collapsible: true,
        children: [
          {
            text: 'Adding more tooling commands',
            link: '/adding-more-tooling.html',
          },
          {
            text: 'Externally accessing services',
            link: '/external-access.html',
          },
          {
            text: 'Manually importing databases',
            link: '/manually-importing-databases.html',
          },
        ],
      },
      '/support.html',
      {text: 'Examples', link: 'https://github.com/lando/platformsh/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/platformsh/releases'},
      '/development.html',
    ],
  },
};
