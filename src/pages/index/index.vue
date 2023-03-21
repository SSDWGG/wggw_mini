<template>
  <view :class="styles.firstPage">
    <view class="title">Welcome to WGGW</view>
    <view class="logo">
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg" />
      </view>
      <view class="hypnotic-5"></view>
  </view>
</template>

<script lang="ts" setup>
import { switchTab, useLoad, useRouter } from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import { uuid } from '@/utils/index';
import styles from './styles.scss'

const account = useAccountStore();

// 初始化同步历史数据store
account.getStorage(account.$state)

// 创建初始uuid
if(account.uuid==="0"){
  account.uuid = uuid()
  account.setStorage(account.$state)
}

const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';

useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },3000) 
});
</script>
