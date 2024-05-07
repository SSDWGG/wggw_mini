<template>
  <scroll-view :class="styles.myContainer" class="pageIn" @scroll="onScroll" scroll-y="true" v-if="data.showPage">
    <page-container :show="data.pageContainerShow" :overlay="false" @leave="goback" />
    <navbar title="坤坤妙妙屋" background-color="#f5f5f9" :goback="goback" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="致敬最爱的坤坤" />
    <nut-noticebar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      巅峰见证虚伪的拥护 黄昏迎来虔诚的信徒。世上本没有坤，坤的人多了便也有了坤。宁可食无肉，不可居无坤。无肉令人瘦，无坤令人俗。
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video
        class="video"
        object-fit="contain"
        :show-bottom-progress="false"
        :initial-time="0"
        :autoplay="true"
        :controls="false"
        :show-fullscreen-btn="false"
        :show-center-play-btn="false"
        :show-play-btn="false"
        :loop="true"
        :muted="true"
        :enable-progress-gesture="false"
        style="width: 100%"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/OMFHLJDP-17059977997221.mp4"
      />
    </view>

    <commonMenu :height="height" :listData="account.cxkMenuList"></commonMenu>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[1, 2, 3]" />
  </scroll-view>
  <!--     svga-url="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga" -->
  <fullPreview
    :svgaLoop="1"
    :svga-url="data.svgaUrl"
    :back="true"
    @back="data.showPage = true"
    :imgSrc="imageSrcBg"
    @finsh="onFinsh"
    title="Enjoy"
    v-else
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive } from 'vue';
import { useShareAppMessage, useShareTimeline, switchTab } from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import fullPreview from '@/components/fullPreview/index.vue';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const imageSrcBg = require('@/assets/images/cxk/kun.png');

const { show, onScroll } = useListScroll();
const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const svgaUrlList = [
"2022110422344569.svga",
"2022110422395120.svga",
"2022110422405254.svga",
"2022110422420815.svga",
"2022110422433573.svga",
"2022110422450167.svga",
"2022110622314192.svga",
"2022110622330817.svga",
"2022110622354389.svga",
"2022110622365540.svga",
"2022110622383932.svga",
"2022110622402597.svga",
"2022110622414965.svga",
"2022110622454731.svga",
"2022110622470250.svga",
"2022110622480018.svga",
"2022110622501824.svga",
"2022110622511918.svga",
"2022110622521142.svga",
"2022110622531448.svga",
"2022110622541440.svga",
"2022110622580595.svga",
"2022110623020080.svga",
"2022110623032034.svga",
"2022110623041923.svga",
"2022110623053168.svga",
"2022110623062257.svga",
"2022110623073233.svga",
"2022110623082817.svga",
"2022110623135353.svga",
"2022110623145092.svga",
"2022110623160156.svga",
"2022110623254198.svga",
"2022110623275326.svga",
"2022110623291327.svga",
"2023021413571375.svga",
"2023021415055742.svga",
"2024031318511419.svga",
]
const data = reactive({
  showPage: true,
  pageContainerShow: true,
  svgaUrl:`https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`

});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造坤去改变坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象坤到现象坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻坤坤</strong></h2>`;
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

const goback = () => {
  switchTab({ url: '/pages/menu/index' });
};

const onFinsh = ()=>{

let tempUrl= `https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/liliSvga/${svgaUrlList[Math.floor(Math.random()* svgaUrlList.length)]}`
// 防止两次随机出同一个整数导致的watch不刷新
if(data.svgaUrl === tempUrl){
  onFinsh()
}else{
  data.svgaUrl = tempUrl
}
}


useShareTimeline(() => {
  return {
    title: '快来坤屋吧~',
    path: `/pages/cxk/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '快来坤屋吧~',
    path: `/pages/cxk/index/index`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/HHHNOCBG-1702544256738kun.jpeg',
  };
});
</script>
