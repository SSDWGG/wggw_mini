<template>
  <myNavBar title="我的照片" background-color="transparent" />
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
import myNavBar from '@/components/my-nav-bar/index.vue';
import { computed } from 'vue';
import { useSystemInfoStore } from '@/stores/systemInfo';

definePageConfig({
  enableShareAppMessage: true,
});

const systemInfo = useSystemInfoStore();

// 100% - tabsHeader.height - tabBar.height - safeArea.bottom.height
const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx - env(safe-area-inset-bottom))`
);

</script>
