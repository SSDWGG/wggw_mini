<template>
  <view :class="styles.testContainer" >
    <myNavBar title="测试页面" />
    <view class="empty" >
      感谢您的关注，该页面为测试专用页面
    </view>
  </view>
</template>

<script lang="ts" setup>
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';

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

</script>
