<template>
  <fullPreview :back="false" />
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import fullPreview from '@/components/fullPreview/index.vue';

const account = useAccountStore();

const router = useRouter();
const homePage = router.params.url || '/pages/login/index';

if(!account.isLogin()){
  account.login();
}

useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },1500);
});
</script>
