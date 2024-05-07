<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="Menu" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <nut-noticebar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their
      end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night.
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video
        class="video"
        object-fit="contain"
        :show-bottom-progress="false"
        :initial-time="0"
        :autoplay="true"
        :controls="false"
        :show-fullscreen-btn="false"
        :show-center-play-btn="false"
        :show-play-btn="false"
        :loop="true"
        :muted="true"
        :enable-progress-gesture="false"
        style="width: 100%"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OMFHLJDP-17059977997221.mp4"
      />
    </view>

    <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6, 1, 2, 3, 4]" />
  </scroll-view>
  <fullPreview
    :svgaLoop="1"
    :svga-url="data.svgaUrl"
    :back="true"
    @back="data.showPage = true"
    @finsh="onFinsh"
    title="Enjoy"
    v-else
  />
  <!-- <svga-play-component
    ref="svgaPlayRef"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    svgaUrl="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/angel.svga"
  />
  <svga-play-component
    ref="svgaPlayRef2"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    svgaUrl="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga"
  /> -->
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive, ref } from 'vue';
import { useShareAppMessage, useShareTimeline, useDidShow, useDidHide } from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import fullPreview from '@/components/fullPreview/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu/index.vue';
import { useMusicStore } from '@/stores/music';
import { useAccountStore } from '@/stores/account';
// import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import Taro from '@tarojs/taro';
import { socketAllUserUrl } from '@/utils/env';
import myToastComponents from '@/components/myToast/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();
const systemInfo = useSystemInfoStore();
const musicStore = useMusicStore();

// const svgaPlayRef = ref();
// const svgaPlayRef2 = ref();
const myToast = ref<any>();

const WELCOMECONTENT = '欢迎来到WGGW';
const svgaUrlList = [
"2022110422344569.svga",
"2022110422395120.svga",
"2022110422405254.svga",
"2022110422420815.svga",
"2022110422433573.svga",
"2022110422450167.svga",
"2022110622314192.svga",
"2022110622330817.svga",
"2022110622354389.svga",
"2022110622365540.svga",
"2022110622383932.svga",
"2022110622402597.svga",
"2022110622414965.svga",
"2022110622454731.svga",
"2022110622470250.svga",
"2022110622480018.svga",
"2022110622501824.svga",
"2022110622511918.svga",
"2022110622521142.svga",
"2022110622531448.svga",
"2022110622541440.svga",
"2022110622580595.svga",
"2022110623020080.svga",
"2022110623032034.svga",
"2022110623041923.svga",
"2022110623053168.svga",
"2022110623062257.svga",
"2022110623073233.svga",
"2022110623082817.svga",
"2022110623135353.svga",
"2022110623145092.svga",
"2022110623160156.svga",
"2022110623254198.svga",
"2022110623275326.svga",
"2022110623291327.svga",
"2023021413571375.svga",
"2023021415055742.svga",
"2024031318511419.svga",
]
const data = reactive({
  showPage: true,
  svgaUrl:`https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`
});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造去改变</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象到现象</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻出发</strong></h2>`;
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

// socket相关

const socketUrl = socketAllUserUrl + account.userInfo.openid;
const socketOpen = ref(false);
const socketMsgQueue = ref<string[]>([]);
useDidShow(() => {
  if (!musicStore.isPlay()) {
    musicStore.playDefaultBGM();
  }
});

const sendMySocketMessage = async (msg: string) => {
  if (socketOpen.value) {
    let messageData = {
      userId: account.userInfo.openid,
      content: msg,
    };
    const res = await Taro.sendSocketMessage({
      data: JSON.stringify(messageData),
    });
    console.log('socketSendMessage result', res);
  } else {
    socketMsgQueue.value.push(msg);
  }
};

Taro.onSocketOpen(async (res) => {
  console.log('WebSocket连接已打开！', res);
  // 重发失败的信息
  socketOpen.value = true;
  // 异步循环队列
  for await (let item of socketMsgQueue.value) {
    sendMySocketMessage(item);
  }
  // 等待完成后清空待发信息栈
  socketMsgQueue.value = [];

  sendMySocketMessage(WELCOMECONTENT);

});
Taro.onSocketClose(function (res) {
  console.log('WebSocket 已关闭！', res);
  socketOpen.value = false;
});
Taro.onSocketMessage(function (res) {
  if (JSON.parse(res.data).content === WELCOMECONTENT) {    
    // 显示svga动画
    // Taro.nextTick(() => {
    //   svgaPlayRef.value.showSvga();
    //   svgaPlayRef2.value.showSvga();
    // });
  }
});


// 只在创建一次socket链接
if (socketOpen.value === false) {
    Taro.connectSocket({
      url: socketUrl,
    });
  }

const onFinsh = ()=>{

  let tempUrl= `https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`
  // 防止两次随机出同一个整数导致的watch不刷新
  if(data.svgaUrl === tempUrl){
    onFinsh()
  }else{
    data.svgaUrl = tempUrl
  }
}

useDidHide(() => {
  if (socketOpen.value === true) {
    Taro.closeSocket();
  }
});

useShareTimeline(() => {
  return {
    title: '创意空间wggw~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '创意空间wggw~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  };
});
</script>
