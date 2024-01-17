<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar :title="pageTitle" background-color="rgba(116, 104, 242,.1)">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <nut-icon name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-water-mark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" :content="chooseItem?.title" />
    <side-bar :show="show" @full="data.showPage = false" />

    <view class="img">
      {{ chooseItem?.imgSrc }}
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="title">
      {{ chooseItem?.dec }}
    </view>

    <view class="bar-chart">
      <EChart ref="barChat" canvas-id="bar-canvas" />
    </view>
    <button :plain="true" @tap="onRefreshData">刷新数据</button>
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
  useReady,
} from "@tarojs/taro";
import { changeLongStr } from "@/utils/index";
import EChart from '@/components/myEcharts/e-chart.vue';
import Taro from "@tarojs/taro";

useReady(() => {
  initMultiBarChart();
})
const barChat = ref<any>();
const onRefreshData = () => {
  initMultiBarChart();
}
const initMultiBarChart = () => {
  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
        smooth: true,
        stack: "Total",
      },
    ],
  };
  Taro.nextTick(() => {
    barChat.value.refresh(options)
  })
}

const router = useRouter();

const pageTitle = ref("");

const { show, onScroll } = useListScroll();

const accountStore = useAccountStore();

const data = reactive({
  showPage: true,
});

let chooseItem = ref();

const init = () => {
  chooseItem.value = accountStore.biddingDefaultList.filter(
    (item) => item.uid == router.params.uid
  )[0];
  pageTitle.value =
    changeLongStr(chooseItem.value.title, 3, true) + "价格曲线";
};

useDidShow(() => {
  init();
});

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
  switchTab({ url: "/pages/index/index" });
};
</script>
