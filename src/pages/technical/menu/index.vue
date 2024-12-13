<template>
  <scroll-view v-if="data.showPage" :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <myNavBar title="technical" background-color="#f5f5f9" >
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </myNavBar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="technical" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      欢迎来到技术验证专区，需要提醒您该区域极不稳定，非开发人员建议立即退出，否则做好死机的心理建设，接下来请随意吧~
    </nut-noticebar>

    <commonMenu :height="height" :listData="account.technicalMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6]" />
  </scroll-view>
  <fullPreview v-else :svgaLoop="1" :svga-url="data.svgaUrl" :back="true" title="Enjoy" @back="data.showPage = true" @finsh="onFinsh" />
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
    :svgaUrl="cdnHost + ossFilePrePathSvga + '/normalSVGA/angel.svga'"
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
    :svgaUrl="cdnHost + ossFilePrePathSvga + '/normalSVGA/rose.svga'"
  />
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive, ref } from 'vue';
import Taro, { useDidShow, useDidHide ,useShareAppMessage, useShareTimeline} from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import fullPreview from '@/components/fullPreview/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import myToastComponents from '@/components/myToast/index.vue';
import { cdnHost, socketAllUserUrl, ossFilePrePathSvga ,ossFilePrePath} from '@/utils/env';


definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});
const { show, onScroll } = useListScroll();

const account = useAccountStore();
const systemInfo = useSystemInfoStore();

const svgaPlayRef = ref();
const svgaPlayRef2 = ref();
const myToast = ref<any>();

const WELCOMECONTENT = '欢迎来到WGGW';
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
  svgaUrl: `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`,
});

const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

// socket相关

const socketUrl = socketAllUserUrl + account.userInfo.openid;
const socketOpen = ref(false);
const socketMsgQueue = ref<string[]>([]);
useDidShow(() => {
  // 只在创建一次socket链接
  if (socketOpen.value === false) {
    Taro.connectSocket({
      url: socketUrl,
    });
  }
});

const sendMySocketMessage = async (msg: string) => {
  if (socketOpen.value) {
    const messageData = {
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
  for await (const item of socketMsgQueue.value) {
    sendMySocketMessage(item);
  }
  // 等待完成后清空待发信息栈
  socketMsgQueue.value = [];

  sendMySocketMessage(WELCOMECONTENT);
});
Taro.onSocketClose((res) => {
  console.log('WebSocket 已关闭！', res);
  socketOpen.value = false;
});
Taro.onSocketMessage((res) => {
  if (JSON.parse(res.data).content === WELCOMECONTENT) {
    // 显示svga动画
    Taro.nextTick(() => {
      console.log(svgaPlayRef);

      svgaPlayRef.value.showSvga();
      svgaPlayRef2.value.showSvga();
    });
  }
});

const onFinsh = () => {
  const tempUrl = `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`;
  // 防止两次随机出同一个整数导致的watch不刷新
  if (data.svgaUrl === tempUrl) {
    onFinsh();
  } else {
    data.svgaUrl = tempUrl;
  }
};

const goHomePage = () => {
  Taro.switchTab({ url: '/pages/menu/index' });
};

useDidHide(() => {
  if (socketOpen.value === true) {
    Taro.closeSocket();
  }
});

useShareTimeline(() => ({
  title: '创意空间wggw~',
  path: '/pages/index/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
useShareAppMessage(() => ({
  title: '创意空间wggw~',
  path: '/pages/index/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
</script>
