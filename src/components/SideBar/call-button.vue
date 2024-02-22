<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="() => Taro.makePhoneCall({ phoneNumber: '13616549486' })">
    <image class="phoneIcon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/DCCBINBE-1671510201605phone.png" />
   
  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';

</script>
