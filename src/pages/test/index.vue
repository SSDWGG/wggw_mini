<template>
  <view :class="styles.piContainer">
    <navbar title="π" />
    <view class="">
      当前计算得到π长度{{ (data.pi.length-2)/10000 }}万位,最近100个数平均计算耗时{{ data.newTime*100/1000/data.computedCount }}秒
    </view>
    <view class="pi"> {{ data.pi }} </view>
  </view>
</template>
<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive, watch } from 'vue';
import Taro from '@tarojs/taro';

// const initArr = [1, 2, 3, 4, 5, 2, 3, 2];

// const getNumCountObj = (arr:Array<any>) => {
//   const obj = {} as any;
//   arr.forEach((num) => {
//     if (!!obj[num]) {
//       obj[num]++;
//     } else {
//       obj[num] = 1;
//     }

//   });
//   return obj;
// };

// console.log(getNumCountObj(initArr));

// 每次计算下一个数值

const data = reactive({
  pi: '',
  tem: '',
  startTime: '' as any,
  endTime: '' as any,
  newTime:0,
  computedCount:100
});

// 每次往下计算一位pi
function* generateDigitsOfPi() {
  let q = 1n;
  let r = 180n;
  let t = 60n;
  let i = 2n;
  while (true) {
    let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n);
    yield Number(digit);
    let u = i * 3n;
    u = (u + 1n) * 3n * (u + 2n);
    r = u * 10n * (q * (i * 5n - 2n) + r - t * digit);
    q *= 10n * i * (i++ * 2n - 1n);
    t *= u;
  }
}
let iter = generateDigitsOfPi();
// 初始化3.
Taro.nextTick(() => {
  data.pi = iter.next().value + '.';
});

const fun = () => {
  // 记录开始时间
  data.startTime = new Date();
  // 在这里编写你的业务逻辑
  for (let i = 0; i < data.computedCount; i++) data.tem += iter.next().value;
  // 记录结束时间
  data.endTime = new Date();
  // 计算执行时间（以毫秒为单位）
  data.newTime = data.endTime - data.startTime;
  // 输出执行时间
  console.log(`总长度:${data.pi.length - 2},本次计算执行时间：${data.newTime} 毫秒`);
  data.pi += data.tem;
  data.tem = '';
};

watch(
  () => data.pi,
  () => {
    setTimeout(() => {
      fun();
    }, 1);
  },
);
</script>
