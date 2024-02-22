<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="Menu" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <nut-noticebar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their
      end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night.
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video
        class="video"
        object-fit="contain"
        :show-bottom-progress="false"
        :initial-time="0"
        :autoplay="true"
        :controls="false"
        :show-fullscreen-btn="false"
        :show-center-play-btn="false"
        :show-play-btn="false"
        :loop="true"
        :muted="true"
        :enable-progress-gesture="false"
        style="width: 100%"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggwSystem/OMFHLJDP-17059977997221.mp4"
      />
    </view>

    <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6, 1, 2, 3, 4]" />
  </scroll-view>
  <fullPreview :back="true" @back="data.showPage = true" v-else />
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { computed, reactive } from 'vue';
import { useShareAppMessage, useShareTimeline, useDidShow } from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import fullPreview from '../fullPreview/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu';
import { useMusicStore } from '@/stores/music';
import { useAccountStore } from '@/stores/account';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const musicStore = useMusicStore();

useDidShow(() => {
  if (!musicStore.isPlay()) {
    musicStore.playDefaultBGM();
  }
});

const data = reactive({
  showPage: true,
});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造去改变</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象到现象</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻出发</strong></h2>`;
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

useShareTimeline(() => {
  return {
    title: '快来看看wggw小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GKNPEBAA-1678694972749test.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '快来看看wggw小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GKNPEBAA-1678694972749test.jpeg',
  };
});
</script>
