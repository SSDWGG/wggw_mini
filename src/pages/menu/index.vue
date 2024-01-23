<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true">
    <navbar title="Menu" hide-back background-color="#f5f5f9" />
    <view class="menu" :style="{ height }">
      <view class="menu-item" @tap="goto(item)" v-for="(item, index) in data.menuList" :key="index">
        <image class="bgImg"
          src="https://gaywss.wuchuangroup.com/2.jpg" />
      </view>
    </view>
  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { computed, reactive } from "vue";
import Taro from "@tarojs/taro";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";


const systemInfo = useSystemInfoStore();
const data = reactive({
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
