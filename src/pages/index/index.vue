<template>
  <view :class="styles.firstPage">
    <view class="title">Welcome to WGGW</view>
    <view class="logo">
        <image class="bgImg" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg" />
      </view>
      <view class="hypnotic-5"></view>
  </view>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';
import { useAccountStore } from '@/stores/account';
import { uuid } from '@/utils/index';
import styles from './styles.scss'
import Taro from '@tarojs/taro';


const account = useAccountStore();

// 初始化同步历史数据store
account.getStorage(account.$state)

// 创建初始uuid
if(account.uuid==="0"){
  account.uuid = uuid()
  account.setStorage(account.$state)
}

const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';

  // ios和安卓共同支持的音频格式 mp3 mp4a acc
const backgroundAudioManager = Taro.getBackgroundAudioManager()
backgroundAudioManager.title = '谢谢...'
backgroundAudioManager.epname = '谢谢...'
backgroundAudioManager.singer = 'KOKIA'
backgroundAudioManager.coverImgUrl =  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BCADOECL-1678081703044WechatIMG21.jpeg'
backgroundAudioManager.src = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IEPOALOG-1679458147373thanks.mp3'
backgroundAudioManager.onEnded(()=>{
  backgroundAudioManager.play()
})
useLoad(() => {
  setTimeout(()=>{
    switchTab({ url: homePage });
  },3000) 
});
</script>
