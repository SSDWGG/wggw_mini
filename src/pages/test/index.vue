<template>
  <navbar title="Menu" hide-back   background-color="transparent" />
  <view :class="styles.editor" >
    <nut-water-mark  :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1"
      :content="account.waterMark" />
      <!-- notice -->
      <nut-notice-bar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35"
        v-if="account.showfirstTimePageNoticeBar">
        {{account.NoticeBarText}}
      </nut-notice-bar>
    <view class="menu"  :style="{ height }">
     123
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

const height = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);




</script>