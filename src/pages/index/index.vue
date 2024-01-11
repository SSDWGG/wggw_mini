<template>
  <fullPreview :back="false"/>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import { useMusicStore } from '@/stores/music';

import { uuid } from '@/utils/index';
import fullPreview from '../fullPreview/index.vue'


const account = useAccountStore();
const musicStore = useMusicStore();

// 初始化同步历史数据store
account.getStorage(account.$state)

// 创建初始uuid
if(account.uuid==="0"){
  account.uuid = uuid()
  account.setStorage(account.$state)
}

const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';

musicStore.playDefaultBGM(musicStore.$state)

useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },3000) 
});
</script>
