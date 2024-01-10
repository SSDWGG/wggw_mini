<template>
  <scroll-view
    :class="styles.myContainer"
    class="pageIn"
    v-if="data.showPage"
    @scroll="onScroll" scroll-y="true"
  >
      <navbar title="Menu" hide-back background-color="#f5f5f9" />
      <nut-water-mark
        :gap-x="20"
        font-color="rgba(0, 0, 0, .1)"
        :z-index="1"
        :content="account.waterMark"
      />
      <nut-notice-bar
        right-icon="circle-close"
        :background="`#F1EFFD`"
        color="#8074FE"
        :speed="35"
        v-if="account.showfirstTimePageNoticeBar"
      >
        {{ account.NoticeBarText }}
      </nut-notice-bar>

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
          src="https://career.djicdn.com/broadway/public/0448b719-9f90-410c-841c-5e8cc2721cc6/campus-index-9.5.mp4"
        />
      </view>

      <view class="menu" :style="{ height }">
        <view
          class="menu-item"
          @tap="goto(item)"
          v-for="(item, index) in data.menuList"
          :key="index"
        >
          <view class="title">
            {{ item.title }}
          </view>
          <view class="title">
            {{ item.Ctitle }}
          </view>
          <image
            class="bgImg"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"
          />
        </view>
      </view>
      <side-bar :show="show" @full="data.showPage = false" />
  </scroll-view>
  <fullPreview :back="true" @back="data.showPage = true" v-else />
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
  import fullPreview from "../fullPreview/index.vue";
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
    showPage: true,
    menuList: [
      {
        title: "WGG",
        Ctitle: "wgg",
        router: "/pages/wgg/index",
      },
      {
        title: "Media Memo",
        Ctitle: "多媒体记录",
        router: "/pages/memoAndMine/index",
      },
      {
        title: "CSS Loaders",
        Ctitle: "新奇的动效css",
        router: "/pages/cssloaders/index1/index",
      },
      {
        title: "Clock",
        Ctitle: "进度计时",
        router: "/pages/time/index",
      },
      {
        title: "Water Fall",
        Ctitle: "瀑布流照片墙",
        router: "/pages/waterfall/index",
      },
      {
        title: "More Plugin",
        Ctitle: "多种组件",
        router: "/pages/editor/index",
      },
      {
        title: "Score Board",
        Ctitle: "计分板",
        router: "/pages/scoreboard/index",
      },
      {
        title: "ikun",
        Ctitle: "黑屋",
        router: "/pages/cxk/index",
      },
    ],
  });

  const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造去改变</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象到现象</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻出发</strong></h2>`;
  const height = computed(
    () =>
      `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
  );
  const goto = (item) => {
    Taro.navigateTo({ url: item.router });
  };

  useShareTimeline(() => {
    return {
      title: "快来看看wgg哒小程序吧~",
      path: `/pages/index/index`,
      imageUrl:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GKNPEBAA-1678694972749test.jpeg",
    };
  });
  useShareAppMessage(() => {
  return {
    title: '快来看看wgg哒小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GKNPEBAA-1678694972749test.jpeg',
  };
});
</script>
