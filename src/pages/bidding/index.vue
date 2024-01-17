<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="虚拟价格曲线" background-color="rgba(116, 104, 242,.1)">

      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <nut-icon name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="坤坤大舞台有歌你就来" />
    <side-bar :show="show" @full="data.showPage = false" />


    <view class="tipTitle">
      首先很高兴您能参加此次开放试验，我们会为您提供以下内容进行显示报价，您可以参与报价，提供您觉得合理的价格
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <view class="menu-item"  @tap="open(item, index)"  v-for="(item, index) in accountStore.biddingDefaultList" :key="item.uid" >
          <view class="title">
            {{ item.title }}
          </view>
          <image class="bgImg" :src='item.imgSrc' />
      </view>
    </view>

  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import {
  WaterMark as NutWaterMark,
} from "@nutui/nutui-taro";
import { computed, reactive } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import { useAccountStore } from '@/stores/account';
import { useShareAppMessage, useShareTimeline, useRouter, switchTab, useDidShow } from "@tarojs/taro";
import Taro from "@tarojs/taro";

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const router = useRouter();


const { show, onScroll } = useListScroll();

const accountStore = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
});



const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

const open = (item, index) => {
  console.log(item, index);
  Taro.navigateTo({
    url:`/pages/bidding/detail/index?uid=${item.uid}`
  })

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
