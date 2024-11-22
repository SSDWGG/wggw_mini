<template>
  <view class="icon fcc" @tap="handleToCar">
    <image class="buttonImg" src="@/assets/images/project/car.png" />
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';

const handleToCar = () => {
  Taro.navigateTo({ url: '/pages/tool/order-menu/car/index' });
};
</script>
