<template>
  <view :class="styles.myContainer" >
    <navbar title="Menu" hide-back   background-color="transparent" />
    <nut-water-mark  :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1"
      :content="account.waterMark" />
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
        {{account.NoticeBarText}}
      </nut-notice-bar>
    <view class="menu"  :style="{ height }">
      <view class="menu-item" @tap="goto(item)" v-for="(item, index) in data.menuList" :key="index">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="title">
          {{ item.Ctitle }}
        </view>
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg" />
      </view>
    </view>
  </view>

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import {
  NoticeBar as NutNoticeBar,
  WaterMark as NutWaterMark 
} from '@nutui/nutui-taro';
import {  computed, reactive } from 'vue';
import { useAccountStore } from '@/stores/account';
import Taro from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  menuList: [
    {
      title: "Media Memo",
      Ctitle: "多媒体记录",
      router: '/pages/memoAndMine/index'
    },
    {
      title: "CSS Loaders",
      Ctitle: "新奇的动效css",
      router: '/pages/cssloaders/index1/index'
    },
    {
      title: "Clock",
      Ctitle: "跑路倒计时",
      router: '/pages/time/index'
    },
    {
      title: "WaterFall",
      Ctitle: "瀑布流照片墙",
      router: '/pages/waterfall/index'
    },
    {
      title: "Editor",
      Ctitle: "富文本",
      router: '/pages/editor/index'
    },
  ]
})

const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);
const goto = (item) => {
  Taro.navigateTo({ url: item.router });
}





</script>