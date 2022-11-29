<template>
  <view :class="styles.myContainer">
    <view class="progress">
      <!-- year progress -->
      <nut-circle-progress :progress='(progressYear>100||progressYear<0)?"100":progressYear' radius="80" strokeWidth="3" :color="data.gradientColor" stroke-linecap="square butt">
        <view class="progressDiv">
          <view class="title">
            {{data.nowTime.year()}}-progress
          </view>
          <view class="progressNum">
            {{ `${(progressYear>100||progressYear<0)?"Enjoy Life":progressYear+'%'}` }}
          </view>
          <view class="progressNum">
           {{ passTimeInYear }}Day
          </view>
        </view>
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"></image>
      </nut-circle-progress>
      
      <!-- day progress -->
      <nut-circle-progress :progress='(progressDay>100||progressDay<0)?"100":progressDay' radius="80" strokeWidth="3" :color="data.gradientColor">
        <view class="progressDiv">
          <view class="title">
            {{data.nowTime.format('M.D')}}-progress
          </view>
          <view class="progressNum">
           {{dayjs().format('MM-DD hh:mm')}}
          </view>
          <view class="progressNum">
            {{ `${(progressDay>100||progressDay<0)?"Enjoy Life":progressDay+'%'}` }}
          </view>
        </view>
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg"></image>
      </nut-circle-progress>

       <!-- work progress -->
       <nut-circle-progress :progress='(progressWork>100||progressWork<0)?"100":progressWork' radius="80" strokeWidth="3" :color="data.gradientColor">
        <view class="progressDiv">
          <view class="title">
            WorkTimeProgress
          </view>
          <view class="progressNum">
           9:00-18:00
          </view>
          <view class="progressNum">
            {{ `${(progressWork>100||progressWork<0)?"Enjoy Life":progressWork+'%'}` }}
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
  endWork: dayjs(`${dayjs().format('YYYY-MM-DD')} 17:59:59.999`),
  nowTime: dayjs(),
})

setInterval(() => {
  // '2022-11-29 17:59:59.999'
  data.nowTime = dayjs();
}, 50)

const progressYear = computed(() => ((data.nowTime - data.startYear) * 100 / 31536000000).toFixed(6))
const passTimeInYear = computed(() => (data.nowTime.diff(dayjs(data.startYear), 'day',true)).toFixed(6))
const progressDay = computed(() => (100-(data.endDay.diff(dayjs(data.nowTime), 'millisecond',true)) * 100 / 86400000).toFixed(6))
const progressWork = computed(() => (100-(data.endWork.diff(dayjs(data.nowTime), 'millisecond',true)) * 100 / 32400000).toFixed(6))



</script>
