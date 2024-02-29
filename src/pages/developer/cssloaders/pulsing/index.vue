<template>
  <view :class="styles.myContainer">    
    <view class="pulsing-1"></view>
    <view class="pulsing-2"></view>
    <view class="pulsing-3"></view>
    <view class="pulsing-4"></view>
    <view class="pulsing-5"></view>
    <view class="pulsing-6"></view>
    <view class="pulsing-7"></view>
    <view class="pulsing-8"></view>
    <view class="pulsing-9"></view>
    <view class="pulsing-10"></view>

  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
  import styles from "./styles.scss";
  definePageConfig({ backgroundColor: "#f3f3fe" });
</script>
