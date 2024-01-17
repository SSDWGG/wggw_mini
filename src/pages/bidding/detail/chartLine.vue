<template>
  <view class="bar-chart">
    <EChart ref="barChat" canvas-id="bar-canvas" />
  </view>

  <view class="btnGroup">
      <!-- 获取最新报价 -->
      <nut-animate
        type="breath"
        class="rule-button-div"
        loop
        @tap="onRefreshData"
      >
        <nut-button
          block
          type="primary"
          class="publish"
          @tap="onRefreshData"
          >更新报价</nut-button
        >
      </nut-animate>
      <!-- 添加报价 -->
      <nut-animate type="breath" class="rule-button-div" loop>
        <nut-button
          block
          type="primary"
          class="publish"
          @tap="addGame"
          >参与报价</nut-button
        >
      </nut-animate>
    </view>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  useReady,
} from "@tarojs/taro";
import EChart from '@/components/myEcharts/e-chart.vue';
import Taro from "@tarojs/taro";
import { IPriceLineItem } from "@/stores/account";
import dayjs from 'dayjs';
import {
    Animate as NutAnimate,
    Button as NutButton,
  } from "@nutui/nutui-taro";

interface IProps {
  orginData: IPriceLineItem[]
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    orginData: () => ([] as IPriceLineItem[]),
  }
);

useReady(() => {
  initMultiBarChart();
})
const barChat = ref<any>();
const onRefreshData = () => {
  initMultiBarChart();
}

const initData  = (option)=>{
  props.orginData.forEach(item=>{
    option.xAxis.data.push(item.time)
    
    option.series[0].data.push(item.price)
  })
}

const initMultiBarChart = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        margin: 4,
        formatter: function (value) {
          if (value >= 1000 && value < 10000) {
            value = value / 1000 + "千";
          }
          else if (value >= 10000 && value < 10000000) {
            value = value / 10000 + "万";
          } else if (value >= 10000000) {
            value = value / 10000000 + "千万";
          }

          if (value <= -1000 && value > -10000) {
            value = value / 1000 + "千";
          }
          else if (value <= -10000 && value > -10000000) {
            value = value / 10000 + "万";
          } else if (value <= -10000000) {
            value = value / 10000000 + "千万";
          }
          return value;
        }
      },
    },
    series: [
      {
        data: [],
        type: 'line',
        smooth: true
      }
    ]
  };
  initData(option)

  Taro.nextTick(() => {
    barChat.value.refresh(option)
  })
}

const addGame = ()=>{
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'));
  
}

</script>
