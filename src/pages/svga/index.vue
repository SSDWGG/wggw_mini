<template>
  <view >
    <navbar title="svga" />

<canvas id="demoCanvas" type="2d" :style="{width: '100%', height:height}"></canvas>

  </view>
     
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
const { Parser, Player } = require("./svgaplayer.weapp");
import { Navbar } from "@fishui/taro-vue";
import { computed } from 'vue';


const height = computed(() => `calc( 100vh - 64px  - env(safe-area-inset-bottom))`);

const showSvga = async()=>{
  try {
      const parser = new Parser;
      const player = new Player;
      await player.setCanvas('#demoCanvas')
      const videoItem = await parser.load("https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggwSystem/LIADDEFF-1708481655743halloween.svga");
      await player.setVideoItem(videoItem);
      player.startAnimation();
    } catch (error) {
      console.log(error);
    }
}

Taro.nextTick(()=>{
  showSvga()
});


</script>
