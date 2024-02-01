<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage"  scroll-y="true">
    <navbar title="坤线图" background-color="rgba(116, 104, 242,.1)"/>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="wggw大舞台" />
    <view class="tipTitle">
      首先很高兴您能参与此试验游戏，我们会为您提供以下内容显示报价，您可以参与试验游戏提供您觉得合理的价格
    </view>
    <!-- 维护坤坤节目列表 -->
    <view class="menu" :style="{ height }">
      <view class="menu-item"  @tap="open(item)"  v-for="item in accountStore.biddingKunDefaultList" :key="item.shopId" >
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
// import {
//   WaterMark as NutWaterMark,
// } from "@nutui/nutui-taro";
import { computed, reactive } from "vue";
import { Navbar } from "@fishui/taro-vue";
import { useSystemInfoStore } from "@/stores/systemInfo";
import { useAccountStore } from '@/stores/account';
import Taro from "@tarojs/taro";



const accountStore = useAccountStore();

const systemInfo = useSystemInfoStore();
const data = reactive({
  showPage: true,
});



const height = computed(
  () =>
    `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`
);

const open = (item) => {
  Taro.navigateTo({
    url:`/pages/cxk/cxk7/detail/index?shopId=${item.shopId}`
  })

}


</script>
