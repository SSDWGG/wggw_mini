<template>
  <view :class="styles.lockPageContainer">
    <navbar title="页面锁" background-color="transparent"  />

   <lock @cb-input-back="cbTestPassword">
    <template #contentSlot>
      <view class="lockPageContent">hello，你已解锁页面</view>
    </template>
  </lock>

  </view>
</template>
<script lang="ts" setup>
import lock from '@/components/lock/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';

const cbTestPassword = (type)=>{

  console.log(6666666,type);


};

</script>
