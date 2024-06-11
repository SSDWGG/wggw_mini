<template>
  <scroll-view :class="styles.myContainer" class="pageIn"  scroll-y="true">
    <navbar title="游戏区" background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="游戏区" />
    <commonMenu :height="height" :listData="account.gameMenuList"></commonMenu>
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import commonMenu from '@/components/commonMenu/index.vue';
import { computed } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { useAccountStore } from '@/stores/account';

const systemInfo = useSystemInfoStore();
const account = useAccountStore();


const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

</script>
