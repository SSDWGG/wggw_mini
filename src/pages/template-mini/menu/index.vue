<template>
  <scroll-view  :class="styles.myContainer" class="pageIn" scroll-y="true" >
    <navbar title="technical" background-color="#f5f5f9" >
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="小程序模板" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      欢迎来到小程序模板专区，以下是我们目前开发的小程序模板，可以帮助您快速的建立一个小程序
    </nut-noticebar>

    <commonMenu :height="height" :listData="account.templateMiniMenuList"></commonMenu>

  </scroll-view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, ref } from 'vue';
import Taro, {useShareAppMessage, useShareTimeline} from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';
import { cdnHost, socketAllUserUrl, ossFilePrePathSvga ,ossFilePrePath} from '@/utils/env';


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
  path: '/pages/template-mini/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
useShareAppMessage(() => ({
  title: '人参果小程序模板空间',
  path: '/pages/template-mini/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
</script>
