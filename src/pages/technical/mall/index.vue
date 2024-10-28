<template>
  <view :class="styles.testContainer" >
    <navbar title="mall" />
    <view class="empty" >
      持续开发中...
    </view>
  </view>
</template>

<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
</script>
