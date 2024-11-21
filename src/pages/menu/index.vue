<template>
  <scroll-view v-if="data.showPage" :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <myNavBar title="Menu" hide-back background-color="#f5f5f9" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="WGGW" />
    <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
      Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their
      end know dark is right, Because their words had forked no lightning they Do not go gentle into that good night.
    </nut-noticebar>

    <view class="richText">
      <rich-text :nodes="h5" />
      <!-- objectFit="fill" -->
      <video
        class="video"
        object-fit="fill"
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
        :src="cdnHost + ossFilePrePath + '/032dd063570aee17.mp4'"
      />
      <!-- OMFHLJDP-17059977997221 -->
    </view>
    <!-- 单列区（突出） -->
    <view :gutter="10" :border="false" class="menuSingle" :column-num="2">
      <view
        v-for="(item, index) in account.mainMenuList.filter((item) => !item.secondListName)"
        :key="index"
        class="item"
        :style="{ backgroundImage: `url(${item.bgSrc})` }"
      >
        <view v-if="item.isShow !== false" class="menu-item" @tap="goto(item)">
          <view class="title">
            {{ item.title }}
          </view>
          <view class="title">
            {{ item.Ctitle }}
          </view>
        </view>
      </view>
    </view>
    <!-- 多列区 -->
    <view v-for="(item, index) in account.mainMenuList.filter((item) => !!item.secondListName)" :key="index" class="menuMore">
      <view class="title" @tap="goto(item)">
        <view class="txt"> {{ item.Ctitle }} </view>
        <view class="iconContent">
          更多
          <image src="@/assets/images/project/arrow.png" />
        </view>
      </view>

      <view class="list">
        <view v-for="(secondItem, secondIndex) in account[item.secondListName ?? '']" :key="secondIndex" class="sceneryItem" @tap="goto(secondItem)">
          <image mode="aspectFill" :style="{ opacity: secondItem.opacity ?? 0.8 }" :src="secondItem.bgSrc ?? imgDefaultSrc" />
          <view class="moreTitle">
            {{ secondItem.title }}
          </view>
          <view class="moreTitle">
            {{ secondItem.Ctitle }}
          </view>


        </view>
      </view>
    </view>
    <!-- <commonMenu :height="height" :listData="account.mainMenuList"></commonMenu> -->

    <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[6, 1, 2, 3, 4]" />
  </scroll-view>
  <fullPreview v-else :svgaLoop="1" :svga-url="data.svgaUrl" :back="true" title="Enjoy" @back="data.showPage = true" @finsh="onFinsh" />
  <!-- <svga-play-component
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
    :svgaUrl="cdnHost+ossFilePrePathSvga+'/normalSVGA/angel.svga'"
  />
  <svga-play-component
    ref="svgaPlayRef2"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    :svgaUrl="cdnHost+ossFilePrePathSvga+'/normalSVGA/rose.svga'"

  /> -->
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
  <openOutLinkTipPop
    :pop-tip-visible="data.popTipVisible"
    :qrSrc="data.chooseItem.qrSrc"
    :show-name="data.chooseItem.Ctitle"
    :href="data.chooseItem.linkUrl"
    @close="
      () => {
        data.popTipVisible = false;
      }
    "
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import { useShareAppMessage, useShareTimeline, useDidShow } from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
import fullPreview from '@/components/fullPreview/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useMusicStore } from '@/stores/music';
import { useAccountStore } from '@/stores/account';
// import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import myToastComponents from '@/components/myToast/index.vue';
import { cdnHost, ossFilePrePath, ossFilePrePathSvga } from '@/utils/env';
import Taro from '@tarojs/taro';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';
import { isDeving } from '@/utils/index';
import type { IListDataItem } from 'types/global';
import openOutLinkTipPop from '@/components/pop/openOutLinkTipPop/index.vue';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const account = useAccountStore();
const musicStore = useMusicStore();

// const svgaPlayRef = ref();
// const svgaPlayRef2 = ref();
const myToast = ref<any>();

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
const data = reactive({
  chooseItem: {} as IListDataItem,
  popTipVisible: false,
  showPage: true,
  svgaUrl: `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`,
});

const h5 = ` <h2 style="text-align: center;color: #7468F2;font-family: monospace;font-size:22px; opacity: .8;"><strong>去创造去改变</strong></h2>
    <h2 style="text-align: center;color: #7468F2;font-family: monospace;font-size:22px;opacity: .8;"><strong>从想象到现象</strong></h2>
    <h2 style="text-align: center;color: #7468F2;font-family: monospace;font-size:22px;opacity: .8;"><strong>即刻出发</strong></h2>`;

useDidShow(() => {
  if (!musicStore.isPlay()) {
    musicStore.playDefaultBGM();
  }
});

const onFinsh = () => {
  const tempUrl = `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`;
  // 防止两次随机出同一个整数导致的watch不刷新
  if (data.svgaUrl === tempUrl) {
    onFinsh();
  } else {
    data.svgaUrl = tempUrl;
  }
};

useShareTimeline(() => ({
  title: '创意空间wggw~',
  path: '/pages/index/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));
useShareAppMessage(() => ({
  title: '创意空间wggw~',
  path: '/pages/index/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/GKNPEBAA-1678694972749test.jpeg`,
}));

const goto = (item: IListDataItem) => {
  if (isDeving()) {
    if (item.linkUrl) {
      Taro.navigateTo({ url: `/pages/webViewPage/index?webViewUrl=${item.linkUrl}` });
    } else {
      Taro.navigateTo({ url: item.router as string });
    }
  } else if (item.linkUrl) {
    // 提示网址
    data.chooseItem = item;
    data.popTipVisible = true;
  } else {
    Taro.navigateTo({ url: item.router as string });
  }
};
</script>
