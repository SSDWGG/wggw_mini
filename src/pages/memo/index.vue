<template>
  <navbar title="我的记录" background-color="transparent" />
  <view :class="styles.memo">
    <view class="content"  :style="{ height }">
     <memo />
     <!-- <mine /> -->
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import memo from './memo/index.vue';
import { Navbar } from '@fishui/taro-vue';
import { computed } from 'vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { useShareAppMessage } from '@tarojs/taro';
import { cdnHost,ossFilePrePath } from '@/utils/env';

definePageConfig({
  enableShareAppMessage: true,
});

const systemInfo = useSystemInfoStore();

// 100% - tabsHeader.height - tabBar.height - safeArea.bottom.height
const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx - env(safe-area-inset-bottom))`
);

useShareAppMessage(() => ({
    title: '快来看看人参果小程序吧~',
    path: '/pages/memo/index',
    imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
  }));

</script>
