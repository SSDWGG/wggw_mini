<template>
  <scroll-view :class="styles.myContainer" class="pageIn" @scroll="onScroll" scroll-y="true" v-if="data.showPage">
    <page-container :show="data.pageContainerShow" :overlay="false" @leave="goback" />
    <navbar title="坤坤妙妙屋" background-color="#f5f5f9" :goback="goback" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="致敬最爱的坤坤" />
    <nut-noticebar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      巅峰见证虚伪的拥护 黄昏迎来虔诚的信徒。世上本没有坤，坤的人多了便也有了坤。宁可食无肉，不可居无坤。无肉令人瘦，无坤令人俗。
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
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OMFHLJDP-17059977997221.mp4"
      />
    </view>

    <commonMenu :height="height" :listData="account.cxkMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[1, 2, 3]" />
  </scroll-view>
  <fullPreview
    :svgaLoop="0"
    svga-url="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga"
    :back="true"
    @back="data.showPage = true"
    :imgSrc="imageSrcBg"
    title="Enjoy"
    v-else
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive } from 'vue';
import { useShareAppMessage, useShareTimeline, switchTab } from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import fullPreview from '@/pages/fullPreview/index.vue';
import commonMenu from '@/components/commonMenu';
import { useAccountStore } from '@/stores/account';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const imageSrcBg = require('@/assets/images/cxk/kun.png');

const { show, onScroll } = useListScroll();
const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
  pageContainerShow: true,
});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造坤去改变坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象坤到现象坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻坤坤</strong></h2>`;
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

const goback = () => {
  switchTab({ url: '/pages/menu/index' });
};

useShareTimeline(() => {
  return {
    title: '快来坤屋吧~',
    path: `/pages/cxk/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '快来坤屋吧~',
    path: `/pages/cxk/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
  };
});
</script>
