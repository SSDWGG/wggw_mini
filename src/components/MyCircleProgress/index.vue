<template>
  <view :class="styles.MyCircleProgress" class="rywCircleProgress">
    <nut-circle-progress :progress="
      data.progress > props.max || data.progress < props.min
        ? props.max
        : data.progress
    " :strokeWidth="props.strokeWidth" :color="props.gradientColor">
      <view class="progressDiv">
        <view class="title">
          {{ props.contentTitleText }}
        </view>
        <slot name="ContentSlot1" :slotdata = 'data.nowTime' />

        <view class="progressNum" v-if="props.format">
          {{ data.nowTime.format(props.format) }}
        </view>
        <slot name="ContentSlot2" :slotdata = 'data.nowTime' />

        <view class="progressNum">
          {{
              `${data.progress > props.max || data.progress < props.min ? props.contentOverText : data.progress + "%"}`
          }}
        </view>
        <slot name="ContentSlot3" :slotdata = 'data.nowTime' />

      </view>

        <image class="bgImg" :src="props.contentBgImg"> </image>
    </nut-circle-progress>
  </view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { CircleProgress as NutCircleProgress } from "@nutui/nutui-taro";
import dayjs from "dayjs";
import {  onUnmounted, reactive, watch } from "vue";

const props = defineProps({
  // 最大进度
  max: {
    type: Number,
    default: 100,
  },
  // 最小进度
  min: {
    type: Number,
    default: 0,
  },
  // 结束时间
  end: {
    type: dayjs,
    default: dayjs(`${dayjs().format("YYYY-MM-DD")} 23:59:59.999`),
  },
  // 进度条渐变颜色
  gradientColor: {
    default: {
      "0%": "#FF5E5E",
      "100%": "#FFA062",
    },
  },
  // 进度条粗细
  strokeWidth: {
    type: Number,
    default: 3,
  },
  // 详细时间展示形式
  format: {
    type: String,
    default: "",
  },
  // 内容区域-进度完成后的文案
  contentOverText: {
    type: String,
    default: "Enjoy Life",
  },

  // 内容区域-title文案
  contentTitleText: {
    default: "DailyProgress",
  },
  // 内容区域-bgImg
  contentBgImg: {
    type: String,
    default:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg",
  },
  // 计算单位毫秒  年31536000000  日86400000
  computedNum: {
    type: Number,
    default: 86400000
  },
  // 确认结束回调
  onAfterProgress: {
    type: Function,
  },
});

const data = reactive({
  nowTime: dayjs(),
  progress: 0,
  overProgressDayFlag: false,
  aeta:null as any
});
// 刷新启动器
// setInterval 会造成内存不停的增加
// setInterval(() => {
//   data.nowTime = dayjs();
// }, 1)

// const init  = ()=>{
//   const interval =  setInterval(() => {
//   // '2022-11-29 17:59:59.999'
//   data.nowTime = dayjs();
//   clearInterval(interval)
//   init()
// }, 1)
// }
// init()

// 刷新启动器
// function timefun(f, time) {
//   clearTimeout(data.aeta);
//   data.aeta = setTimeout(function () {
//     f();
//     timefun(f, time);
//   }, time);
// }
// timefun(() => {
//   data.nowTime = dayjs();
// }, 1);

// 刷新启动器
(function timefun() {
  clearTimeout(data.aeta);
  data.aeta = setTimeout(function () {
    data.nowTime = dayjs();
    timefun();
  }, 50);
})() 

watch(
  () => data.nowTime,
  (newVal) => {
    // 事件完成回调

    if (!data.overProgressDayFlag && (data.progress >= props.max)) {
      data.overProgressDayFlag = true;
      !!props.onAfterProgress && props.onAfterProgress();
    } else {
      // 重置完成标识
      data.overProgressDayFlag = false;
    }
    data.progress = Number(
      Math.abs(
        100 - (props.end.diff(dayjs(newVal), "millisecond", true) * 100) / props.computedNum
      ).toFixed(6)
    );
  },
  { immediate: true }
);

onUnmounted(()=>{
  console.log("组件卸载",data.aeta);
  clearTimeout(data.aeta)
  
})
</script>
