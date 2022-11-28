<template>
  <view  :class="styles.container">
    <navbar :height="0" /><!-- 新手引导  -->
    <guide-overlay v-show="account.showGuidePop" />
  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import { Navbar } from 'mini-ui';
import { useAccountStore } from '@/stores/account';
import styles from './styles.scss';
import guideOverlay from './components/guideOverlay/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});


const account = useAccountStore();



// 设置新手引导的显隐
account.showGuidePop =  Taro.getStorageSync('showGuidePop')!==false;

</script>