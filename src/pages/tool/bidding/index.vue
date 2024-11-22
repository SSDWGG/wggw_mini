<template>
  <scroll-view v-if="isPermissionsToWx()" :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <myNavBar title="价值曲线" background-color="transparent" />
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="价值曲线" />
    <view class="tipTitle">
      以下标的价值几何？
    </view>
    <view class="menu" :style="{ height }">
      <view v-for="item in data.biddingDefaultList" :key="item.shopId" class="menu-item" @tap="open(item)">
        <view class="title">
          {{ item.title }}
        </view>
        <image class="bgImg" mode="aspectFill" :src="(item.imgSrc as any)[0]?.picUrl" />
      </view>
    </view>
    <side-bar :show="show" :onbiddingButtonBack="() => Taro.navigateTo({url:`/pages/tool/bidding/post/index?type=image`})" :showFlags="[7]" />
  </scroll-view>
  <view v-else :class="styles.emptyContainer">
    <myNavBar title="感谢关注" />
    <view class="empty" >
      感谢您的关注，该功能暂未开启
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, reactive } from 'vue';
import myNavBar from '@/components/my-nav-bar/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import Taro from '@tarojs/taro';
import { getKunChartList} from '@/apis/kunChart';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useDidShow } from '@tarojs/taro';
import type { IBiddingItem } from '@/apis/kunChart/model';
import { isPermissionsToWx } from '@/utils/index';

const { show, onScroll } = useListScroll();

const systemInfo = useSystemInfoStore();
const data = reactive({
  biddingDefaultList: [] as IBiddingItem[],
});

useDidShow(async () => {
 const res  = await getKunChartList({
    current: 1,
    pageSize: 100,
  });

  res.forEach(item=>{
    item.imgSrc = JSON.parse(item.imgSrc);
  });

  data.biddingDefaultList =  res;

});

const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

const open = (item) => {
  Taro.navigateTo({
    url: `/pages/tool/bidding/detail/index?shopId=${item.shopId}`,
  });
};
</script>
