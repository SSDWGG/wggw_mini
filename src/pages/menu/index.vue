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
    :svgaLoop="0"
    svga-url="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga"
    :back="true"
    @back="data.showPage = true"
    title="Enjoy"
    v-else
  />
  <svga-play-component
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
  />
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
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
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

const svgaPlayRef = ref();
const svgaPlayRef2 = ref();
const myToast = ref<any>();

const WELCOMECONTENT = '欢迎来到WGGW';

const data = reactive({
  showPage: true,
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
    Taro.nextTick(() => {
      svgaPlayRef.value.showSvga();
      svgaPlayRef2.value.showSvga();
    });
  }
});


// 只在创建一次socket链接
if (socketOpen.value === false) {
    Taro.connectSocket({
      url: socketUrl,
    });
  }

useDidHide(() => {
  if (socketOpen.value === true) {
    Taro.closeSocket();
  }
});

useShareTimeline(() => {
  return {
    title: '快来看看wggw小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '快来看看wggw小程序吧~',
    path: `/pages/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/GKNPEBAA-1678694972749test.jpeg',
  };
});
</script>
