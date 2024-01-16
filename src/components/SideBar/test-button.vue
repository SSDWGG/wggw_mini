<template>
  <view class="icon fcc" style="margin-top: 8rpx">
    <check-login-button class="contact kf"  @tap="test">
      测试
    </check-login-button>
    <!-- <check-login-button class="contact kf" >
      测试
    </check-login-button> -->
  </view>
</template>
<script lang="ts" setup>
import checkLoginButton from '@/components/button/checkLoginButton.vue';
import { getUserApiTest } from '@/apis/mine';

const test  =()=>{
  getUserApiTest(1)
}
</script>
