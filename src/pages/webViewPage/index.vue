<template>
<web-view :src="router.params.webViewUrl??'http://ikunqqq.ssdwgg.cn'" />
</template>
<script lang="ts" setup>
import { useRouter } from '@tarojs/taro';

const router = useRouter();

</script>
