const {path} = require('@vuepress/utils');

module.exports = {
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando Platform.sh Plugin Documentation',
  head: [
    ['link', {rel: 'icon', href: '/favicon.ico'}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Poppins:700|Source+Sans+Pro&display=swap'}],
  ],
  theme: path.resolve(__dirname, 'theme'),
  themeConfig: {
    logo: '/images/logo-pink-small.png',
    repo: 'lando/platformsh',
    sponsors: [
      {
        "name": "Platform.sh",
        "id": "platformsh",
        "type": "patriot",
        "url": "https://platform.sh",
        "logo": "https://lando.dev/images/platform_sh_logo.png"
      },
      {
        "name": "amazee.io",
        "id": "amazeeio",
        "type": "patriot",
        "url": "https://www.amazee.io/",
        "logo": "https://lando.dev/images/amazee_io_logo.png"
      },
      {
        "name": "Pantheon",
        "id": "pantheon",
        "type": "patriot",
        "url": "https://pantheon.io/",
        "logo": "https://lando.dev/images/pantheon_logo.png"
      },
      {
        "name": "Blackmesh by Contegix",
        "id": "blackmesh",
        "type": "patriot",
        "url": "https://www.blackmesh.com/",
        "logo": "https://lando.dev/images/blackmesh_logo.png"
      }
    ],
    docsDir: 'docs',
    docsBranch: 'main',
    //showSponsors: ['platformsh'],
    navbar: [
      {text: 'Getting Started', link: 'https://docs.lando.dev/basics/'},
      {text: 'Config', link: '/config/lando.md'},
      {text: 'Guides', link: '/guides/lando-101/lando-overview'},
      {text: 'Help and Support', link: '/help/logs/'},
    ],
  },
};
