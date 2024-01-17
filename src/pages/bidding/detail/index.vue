<template>
  <scroll-view
    :class="styles.myContainer"
    class="pageIn"
    v-if="data.showPage"
    @scroll="onScroll"
    scroll-y="true"
  >
    <navbar :title="pageTitle" background-color="rgba(116, 104, 242,.1)">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <nut-icon name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-water-mark
      :gap-x="20"
      font-color="rgba(0, 0, 0, .1)"
      :z-index="1"
      :content="chooseItem?.title"
    />
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

      <ec-canvas
        id="mychart-dom-area"
        canvas-id="mychart-area"
        class="echart"
        :ec="ec"
        type="2d"
      />
  </scroll-view>
</template>
<script lang="ts" setup>
  import styles from "./styles.scss";
  import { WaterMark as NutWaterMark } from "@nutui/nutui-taro";
  import { computed, reactive, ref } from "vue";
  import { Navbar } from "@fishui/taro-vue";
  import { useSystemInfoStore } from "@/stores/systemInfo";
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
  import * as echarts from "@/components/ec-canvas/echarts";

  // 这个配置注释无效，会导致引入错误
  definePageConfig({
    usingComponents: {
      "ec-canvas": "../../../components/ec-canvas/ec-canvas",
    },
  });

  const router = useRouter();

  const pageTitle = ref("");

  const { show, onScroll } = useListScroll();

  const accountStore = useAccountStore();

  const systemInfo = useSystemInfoStore();
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

  

  const echartRef = ref();
  const initChart = (canvas, width, height, dpr) => {
    console.log(canvas, width, height);

    const chart = echarts.init(canvas, null, {
      width:width,
      height:height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    const option = {
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

    chart.setOption(option);
    echartRef.value = chart;
    return chart;
  };

  const ec = {
    onInit:initChart,
  };

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
