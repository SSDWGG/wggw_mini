<template>
  <navbar title="Editor" background-color="transparent" />
  <view :class="styles.editor">
    <view class="menu" :style="{ height }">
      <myHtml />
      <myChart />
      <myChart2 />
      <myLucky />
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from "./styles.scss";
import { computed } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import myChart from "./echart/index.vue"
import myChart2 from "./echart/index2.vue"
import myHtml from "./mp-html/index.vue"
import myLucky from "./lucky/index.vue" 
// definePageConfig({
//   usingComponents: {
//     "ec-canvas": "../../../components/ec-canvas/ec-canvas",
//   },
// });

const systemInfo = useSystemInfoStore();

const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);


</script>