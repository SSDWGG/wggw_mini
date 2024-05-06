<template>
  <view :class="styles.testContainer">
    <navbar title="电子签名" />
    电子签名.....
    <!-- 小程序内电子签名、网页电子签名（token模式） -->
    <nut-signature :line-width="state.lineWidth" :stroke-style="state.strokeStyle" @confirm="confirm" @clear="clear"></nut-signature>
    <img v-if="imgData" :src="imgData" class="imgData" style="width: 100%" />
  </view>
</template>
<script lang="ts" setup>
import { getToken } from '@/apis/mine';
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { ref, reactive } from 'vue';
const imgData = ref('');
const state = reactive({
  lineWidth: 4,
  strokeStyle: 'green',
});
const confirm = (canvas: any, data: string) => {
  if (data) {
    imgData.value = data;
    console.log('imgData', canvas, data);
  }
};
const clear = () => {
  imgData.value = '';
  console.log('clear');
};

// 拿到token跳转网页签名
const initWebPageUrl = async () => {
  const token = await getToken();

  console.log(token);
};

initWebPageUrl();
</script>
