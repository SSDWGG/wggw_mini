<template>
  <view class="title"> Rich-Text</view>
      <view class="richText">
          <rich-text :nodes="data.html" />
      <video class="video" object-fit="contain" :show-bottom-progress="false" :initial-time="0" :autoplay="true"
        :controls="false" :show-fullscreen-btn="false" :show-center-play-btn="false" :show-play-btn="false" :loop="true"
        :muted="true" :enable-progress-gesture="false" style="width: 100%;"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/OMFHLJDP-17059977997221.mp4" />
      </view>
</template>
<script lang="ts" setup>
import { useDidShow } from "@tarojs/taro";
import {  reactive } from "vue";



const data  = reactive({
  html:''
})

data.html =
  `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造去改变</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象到现象</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻出发</strong></h2>`
  ;

useDidShow(()=>{
  data.html =  `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造去改变</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象到现象</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻出发</strong></h2>`
})
</script>
