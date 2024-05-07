<template>
  <!--  svga-url="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga" -->
  <fullPreview
    :back="false"
    :imgSrc="imageSrcBg"
    title="Welcome to kzw"
  />
</template>

<script lang="ts" setup>
import { useLoad, useRouter, navigateTo } from '@tarojs/taro';
import fullPreview from '@/components/fullPreview/index.vue';
import { useMusicStore } from '@/stores/music';

const musicStore = useMusicStore();

const router = useRouter();
const homePage = router.params.url || '/pages/cxk/menu/index';

const imageSrcBg = require('@/assets/images/cxk/kun.png');

musicStore.playCxkMusic();

useLoad(() => {
  setTimeout(() => {
    navigateTo({ url: homePage });
  }, 3000);
});
</script>
