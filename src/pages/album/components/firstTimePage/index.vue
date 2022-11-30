<template>
  <view :class="styles.myContainer" v-if="account.showTabs" :style="{ height: '200vh' }">
    <view class="pagehead">
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
      {{account.NoticeBarText}}
      </nut-notice-bar>
      <!-- day progress -->
      <nut-circle-progress :progress="progressDay" radius="100" strokeWidth="3" :color="data.gradientColor"
        @tap="switchTabs">
        <view class="progressDiv">
          <view class="title">
            {{ data.nowTime.format('M.D') }}-progress
          </view>
          <view class="progressNum">
            {{ dayjs().format('MM-DD hh:mm') }}
          </view>
          <view class="progressNum">
            {{ progressDay }}%
          </view>
        </view>
        <image class="bgImg"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg">
        </image>
      </nut-circle-progress>
      <!-- begin button  -->
      <!--         color="linear-gradient(to right, #FFA062, #FF5E5E)" -->
      <view class="pulldown">Pulldown</view>
    </view>
    <view class="menu">
      <view class="menu-item" @tap="goto(item)" v-for="(item, index) in data.menuList" :key="index">
        <view class="title">
          {{ item.title }}
        </view>
      </view>
    </view>
  </view>
  <view :class="styles.myContainer" v-else :style="{ height: '100vh' }">
    <view class="pagehead">
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
       {{account.NoticeBarText}}
      </nut-notice-bar>
      <!-- day progress -->
      <nut-circle-progress :progress="progressDay" radius="100" strokeWidth="3" :color="data.gradientColor"
        @tap="switchTabs">
        <view class="progressDiv">
          <view class="title">
            {{ data.nowTime.format('M.D') }}-progress
          </view>
          <view class="progressNum">
            {{ dayjs().format('MM-DD hh:mm') }}
          </view>
          <view class="progressNum">
            {{ progressDay }}%
          </view>
        </view>
        <image class="bgImg"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg">
        </image>
      </nut-circle-progress>
    </view>
  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import {
  NoticeBar as NutNoticeBar,
  CircleProgress as NutCircleProgress,
} from '@nutui/nutui-taro';
import dayjs from 'dayjs';
import { computed, reactive } from 'vue';
import { useAccountStore } from '@/stores/account';
import { useDidShow } from '@tarojs/taro';
import { useTabBarStore } from '../../../../custom-tab-bar/useTabBarStore';
import Taro from '@tarojs/taro';


definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const tabbarstore = useTabBarStore();

const account = useAccountStore();

const data = reactive({
  gradientColor: {
    '0%': '#FF5E5E',
    '100%': '#FFA062'
  },
  endDay: dayjs(`${dayjs().format('YYYY-MM-DD')} 23:59:59.999`),
  nowTime: dayjs(),
  menuList: [
    {
      title: "MEMO",
      router: '/pages/memo/index'
    },
    {
      title: "TIME",
      router: '/pages/time/index'
    },
  ]
})

const switchTabs = () => {
  account.showTabs = !account.showTabs
  tabbarstore.setVisible(account.showTabs);
}


setInterval(() => {
  data.nowTime = dayjs();
}, 50)

const progressDay = computed(() => (100 - (data.endDay.diff(dayjs(data.nowTime), 'millisecond', true)) * 100 / 86400000).toFixed(6))

useDidShow(() => {
  account.test = account.test + "哈hei"
  console.log(1111, account.test);
})



const goto = (item) => {
  Taro.navigateTo({ url: item.router });
}


</script>