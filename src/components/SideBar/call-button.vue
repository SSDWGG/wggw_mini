<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="() => Taro.makePhoneCall({ phoneNumber: '13616549486' })">
    <image class="phoneIcon"
      src="@/assets/images/project/callPhone.png" />

  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';

</script>
