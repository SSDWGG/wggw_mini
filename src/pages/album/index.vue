<template>
  <view :class="styles.myContainer">

     <nut-notice-bar
      :closeMode="true"
      right-icon="circle-close"
      :background="`#F1EFFD`"
      :color="`#8074FE`"
      >
      本站承诺这是一个信息安全的纯前端的小程序,本程序不对信息做任何存储，您的数据信息除了微信和您的账号外将无法访问，
      你可以在这个封闭的私密空间内写下和记录你所想记录的内容，
      如果您将本小程序删除，将会清除程序内的所有的记录数据，
      请妥善保存您的数据
      </nut-notice-bar>
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
definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});
import {
  NoticeBar as NutNoticeBar,
  CircleProgress as NutCircleProgress,
} from '@nutui/nutui-taro';
import dayjs from 'dayjs';
import { computed, reactive } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useDidShow } from '@tarojs/taro';




const account = useAccountStore();

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


useDidShow(()=>{
  account.test   = account.test+"哈hei"
  console.log(1111,account.test);


})



</script>