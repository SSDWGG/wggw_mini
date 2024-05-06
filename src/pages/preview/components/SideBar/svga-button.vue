<template>
  <view class="bar-item" @tap="(e) => handleShowPop(e)">
    <image class="icon" src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/icon-preview-operation-wouldlike.png" />
    送礼物
  </view>

  <svga-play-component
    ref="svgaPlayRef"
    @finsh="onFinsh"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    svgaUrl="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/finish.svga"
  />
</template>
<script lang="ts" setup>
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import { ref } from 'vue';

const svgaPlayRef = ref();

const canPlay = ref(true);

const onFinsh = () => {
  canPlay.value = true;
};

const handleShowPop = (e) => {
  e.stopPropagation();
  if (!!canPlay.value) {
    // 显示svga
    svgaPlayRef.value.showSvga();
    canPlay.value = false;
  }
};
</script>
