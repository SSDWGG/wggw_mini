<template>
  <myNavBar title="我的记录" background-color="transparent" >
    <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
  </myNavBar>
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
import Taro from '@tarojs/taro';

definePageConfig({
  enableShareAppMessage: true,
});

const systemInfo = useSystemInfoStore();

// 100% - tabsHeader.height - tabBar.height - safeArea.bottom.height
const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx - env(safe-area-inset-bottom))`
);

  const goHomePage = () => {
    Taro.redirectTo({ url: '/pages/tool/menu/index' });
};

</script>
