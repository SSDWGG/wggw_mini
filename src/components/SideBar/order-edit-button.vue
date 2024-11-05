<template>
   <view class="icon fcc" style="margin-top: 8rpx" @tap="toOrderEdit">
    <view class="full" >
      编辑菜单
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro';

const toOrderEdit = () => {
  Taro.navigateTo({
    url: '/pages/tool/order-menu/edit/index'
  });
};

</script>
