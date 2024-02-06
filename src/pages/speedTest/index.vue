<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true">
    <navbar title="测试反应速度" background-color="rgba(116, 104, 242,.1)" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="speedTest" />
    <view class="tipTitle"> 点击开始按钮测试你的最快反应速度吧 </view>
    <view class="tipGameR"> （点击开始游戏，待按钮颜色变色后快速按下按钮） </view>

    <!-- 游戏区 -->
    <view class="ganmeCenter flex center column">
      <view class="tip"> 最近一次记时结果 ：{{ data.historyData[data.historyData.length - 1] || '0.00' }} s </view>

      <!-- 游戏按钮 -->
      <nut-animate type="breath" class="rule-button-div" loop @tap="tapBtn">
        <view class="gameBtn flex center" :style="{ backgroundColor: data.gameIngFlag === GameState.start ? 'beige' : 'green' }">
          {{ data.btnText || data.useTime / 100 }}
        </view>
      </nut-animate>
    </view>
  </scroll-view>
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { reactive, watch, onUnmounted } from 'vue';
import { Navbar } from '@fishui/taro-vue';

const GameState = {
  noStart: 0,
  wait: 1,
  start: 2,
  end: 3,
};

const data = reactive({
  // 游戏状态   未开始|等待|计时中|结束    结束状态是未重置状态
  gameIngFlag: GameState.noStart,
  useTime: 0,
  btnText: '' as any,
  intervalFlag: null as any,
  timeoutFlag: null as any,
  historyData: [] as Array<number>,
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
      data.btnText = '再来一次!';
      // data.btnText = '最近一次响应时长：' + data.useTime / 100 + 's';
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
  }else if(data.gameIngFlag === GameState.wait){
    // 记录是否在等待开始时多次点击超过最大点击额，多次点击给与提示并终止程序
    return;
  }
};
// 结束计时
const endGame = () => {
  // 结束游戏逻辑
  clearInterval(data.intervalFlag);
  data.intervalFlag = null;
  data.historyData.push(data.useTime / 100);
  data.useTime = 0;
  data.gameIngFlag = GameState.end;
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
  data.intervalFlag = setInterval(() => {
    data.useTime++;
  }, 10);
};

onUnmounted(() => {
  clearTimeout(data.timeoutFlag);
  clearInterval(data.intervalFlag);
});
</script>
