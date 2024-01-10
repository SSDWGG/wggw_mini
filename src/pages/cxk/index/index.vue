<template>
  <fullPreview :back="false"/>
</template>

<script lang="ts" setup>
import {  useLoad, useRouter,switchTab } from '@tarojs/taro';
import Taro from '@tarojs/taro';
import fullPreview from '../fullPreview/index.vue'
import { reactive } from 'vue';




const router = useRouter();
const homePage = router.params.url || '/pages/menu/index';


const data = reactive({
  musicList:[
  {
      name:'爱鸡',
      src:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/AEGCNOKF-1702614271625爱鸡.mp3'
    },
    {
      name:'奇鸡再现',
      src:'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/KOIIDIOG-1702614317245奇鸡再现.mp3'
    }
  ],
  songIndex:0
})

  // ios和安卓共同支持的音频格式 mp3 mp4a acc
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
    switchTab({ url: homePage });
  },3000) 
});
</script>
