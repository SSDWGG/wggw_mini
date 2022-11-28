<template>
  <view>
    <!-- <view>此页面作初始化跳转页面，可以放 loading or logo</view> -->
  </view>
</template>

<script lang="ts" setup>
import { switchTab, useLoad, useRouter } from '@tarojs/taro';
import { adjustSelected } from '../../custom-tab-bar/useTabBarStore';

const router = useRouter();
const homePage = router.params.tabbar || '/pages/album/index';

// @ts-ignore
useLoad((options: any) => {
  switchTab({ url: homePage, success: () => adjustSelected(homePage) });
});
</script>
