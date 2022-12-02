<template>
  <navbar title="Memo" />
  <view :class="styles.myContainer">
    <view v-if="account.memoDataList.length>0" class="memoDataList">
      {{account.memoDataList}}
    </view>
    <view v-else class="defaultBox">
      <view class="img"><image src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/default1.png"></image></view>
      <view class="img tips">No Memo</view>
    </view> 
  </view>
  <side-bar />

</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { Navbar } from 'mini-ui';
import SideBar from './components/SideBar/index.vue';
import { useAccountStore } from '@/stores/account';
// import { useDidShow } from '@tarojs/taro';


const account = useAccountStore();

// useDidShow(()=>{

//   account.getStorage(account.$state)
  
// })

</script>