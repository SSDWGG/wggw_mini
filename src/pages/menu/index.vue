<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true">
    <navbar title="Menu" hide-back background-color="#f5f5f9" />
    <view class="menu" :style="{ height }">
      <view
        class="menu-item"
        @tap="goto(item)"
        v-for="(item, index) in data.menuList"
        :key="index"
      >
        <image class="bgImg" :src="item.imgSrc" />
      </view>
    </view>
  </scroll-view>
</template>
<script lang="ts" setup>
  import styles from "./styles.scss";
  import { computed, reactive } from "vue";
  import { Navbar } from "@fishui/taro-vue";
  import { useSystemInfoStore } from "@/stores/systemInfo";

  const systemInfo = useSystemInfoStore();
  const data = reactive({
    menuList: [
      {
        imgSrc: "https://gaywss.wuchuangroup.com/1.jpg",
      },
      {
        imgSrc: "https://gaywss.wuchuangroup.com/2.jpg",
      },
      {
        imgSrc: "https://gaywss.wuchuangroup.com/3.jpg",
      },
      {
        imgSrc: "https://gaywss.wuchuangroup.com/4.jpg",
      },
    ],
  });

  const height = computed(
    () =>
      `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
  );
  const goto = (item) => {
    console.log(item);
    // Taro.navigateTo({ url: item.router });
  };
</script>
