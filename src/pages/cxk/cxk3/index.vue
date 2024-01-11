<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="坤歌台" background-color="rgba(116, 104, 242,.1)">

      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <nut-icon name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="坤坤大舞台有歌你就来" />
    <side-bar :show="show" @full="data.showPage = false" />


    <view class="tipTitle">
      我们很高兴的为您提供以下坤歌，请点击播放
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <view class="menu-item" @tap="play(item, index)" v-for="(item, index) in musicStore.cxkMusicList" :key="index">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="title">
          {{ item.singer }}
        </view>
        <image class="bgImg" :class="{ activeImg: item.isplay }" :src='item.coverImgUrl' />
      </view>
    </view>

  </scroll-view>
  <fullPreview :back="true" @back="data.showPage = true" v-else />
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import {
  WaterMark as NutWaterMark,
} from "@nutui/nutui-taro";
import { computed, reactive } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import fullPreview from "../fullPreview/index.vue";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import { useMusicStore } from '@/stores/music';
import { useShareAppMessage, useShareTimeline, useRouter, switchTab, useDidShow } from "@tarojs/taro";

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const router = useRouter();


const { show, onScroll } = useListScroll();

const musicStore = useMusicStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
});


useDidShow(() => {
  if (!musicStore.isPlay()) {
    musicStore.playCxkMusic()
  }
});

const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

const play = (item, index) => {
  musicStore.play(item)
  musicStore.cxkSongIndex = index
}

useShareTimeline(() => {
  return {
    title: "快来听坤歌吧~",
    path: `/pages/cxk/cxk3/index?isShare=true`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
useShareAppMessage(() => {
  return {
    title: "快来听坤歌吧~",
    path: `/pages/cxk/cxk3/index?isShare=true`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});

const goHomePage = () => {
  switchTab({ url: '/pages/index/index' });
};
</script>
