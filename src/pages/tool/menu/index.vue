<template>
  <scroll-view  :class="styles.myContainer" class="pageIn" scroll-y="true" >
    <myNavBar title="tool" background-color="#f5f5f9" >
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </myNavBar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="tool" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      欢迎来到工具专区，以下是一些有趣、实用的工具
    </nut-noticebar>

    <commonMenu :height="height" :listData="account.toolMenuList"></commonMenu>

  </scroll-view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, ref } from 'vue';
import Taro, {useShareAppMessage, useShareTimeline} from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';
import { cdnHost,ossFilePrePath} from '@/utils/env';


definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const account = useAccountStore();
const systemInfo = useSystemInfoStore();


const myToast = ref<any>();


const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);



const goHomePage = () => {
  Taro.switchTab({ url: '/pages/menu/index' });
};


useShareTimeline(() => ({
  title: '人参果小程序模板空间',
  path: '/pages/tool/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
useShareAppMessage(() => ({
  title: '人参果小程序模板空间',
  path: '/pages/tool/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
</script>
