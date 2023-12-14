<template>
  <scroll-view :class="styles.myContainer" class="pageIn" @scroll="onScroll" scroll-y="true">
    <navbar title="黑屋"  background-color="#f5f5f9" />
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="致敬最爱的坤坤" />
    <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      世上本没有坤，坤的人多了便也有了坤。宁可食无肉，不可居无坤。无肉令人瘦，无坤令人俗。
    </nut-notice-bar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video class="video" object-fit="contain" :show-bottom-progress="false" :initial-time="0" :autoplay="true"
        :controls="false" :show-fullscreen-btn="false" :show-center-play-btn="false" :show-play-btn="false" :loop="true"
        :muted="true" :enable-progress-gesture="false" style="width: 100%"
        src="https://career.djicdn.com/broadway/public/0448b719-9f90-410c-841c-5e8cc2721cc6/campus-index-9.5.mp4" />
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <view class="menu-item" @tap="goto(item)" v-for="(item, index) in data.menuList" :key="index">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="title">
          {{ item.Ctitle }}
        </view>
        <image class="bgImg"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg"/>
      </view>
    </view>

    <side-bar :show="show" :fullBtnFlag = false />
  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import {
  NoticeBar as NutNoticeBar,
  WaterMark as NutWaterMark,
} from "@nutui/nutui-taro";
import { computed, reactive } from "vue";
import { useAccountStore } from "@/stores/account";
import Taro, { useShareAppMessage, useShareTimeline } from "@tarojs/taro";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import sideBar from "./components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  menuList: [
    {
      title: "IKun",
      Ctitle: "小黑子",
      router: "/pages/kunMenu/cxk/index",
    },
    {
      title: "IKun",
      Ctitle: "坤歌台",
      router: "/pages/kunMenu/cxk3/index",
    },
    {
      title: " Shake Kun",
      Ctitle: "摇动kun",
      router: "/pages/kunMenu/cxk2/index",
    },
  ],
});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造坤去改变坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象坤到现象坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻坤坤</strong></h2>`;
const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);
const goto = (item) => {
  Taro.navigateTo({ url: item.router });
};

useShareTimeline(() => {
  return {
    title: "快来坤屋吧~",
    path: `/pages/kunMenu/index`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
useShareAppMessage(() => {
  return {
    title: "快来坤屋吧~",
    path: `/pages/kunMenu/index`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
</script>
