<template>
  <view :class="styles.testContainer" >
    <navbar title="mall" >
      <template #left>
      <view style="padding: 6px 20px" @tap="goHomePage">
        <IconFont name="home" size="20" />
      </view>
    </template>
    </navbar>
    <view class="empty" >
      商城页面持续开发中...
    </view>
    <myTabBar></myTabBar>
  </view>
</template>

<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import myTabBar from '../custom-tab-bar/index';
import Taro from '@tarojs/taro';


const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/technical/menu/index' });
};
</script>
