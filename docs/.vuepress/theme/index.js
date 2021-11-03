const {path} = require('@vuepress/utils');

module.exports = (options, app) => {
  // console.log(options);

  // Define default options
  const defaultOptions = {
    // Shows the CarbonAds in the top sidebar
    showCarbonAds: true,
    // Shows the special sponsors on the right
    // Can be true|false|or a list of sponsors to show
    // showSponsors: ['platformsh'],
    // Metadata for our sponsors
    // sponsors:
  };

  // Merge together
  options = {...defaultOptions, ...options};
  console.log(options);

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
    // extendsPageData: page => {
    // },
    plugins: [
      [
        '@vuepress/plugin-palette',
        {preset: 'sass'},
      ],
    ],
  };
};
