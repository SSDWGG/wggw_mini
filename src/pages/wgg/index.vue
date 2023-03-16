<template>
  <!-- 直接复制url，通过浏览器打开，给予提示 -->
  <view :class="styles.wgg">
    <view class="bg">
      <navbar  background-color="transparent" />
      <view class="content">
        <view class="tips"> ❤️ Welcome to star SSDWGG on github ❤️</view>
        <view class="project">
          <view class="a" @tap="copyStr('https://github.com/SSDWGG', {
            icon: 'none',
            title: 'wgg-github 网址链接复制成功',
            duration: 2000
          })">
            wgg-github</view>
          <view class="a" @tap="copyStr('https://github.com/SSDWGG/MP_V2', {
            icon: 'none',
            title: 'MP_V2 后台管理系统 网址链接复制成功',
            duration: 2000
          })">
            ！MP_V2 后台管理系统 ！</view>
          <view class="a" @tap="copyStr('https://github.com/SSDWGG/rabbitMall', {
            icon: 'none',
            title: '🐰商城 网址链接复制成功',
            duration: 2000
          })">🐰 电商商城 (pc)</view>
          <view class="a" @tap="copyStr('https://github.com/SSDWGG/blog', {
            icon: 'none',
            title: 'WGG—Blog 网址链接复制成功',
            duration: 2000
          })">WGG—Blog
          </view>
          <view class="a" @tap="copyStr('https://github.com/SSDWGG/wggw_mini', {
            icon: 'none',
            title: 'WGGW-mini小程序 网址链接复制成功',
            duration: 2000
          })">WGGW-mini小程序
          </view>
        </view>
        <view class="tips">❤️ thanks for your attention ❤️</view>
        <person-card/>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { copyStr } from '@/utils/index';
import styles from './styles.scss';
import PersonCard from './components/PersonCard/index.vue';
import { Navbar } from '@fishui/taro-vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});



</script>