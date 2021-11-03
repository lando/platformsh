<template>
  <ParentLayout>
    <template #sidebar-top>
      <CarbonAds v-if="showCarbonAds" />
    </template>
    <template #page-top>
      <Sponsors v-if="showSponsors" :sponsors="sponsors" :showSponsors="showSponsors" />
    </template>
  </ParentLayout>
</template>

<script setup>
import { computed } from 'vue'
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import CarbonAds from '../components/CarbonAds.vue';
import Sponsors from '../components/Sponsors.vue';
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'

// Get theme data
const themeData = useThemeData();
// Get the config from themedata
const {showCarbonAds = true} = themeData.value;
const {showSponsors = true} = themeData.value;
const sponsors = [
  {
    "name": "Platform.sh",
    "type": "patriot",
    "url": "https://platform.sh",
    "logo": "https://lando.dev/images/platform_sh_logo.png"
  },
  {
    "name": "amazee.io",
    "type": "patriot",
    "url": "https://www.amazee.io/",
    "logo": "https://lando.dev/images/amazee_io_logo.png"
  },
  {
    "name": "Pantheon",
    "type": "patriot",
    "url": "https://pantheon.io/",
    "logo": "https://lando.dev/images/pantheon_logo.png"
  },
  {
    "name": "Blackmesh by Contegix",
    "type": "patriot",
    "url": "https://www.blackmesh.com/",
    "logo": "https://lando.dev/images/blackmesh_logo.png"
  },
];

</script>

<style lang="scss">
@import '../styles/index.scss';
@import '../styles/palette.scss';
@import '@vuepress/plugin-palette/palette';
</style>
