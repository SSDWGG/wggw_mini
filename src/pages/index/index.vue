<template>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';


const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';

useLoad(() => {
  switchTab({ url: homePage });
});
</script>
