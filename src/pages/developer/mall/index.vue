<template>
  <view :class="styles.testContainer" >
    <navbar title="测试页面" />
    <view class="empty" >
      感谢您的关注，该页面为测试专用页面
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
</script>