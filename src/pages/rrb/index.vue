<template>
  <view :class="styles.lockPageContainer">
    <navbar title="RRB" background-color="transparent"  />

   <lock @cb-input-back="cbTestPassword">
    <template #contentSlot>
      <RrbPage v-if="false"></RrbPage>
    </template>
  </lock>

  </view>
</template>
<script lang="ts" setup>
import lock from '@/components/lock/index.vue';
import RrbPage from '@/pages/rrb/water-fall/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';

const cbTestPassword = (type)=>{

  console.log(6666666,type);


};

</script>
