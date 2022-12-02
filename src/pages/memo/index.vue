<template>
  <navbar title="Memo" />
  <view :class="styles.myContainer">
    <view>
      {{account.memoDataList}}
    </view>
    <side-bar />
  </view>

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