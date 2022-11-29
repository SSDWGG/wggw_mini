<template>
  <view :class="styles.myContainer">
    <view class="progress">
      <!-- year progress -->
      <nut-circle-progress :progress="progressYear" radius="80" strokeWidth="3" :color="data.gradientColor">
        <view class="progressDiv">
          <view class="title">
            {{data.nowTime.year()}}-progress
          </view>
          <view class="progressNum">
            {{ progressYear }}%
          </view>
          <view class="progressNum">
           {{ passTimeInYear }}Day
          </view>
        </view>
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"></image>
      </nut-circle-progress>
      
      <!-- day progress -->
   <nut-circle-progress :progress="progressDay" radius="80" strokeWidth="3" :color="data.gradientColor">
        <view class="progressDiv">
          <view class="title">
            {{data.nowTime.format('M.D')}}-progress
          </view>
          <view class="progressNum">
           {{dayjs().format('MM-DD hh:mm')}}
          </view>
          <view class="progressNum">
            {{ progressDay }}%
          </view>
        </view>
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"></image>
      </nut-circle-progress>
    </view>

  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import {
  CircleProgress as NutCircleProgress,
} from '@nutui/nutui-taro';
import dayjs from 'dayjs';
import { computed, reactive } from 'vue';

const data = reactive({
  gradientColor: {
    '0%': '#FF5E5E',
    '100%': '#FFA062'
  },
  startYear: dayjs(`${dayjs().year()-1}-12-31 23:59:59.999`),
  endDay: dayjs(`${dayjs().format('YYYY-MM-DD')} 23:59:59.999`),
  nowTime: dayjs(),
})


setInterval(() => {
  data.nowTime = dayjs();
}, 25)

const progressYear = computed(() => ((data.nowTime - data.startYear) * 100 / 31536000000).toFixed(6))
const passTimeInYear = computed(() => (data.nowTime.diff(dayjs(data.startYear), 'day',true)).toFixed(6))



const progressDay = computed(() => (100-(data.endDay.diff(dayjs(data.nowTime), 'millisecond',true)) * 100 / 86400000).toFixed(6))


</script>
