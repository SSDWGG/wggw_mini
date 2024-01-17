<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar :title="pageTitle" background-color="rgba(116, 104, 242,.1)">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <nut-icon name="home" size="20" />
        </view>
      </template>
    </navbar>
    
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" v-if="chooseItem?.title" :z-index="1" :content="chooseItem?.title" />
    <side-bar :show="show" :showFlags = [1,3] />

    <view class="imgDiv">
      <image mode="aspectFit" :src=chooseItem?.imgSrc class="img"></image>
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="title">
      {{ chooseItem?.dec }}
    </view>

    <chartLine v-if="!!chooseItem?.priceLine" :orginData = chooseItem?.priceLine></chartLine>
    
  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { WaterMark as NutWaterMark } from "@nutui/nutui-taro";
import { reactive, ref } from "vue";
import { Navbar } from "@fishui/taro-vue";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import { useAccountStore } from "@/stores/account";
import {
  useShareAppMessage,
  useShareTimeline,
  useRouter,
  switchTab,
  useDidShow,
} from "@tarojs/taro";
import { changeLongStr } from "@/utils/index";
import chartLine from './chartLine.vue'

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});



const router = useRouter();

const pageTitle = ref("");

const { show, onScroll } = useListScroll();

const accountStore = useAccountStore();

const data = reactive({
  showPage: true,
});

let chooseItem = ref();

const init = () => {
  console.log(router.params);
  
  chooseItem.value = accountStore.biddingDefaultList.filter(
    (item) => item.shopId == router.params.shopId
  )[0];
  pageTitle.value =
    changeLongStr(chooseItem.value.title, 6, true) + "价格";
};

useDidShow(() => {
  init();
});

useShareTimeline(() => {
  return {
    title: "守护最好的坤~",
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
useShareAppMessage(() => {
  return {
    title: "守护最好的坤~",
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
const goHomePage = () => {
  switchTab({ url: "/pages/index/index" });
};
</script>
