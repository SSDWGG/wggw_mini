<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage"  scroll-y="true">
    <navbar title="开发者专区" background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="开发者专区" />
    <view class="menu" :style="{ height }">
      <nut-animate type="breath" class="rule-button-div" loop v-for="(item, index) in data.menuList" :key="index">
        <view class="menu-item" @tap="goto(item)">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="title">
            {{ item.Ctitle }}
          </view>
          <image class="bgImg"
          mode="aspectFill"
          :style="{ opacity: item.opacity??0.2 }"
            :src="item.bgSrc??imgDefaultSrc" />
        </view>
      </nut-animate>
    </view>
  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
// import {
//   WaterMark as NutWaterMark,
//   Animate as NutAnimate,
// } from "@nutui/nutui-taro";
import { computed, reactive } from "vue";
import Taro, { useShareAppMessage, useShareTimeline, useDidShow } from "@tarojs/taro";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";


const imgDefaultSrc = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg'


const systemInfo = useSystemInfoStore();


const data = reactive({
  showPage: true,
  menuList: [
    {
      title: "CSS Loaders",
      Ctitle: "新奇的动效css",
      router: "/pages/developer/cssloaders/index",
    },
    {
      title: "Clock",
      Ctitle: "进度计时",
      router: "/pages/developer/time/index",
    },
    {
      title: "More Plugin",
      Ctitle: "多种组件",
      router: "/pages/developer/editor/index",
    },
    {
      title: "Water Fall",
      Ctitle: "瀑布流照片墙",
      router: "/pages/developer/waterfall/index",
    },
  ],
});

const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);
const goto = (item) => {
  Taro.navigateTo({ url: item.router });
};

</script>
