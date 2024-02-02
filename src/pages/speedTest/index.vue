<template>
  <scroll-view :class="styles.myContainer" class="pageIn"  scroll-y="true">
    <navbar title="测试反应速度" background-color="rgba(116, 104, 242,.1)"/>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="speedTest" />
    <view class="tipTitle">
      首先很高兴您能参与游戏，点击开始按钮测试你的最快反应速度吧
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
     
    </view>

  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { computed, reactive } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import { useAccountStore } from '@/stores/account';
import Taro from "@tarojs/taro";



const accountStore = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
});



const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);


</script>
