<template>
  <view :class="styles.testContainer" >
    <!-- myNavBar -->
    <myNavBar title="mall" >
      <template #left>
      <view style="padding: 6px 20px" @tap="goHomePage">
        <IconFont name="home" size="20" />
      </view>
    </template>
    </myNavBar>
    <view class="empty" >
      商城页面持续开发中...
    </view>
    <!-- tabbar -->
    <myTabBar></myTabBar>
  </view>
</template>

<script lang="ts" setup>
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import myTabBar from '../custom-tab-bar/index';
import Taro from '@tarojs/taro';


const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/technical/menu/index' });
};
</script>
