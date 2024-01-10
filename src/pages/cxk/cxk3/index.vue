<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="坤歌台" background-color="#f5f5f9" />
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="坤坤大舞台有歌你就来" />
    <side-bar :show="show" @full="data.showPage = false" />


    <view>
      我们很高兴的为您提供以下坤歌，请点击播放
    </view>
    

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
import Taro from "@tarojs/taro";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import fullPreview from "../fullPreview/index.vue";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";


const { show, onScroll } = useListScroll();


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
      title: " KunKun ",
      Ctitle: "黑屋",
      router: "/pages/kunMenu/index",
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


</script>
