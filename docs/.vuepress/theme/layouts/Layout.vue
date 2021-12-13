<template>
  <ParentLayout>
    <template #sidebar-top>
      <CarbonAds />
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import CarbonAds from '../components/CarbonAds.vue';
export default {
  components: {
    ParentLayout,
    CarbonAds,
  },
};
</script>

<style lang="scss">
@import '../styles/index.scss';
@import '../styles/palette.scss';
@import '@vuepress/plugin-palette/palette';
</style>
