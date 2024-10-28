<template>
  <view class="bar-item" @tap="(e) => handleShowPop(e)">
    <image class="icon" src="@/assets/images/project/wouldlike.png" />
    送礼物
  </view>

  <svga-play-component
    ref="svgaPlayRef"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    :svgaUrl="pageData.url"
    @finsh="onFinsh"
  />
</template>
<script lang="ts" setup>
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import { ref,reactive } from 'vue';
import { cdnHost } from '@/utils/env';

const svgaPlayRef = ref();

const svgaUrlList = [
'2022110422344569.svga',
'2022110422395120.svga',
'2022110422405254.svga',
'2022110422420815.svga',
'2022110422433573.svga',
'2022110422450167.svga',
'2022110622314192.svga',
'2022110622330817.svga',
'2022110622354389.svga',
'2022110622365540.svga',
'2022110622383932.svga',
'2022110622402597.svga',
'2022110622414965.svga',
'2022110622454731.svga',
'2022110622470250.svga',
'2022110622480018.svga',
'2022110622501824.svga',
'2022110622511918.svga',
'2022110622521142.svga',
'2022110622531448.svga',
'2022110622541440.svga',
'2022110622580595.svga',
'2022110623020080.svga',
'2022110623032034.svga',
'2022110623041923.svga',
'2022110623053168.svga',
'2022110623062257.svga',
'2022110623073233.svga',
'2022110623082817.svga',
'2022110623135353.svga',
'2022110623145092.svga',
'2022110623160156.svga',
'2022110623254198.svga',
'2022110623275326.svga',
'2022110623291327.svga',
'2023021413571375.svga',
'2023021415055742.svga',
'2024031318511419.svga',
];
const pageData = reactive({
  canPlay:true,
  url:''
});
const onFinsh = () => {
  pageData.canPlay = true;
};
const handleShowPop = (e) => {
  e.stopPropagation();
  if (pageData.canPlay) {
    // 显示svga
    pageData.url = `${cdnHost}/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`;
    svgaPlayRef.value.showSvga();
    pageData.canPlay = false;
  }
};
</script>
