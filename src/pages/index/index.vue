<template>
  <fullPreview :back="false" />
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';

import fullPreview from '@/components/fullPreview/index.vue';


const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';



useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },3000);
});
</script>
