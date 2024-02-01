<template>
  <view class="icon fcc" style="margin-top: 8rpx" @tap="() => Taro.makePhoneCall({ phoneNumber: '13616549486' })">
    <image class="phoneIcon"
      src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DCCBINBE-1671510201605phone.png" />
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </view>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import myToastComponents from '@/components/myToast/index.vue';
import { ref } from 'vue';

// import { getUserApiTest } from '@/apis/mine';

const myToast = ref<any>();

</script>
