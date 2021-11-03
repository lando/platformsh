const {path} = require('@vuepress/utils');

module.exports = (options, app) => {
  // console.log(options);
  return {
    name: '@lando/vuepress-docs-theme',
    extends: '@vuepress/theme-default',
    layouts: path.resolve(__dirname, 'layouts'),
    // alias: {
    //   // replace the Navbar component
    //   '@theme/Navbar.vue': path.resolve(__dirname, 'components/CustomNavbar.vue'),
    // },
    // extendsMarkdown: md => {
    //   console.log('hi');
    //   console.log(md.renderer);
    // },
    plugins: [
      [
        '@vuepress/plugin-palette',
        {preset: 'sass'},
      ],
    ],
  };
};
