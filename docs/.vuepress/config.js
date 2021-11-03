const {path} = require('@vuepress/utils');
const yaml = require('js-yaml');
const fs = require('fs');

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
    sponsors: yaml.load(fs.readFileSync(path.resolve(__dirname, 'public') + '/api/sponsors.yml', 'utf8')),
    docsDir: 'docs',
    docsBranch: 'main',
    showSponsors: ['platformsh'],
    navbar: [
      {text: 'Getting Started', link: 'https://docs.lando.dev/basics/'},
      {text: 'Config', link: '/config/lando.md'},
      {text: 'Guides', link: '/guides/lando-101/lando-overview'},
      {text: 'Help and Support', link: '/help/logs/'},
    ],
  },
};
