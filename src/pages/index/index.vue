<template>
  <fullPreview :back="false" />
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import { useMusicStore } from '@/stores/music';

import fullPreview from '@/components/fullPreview/index.vue'


const account = useAccountStore();
const musicStore = useMusicStore();

const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';

musicStore.playDefaultBGM()
if(!account.isLogin()){
  account.login()
}


useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },3000) 
});
</script>
