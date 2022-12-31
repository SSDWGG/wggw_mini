<template>
  <view :class="styles.myContainer">    
    <view class="wobbling-1"></view>
    <view class="wobbling-2"></view>
    <view class="wobbling-3"></view>
    <view class="wobbling-4"></view>
    <view class="wobbling-5"></view>
    <view class="wobbling-6"></view>
    <view class="wobbling-7"></view>
    <view class="wobbling-8"></view>
    <view class="wobbling-9"></view>
    <view class="wobbling-10"></view>

  </view>
</template>
<script lang="ts" setup>
  import styles from "./styles.scss";
  definePageConfig({ backgroundColor: "#f3f3fe" });
</script>
