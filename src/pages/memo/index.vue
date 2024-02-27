<template>
  <navbar title="我的记录" background-color="transparent" />
  <view :class="styles.memo">
    <view class="content"  :style="{ height }">
     <memo />
     <!-- <mine /> -->
    </view>
  </view>
  <side-bar />

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import memo from './memo/index.vue'
import { Navbar } from '@fishui/taro-vue';
import { computed } from 'vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { useShareAppMessage } from '@tarojs/taro';

definePageConfig({
  enableShareAppMessage: true,
});

const systemInfo = useSystemInfoStore();

// 100% - tabsHeader.height - tabBar.height - safeArea.bottom.height
const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx - env(safe-area-inset-bottom))`
);

useShareAppMessage(() => {
  return {
    title: '快来看看wgg哒小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  };
});

</script>