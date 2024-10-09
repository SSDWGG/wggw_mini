<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <navbar title="业主投票" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="业主投票" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、 ticket、
    </nut-noticebar>

    <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6, 1, 3]" />
  </scroll-view>

  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive, ref } from 'vue';
import { useShareAppMessage, useShareTimeline} from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();

const systemInfo = useSystemInfoStore();


const myToast = ref<any>();

const svgaUrlList = [
'2022110422344569.svga',
'2022110422395120.svga',
'2022110422405254.svga',
'2022110422420815.svga',
'2022110422433573.svga',
'2022110422450167.svga',
'2022110622314192.svga',
'2022110622330817.svga',
'2022110622354389.svga',
'2022110622365540.svga',
'2022110622383932.svga',
'2022110622402597.svga',
'2022110622414965.svga',
'2022110622454731.svga',
'2022110622470250.svga',
'2022110622480018.svga',
'2022110622501824.svga',
'2022110622511918.svga',
'2022110622521142.svga',
'2022110622531448.svga',
'2022110622541440.svga',
'2022110622580595.svga',
'2022110623020080.svga',
'2022110623032034.svga',
'2022110623041923.svga',
'2022110623053168.svga',
'2022110623062257.svga',
'2022110623073233.svga',
'2022110623082817.svga',
'2022110623135353.svga',
'2022110623145092.svga',
'2022110623160156.svga',
'2022110623254198.svga',
'2022110623275326.svga',
'2022110623291327.svga',
'2023021413571375.svga',
'2023021415055742.svga',
'2024031318511419.svga',
];
const data = reactive({
  showPage: true,
  svgaUrl:`https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`
});

const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

useShareTimeline(() => ({
    title: '创意空间wggw~',
    path: '/pages/index/index',
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  }));
useShareAppMessage(() => ({
    title: '创意空间wggw~',
    path: '/pages/index/index',
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  }));
</script>
