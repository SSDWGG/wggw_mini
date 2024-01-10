<template>
  <fullPreview :back="false"/>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,navigateTo } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import fullPreview from '../fullPreview/index.vue'
import { reactive } from 'vue';




const router = useRouter();
const homePage = router.params.url || '/pages/cxk/menu/index';


const data = reactive({
  musicList:[
  {
      name:'爱鸡',
      src:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/KPPHBLKN-1704879026226ij.mp3'
    },
    {
      name:'奇鸡再现',
      src:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/CECPPDKF-1704878863927qjzx.mp3'
    }
  ],
  songIndex:0
})

  // ios和安卓共同支持的音频格式 mp3 mp4a acc   src源无法解析中文
const backgroundAudioManager = Taro.getBackgroundAudioManager()
const playMusic = ()=>{
  backgroundAudioManager.title = data.musicList[data.songIndex].name
  backgroundAudioManager.epname = data.musicList[data.songIndex].name
  backgroundAudioManager.singer = 'kunkun'
  backgroundAudioManager.coverImgUrl =  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg'
  backgroundAudioManager.src = data.musicList[data.songIndex].src
}
playMusic()
backgroundAudioManager.onEnded(()=>{
  // 循环播放列表
  data.songIndex = (data.songIndex+1)%data.musicList.length
  playMusic()
})


useLoad(() => {
  setTimeout(()=>{
    navigateTo({ url: homePage });
  },3000) 
});
</script>
