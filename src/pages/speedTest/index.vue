<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <navbar title="速度反应" background-color="rgba(116, 104, 242,.1)">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="speedTest" />
    <view class="tipTitle"> 点击开始按钮测试你的最快反应速度吧 </view>
    <view class="tipGameR"> （点击开始游戏，待按钮颜色变色后快速按下按钮） </view>

    <!-- 游戏区 -->
    <view class="ganmeCenter flex center column">
      <view class="tip">
        <image class="avater" :src="account.userInfo.avatarurl" /> 您的最好成绩 ：{{ data.niceResult }} 秒 (排名第{{ data.countData.userConut }})
      </view>

      <view v-if="data.CurrentUsersSpeedTimeData.length > 3" class="mySwiper">
        <nut-swiper :height="26" :class="styles.swiper" loop auto-play="1500" direction="vertical" :touchable="false">
          <nut-swiper-item v-for="(item, index) in data.CurrentUsersSpeedTimeData" :key="index" class="swiper-item">
            <image class="avater" :src="item.avatarurl" />
            {{ changeLongStr(item.username, 4, true, false) }} 在 {{ dayjs((item as any).updateTime).fromNow() }} 创造了{{ item.useTime }}秒的好记录！
          </nut-swiper-item>
        </nut-swiper>
      </view>

      <!-- 游戏按钮 -->
      <nut-animate type="breath" class="rule-button-div" loop @tap="tapBtn">
        <view
          class="gameBtn flex center"
          :style="{
            backgroundColor: data.gameIngFlag === GameState.start ? 'rgba(255, 90, 25 , .6)' : 'rgba(130, 243, 132,.5) ',
            fontSize: data.gameIngFlag === GameState.end ? '20px' : '40px',
          }"
        >
          {{ data.btnText || data.useTime / 100 }}
        </view>
      </nut-animate>
    </view>
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
    <side-bar :show="show" :showFlags="[1, 3]" />

    <view class="tooLowDiv">
      <svga-play-component ref="svgaPlayRef3" :canvasStyle="{}" :svgaUrl="cdnHost +ossFilePrePathSvga+ '/normalSVGA2/bianbian.svga'" />
    </view>
  </scroll-view>
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
    :svgaUrl="cdnHost +ossFilePrePathSvga+ '/normalSVGA/finish.svga'"
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
    :svgaUrl="cdnHost + ossFilePrePathSvga+'/normalSVGA/rose.svga'"
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { ref, reactive, watch, onUnmounted } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import myToastComponents from '@/components/myToast/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useShareAppMessage, useShareTimeline, switchTab, useRouter } from '@tarojs/taro';
import { getCurrentUsersSpeedTime, getUserFastTime, updateSpeedTime, getUserCount } from '@/apis/speedTime';
import type { ISpeedTimeItem } from '@/apis/speedTime/model';
import { useAccountStore } from '@/stores/account';
import { useDidShow } from '@tarojs/taro';
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import { changeLongStr } from '@/utils/index';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';
import { cdnHost,ossFilePrePathSvga } from '@/utils/env';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();
const account = useAccountStore();

const myToast = ref<any>();
const svgaPlayRef = ref();
const svgaPlayRef2 = ref();
const svgaPlayRef3 = ref();

const router = useRouter();

const GameState = {
  noStart: 0,
  wait: 1,
  start: 2,
  end: 3,
};

const maxGameTime = 5000;

const data = reactive({
  // 游戏状态   未开始|等待|计时中|结束    结束状态是未重置状态
  gameIngFlag: GameState.noStart,
  useTime: 0,
  maxGameTime,
  btnText: '' as any,
  intervalFlag: null as any,
  timeoutFlag: null as any,
  maxTimeoutFlag: null as any,
  niceResult: maxGameTime / 1000,
  userFastTimeObj: {} as ISpeedTimeItem,
  CurrentUsersSpeedTimeData: [] as ISpeedTimeItem[],
  countData: {} as {
    userConut: number;
    allConut: number;
  },
});

const getInitData = async () => {
  const resUserFastTimeData = await getUserFastTime();
  data.niceResult = Number(resUserFastTimeData.useTime);
  data.userFastTimeObj = resUserFastTimeData;
  data.CurrentUsersSpeedTimeData = await getCurrentUsersSpeedTime();
  data.countData = await getUserCount();
};

useDidShow(() => {
  getInitData();
});

watch(
  () => data.gameIngFlag,
  (val) => {
    if (val === GameState.noStart) {
      data.btnText = '开始';
    } else if (val === GameState.wait) {
      data.btnText = '等待...';
    } else if (val === GameState.start) {
      data.btnText = '';
    } else if (val === GameState.end) {
      data.btnText = `本次用时:${data.useTime / 100}s`;
    }
  },
  { immediate: true },
);

const tapBtn = () => {
  if (data.gameIngFlag === GameState.start) {
    endGame();
  } else if (data.gameIngFlag === GameState.noStart) {
    waitStartGame();
  } else if (data.gameIngFlag === GameState.end) {
    waitStartGame();
  } else if (data.gameIngFlag === GameState.wait) {
    myToast.value.myToastShow({
      icon: 'error',
      title: '开始前点击是无效的哦~',
      duration: 2000,
    });
    clearTimeout(data.timeoutFlag);
    waitStartGame();
  }
};
// 结束计时
const endGame = async () => {
  // 结束游戏逻辑
  clearInterval(data.intervalFlag);
  clearTimeout(data.maxTimeoutFlag);
  data.intervalFlag = null;
  data.gameIngFlag = GameState.end;
  if (data.niceResult > data.useTime / 100) {
    data.niceResult = data.useTime / 100;
    // 上报最好成绩
    await updateSpeedTime({
      openid: account.userInfo.openid,
      avatarurl: account.userInfo.avatarurl,
      username: account.userInfo.username,
      useTime: data.niceResult,
    });
    // 刷新页面排名
    getInitData();
    // 显示svga
    svgaPlayRef.value.showSvga();
    svgaPlayRef2.value.showSvga();
    // 弹窗提示
    myToast.value.myToastShow({
      icon: 'success',
      title: '创造了最好记录,太棒啦👍🏻~',
      duration: 2000,
    });
  }
};

// 等待开始计时
const waitStartGame = () => {
  // [0,1)
  const waitTime = (Math.random() * 3 + 2) * 1000;
  data.gameIngFlag = GameState.wait;
  data.timeoutFlag = setTimeout(() => {
    clearTimeout(data.timeoutFlag);
    data.timeoutFlag = null;
    startGame();
  }, waitTime);
};

// 开始计时逻辑
const startGame = () => {
  // 设置定时器（超过最大秒数后终止计时）并提示异常
  data.gameIngFlag = GameState.start;
  data.useTime = 0;
  data.intervalFlag = setInterval(() => {
    data.useTime++;
  }, 10);
  data.maxTimeoutFlag = setTimeout(() => {
    // 显示svga
    svgaPlayRef3.value.showSvga();
    myToast.value.myToastShow({
      icon: 'error',
      title: 'OMG,太慢啦~',
      duration: 3000,
    });
    endGame();
  }, data.maxGameTime);
};

onUnmounted(() => {
  clearTimeout(data.timeoutFlag);
  clearInterval(data.intervalFlag);
});

useShareTimeline(() => ({
  title: '来WGGW比比谁的手速更快',
  path: '/pages/speedTest/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));
useShareAppMessage(() => ({
  title: '来WGGW比比谁的手速更快',
  path: '/pages/speedTest/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));

const goHomePage = () => {
  switchTab({ url: '/pages/index/index' });
};
</script>
