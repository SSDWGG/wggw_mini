<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <navbar title="业主投票" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="业主投票" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、
    </nut-noticebar>

    <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6, 1, 3]" />
  </scroll-view>

  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, ref } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();

const systemInfo = useSystemInfoStore();


const myToast = ref<any>();

const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);


</script>
