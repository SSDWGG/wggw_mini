<template>
  <fullPreview :back="false"/>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,navigateTo } from '@tarojs/taro';
import fullPreview from '../fullPreview/index.vue'
import { useMusicStore } from '@/stores/music';



const musicStore = useMusicStore();

const router = useRouter();
const homePage = router.params.url || '/pages/cxk/menu/index';

musicStore.playCxkMusic(musicStore.$state)


useLoad(() => {
  setTimeout(()=>{
    navigateTo({ url: homePage });
  },3000) 
});
</script>
