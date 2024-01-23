<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="toMine">
    <view class="full" >
      我的
    </view>
  </view>
</template>
<script lang="ts" setup>
import Taro from "@tarojs/taro";

const toMine = ()=>{
  Taro.navigateTo({
    url:`/pages/mine/index`
  })
}
</script>
