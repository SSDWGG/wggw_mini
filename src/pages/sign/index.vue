<template>
  <view :class="styles.signContainer">
    <navbar title="电子签名" />
    <!-- 小程序内电子签名、网页电子签名（token模式） -->
    <nut-signature :line-width="state.lineWidth" :stroke-style="state.strokeStyle"
    custom-class="mySignatureClass"
    @confirm="confirm" @clear="clear" />
   
   <view class="imgList">
    <view class="imageItem" v-for="item in state.imgDataList" :key="item">
      <image :src="item" mode="widthFix"  class="imgData"  />
    </view>
  

    <view class="imageItem">
      <image :src="state.temImgData" mode="widthFix"  class="imgData"  />
    </view>
   </view>
   
  </view>
</template>
<script lang="ts" setup>
import { getToken } from '@/apis/mine';
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import { reactive } from 'vue';
const state = reactive({
  lineWidth: 1,
  strokeStyle: 'green',
  imgDataList:[] as  string[],
  temImgData:''
});
const confirm = (canvas: any, data: string) => {
  if (data) {
    state.temImgData = data
    state.imgDataList.push(data)
    console.log(9999,canvas);
    
  }
};
const clear = () => {
  state.temImgData = ''
};

// 拿到token跳转网页签名
const initWebPageUrl = async () => {
  const token = await getToken();

  console.log(token);
};

initWebPageUrl();
</script>
