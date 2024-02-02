<template>
  <scroll-view :class="styles.myContainer" class="pageIn" @scroll="onScroll" scroll-y="true" v-if="data.showPage">
    <page-container :show="data.pageContainerShow" :overlay = 'false' @leave='goback' />
    <navbar title="坤坤妙妙屋" background-color="#f5f5f9" :goback="goback" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="致敬最爱的坤坤" />
    <nut-noticebar right-icon="circle-close" :background="`#F1EFFD`" color="#8074FE" :speed="35">
      巅峰见证虚伪的拥护
      黄昏迎来虔诚的信徒。世上本没有坤，坤的人多了便也有了坤。宁可食无肉，不可居无坤。无肉令人瘦，无坤令人俗。
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <video class="video" object-fit="contain" :show-bottom-progress="false" :initial-time="0" :autoplay="true"
        :controls="false" :show-fullscreen-btn="false" :show-center-play-btn="false" :show-play-btn="false" :loop="true"
        :muted="true" :enable-progress-gesture="false" style="width: 100%"
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/OMFHLJDP-17059977997221.mp4" />
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <nut-animate type="breath" class="rule-button-div" loop v-for="(item, index) in data.menuList" :key="index">
        <view class="menu-item" @tap="goto(item)">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="title">
            {{ item.Ctitle }}
          </view>
          <image class="bgImg" mode="aspectFill" :src="item.bgSrc" :style="{ opacity: item.opacity }" />
        </view>
      </nut-animate>
    </view>

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[1, 2, 3]" />

    <openOutLinkTipPop :pop-tip-visible="data.popTipVisible" :qrSrc="data.chooseItem.qrSrc" 
    :show-name="data.chooseItem.Ctitle" :href="data.chooseItem.linkUrl" @close="()=>{data.popTipVisible = false}"/>


  </scroll-view>
  <fullPreview :back="true" @back="data.showPage = true" v-else />
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { computed, reactive } from "vue";
import Taro, {
  useShareAppMessage,
  useShareTimeline,
  switchTab,
} from "@tarojs/taro";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import fullPreview from "../fullPreview/index.vue";
import openOutLinkTipPop from '@/components/pop/openOutLinkTipPop/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
  pageContainerShow: true,
  menuList: [
    {
      title: "IKun",
      Ctitle: "小黑子",
      router: "/pages/cxk/cxk/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
      opacity: 0.2,
    },
    {
      title: "IKun",
      Ctitle: "坤歌台",
      router: "/pages/cxk/cxk3/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
      opacity: 0.2,
    },
    {
      title: "Shake Kun",
      Ctitle: "摇坤",
      router: "/pages/cxk/cxk2/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/BEDKEKCP-1705543014391shakeKun.gif",
      opacity: 1,
      linkUrl: "http://ikunqqq.ssdwgg.cn",
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FJHBFEAA-1706331358049ikunqqq.png'
    },
    {
      title: "Kun Str",
      Ctitle: "字符坤",
      router: "/pages/cxk/cxk4/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/IIOMLFKE-1705543014391strkun.gif",
      opacity: 1,
      linkUrl: "http://ikunstr.ssdwgg.cn",
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GIKJIPEA-1706331381805ikunstr.png'
    },
    {
      title: "Game",
      Ctitle: "消消乐旋转版本",
      router: "/pages/cxk/cxk5/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HEPJCNMO-1705543014391game1.gif",
      opacity: 1,
      linkUrl: "http://hextris.ssdwgg.cn",
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IMDCHDJP-1706331384525hextris.png'
    },
    {
      title: "Game",
      Ctitle: "兔了个兔",
      router: "/pages/cxk/cxk6/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/NICPAEIK-1705543014391tlgt.gif",
      opacity: 1,
      linkUrl: "http://xlgx.ssdwgg.cn",
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MOCAPJJK-1706331446705xlgx.png'
    },
  ],
  chooseItem: {
      title: "Game",
      Ctitle: "兔了个兔",
      router: "/pages/cxk/cxk6/index",
      bgSrc:
        "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/NICPAEIK-1705543014391tlgt.gif",
      opacity: 1,
      linkUrl: "http://xlgx.ssdwgg.cn",
      qrSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MOCAPJJK-1706331446705xlgx.png'
    },
  popTipVisible: false
});

const h5 = `<h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>去创造坤去改变坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>从想象坤到现象坤</strong></h2><h2 style=\"text-align: center;color: #fff;opacity: .5;\"><strong>即刻坤坤</strong></h2>`;
const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);


const goto = (item) => {
  if (process.env.NODE_ENV === 'development') {
    // dev直接跳转
    Taro.navigateTo({ url: item.router });
  }
  else if (!!item.linkUrl) {
    // 提示网址
    data.chooseItem = item
    data.popTipVisible = true
  } else {
    Taro.navigateTo({ url: item.router });
  }
};

const goback = () => {
  switchTab({ url: "/pages/menu/index" });
};

useShareTimeline(() => {
  return {
    title: "快来坤屋吧~",
    path: `/pages/cxk/index/index`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
useShareAppMessage(() => {
  return {
    title: "快来坤屋吧~",
    path: `/pages/cxk/index/index`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
</script>
