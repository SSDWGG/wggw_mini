<template>
  <view :class="styles.personCard">
    <view class="b">
      <view class="a">WGGのweb</view>
      <view class="h2">WX:Ren</view>
      <view class="span">I am a web developer<view />In the days to
        come<view />Keep going!!</view>
    </view>
    <view class="c">
      <!-- --i是用来计算平面圆柱的动效延迟和距离的
            --w则是用来计算平面圆柱的宽度 -->
      <view class="d" style="--i: 1; --w: 1.5"></view>
      <view class="d" style="--i: 2; --w: 1.6"></view>
      <view class="d" style="--i: 3; --w: 1.4"></view>
      <view class="d" style="--i: 4; --w: 1.7"></view>
      <view class="e" style="--i: 1"></view>
    </view>
    <!-- 设置二维码 -->
    <view class="f"></view>
  </view>
</template>


<script lang="ts" setup>
import styles from './styles.scss';
</script>