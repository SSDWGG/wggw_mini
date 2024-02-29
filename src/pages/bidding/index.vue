<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar title="价值曲线" background-color="rgba(116, 104, 242,.1)" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="价值曲线" />
    <view class="tipTitle">
      以下标的价值几何？
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <view class="menu-item" @tap="open(item)" v-for="item in data.biddingDefaultList" :key="item.shopId">
        <view class="title">
          {{ item.title }}
        </view>
        <image class="bgImg" mode="aspectFill" :src="(item.imgSrc as any)[0]?.picUrl" />
      </view>
    </view>
    <side-bar :show="show" :onbiddingButtonBack="() => Taro.navigateTo({url:`/pages/bidding/post/index?type=image`})" :showFlags="[7]" />
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from "./styles.scss";
import { computed, reactive } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import Taro from "@tarojs/taro";
import { getKunChartList} from "@/apis/kunChart";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import { useDidShow } from "@tarojs/taro";
import { IBiddingItem } from "@/apis/kunChart/model";

const { show, onScroll } = useListScroll();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
  biddingDefaultList: [] as IBiddingItem[],
});

useDidShow(async () => {
 const res  = await getKunChartList({
    current: 1,
    pageSize: 100,
  });

  res.forEach(item=>{
    item.imgSrc = JSON.parse(item.imgSrc)
  })

  data.biddingDefaultList =  res
  
});

const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

const open = (item) => {
  Taro.navigateTo({
    url: `/pages/bidding/detail/index?shopId=${item.shopId}`,
  });
};
</script>
