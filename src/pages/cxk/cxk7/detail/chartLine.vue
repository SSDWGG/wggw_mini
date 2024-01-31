<template>
  <view class="bar-chart">
    <EChart ref="barChat" canvas-id="bar-canvas" />
  </view>

  <view class="btnGroup">
    <!-- 获取最新报价 -->
    <nut-animate type="breath" class="rule-button-div" loop @tap="onRefreshData">
      <nut-button block type="primary" class="publish" @tap="onRefreshData">更新报价</nut-button>
    </nut-animate>
    <!-- 添加报价 -->
    <nut-animate type="breath" class="rule-button-div" loop>
      <nut-button block type="primary" class="publish" @tap="addGame">参与报价</nut-button>
    </nut-animate>
  </view>
   <!-- toast提示 -->
   <mpm-toast ref="myToast" :duration="2500" />
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
// import {
//   Animate as NutAnimate,
//   Button as NutButton,
// } from "@nutui/nutui-taro";
import cloneDeep from 'lodash/cloneDeep';
import mpmToast from "@/components/myToast/index.vue";
import { debounce } from 'lodash';

interface IProps {
  orginData: IPriceLineItem[]
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    orginData: () => ([] as IPriceLineItem[]),
  }
);
const myToast = ref<any>();

useReady(() => {
  initMultiBarChart();
})
const barChat = ref<any>();
const onRefreshData = () => {
  initMultiBarChart();
}

const initData = (option) => {
  props.orginData.forEach(item => {
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

const addGame = debounce(
  () => {

  myToast.value.mpmToastShow({
        icon: "error",
        title: `坤之守护大笑着现身，“没有人可以审判我的坤！老天爷也不行！” 随后发动技能 ‘无懈可击：不接受其余人任何报价，但坤会被自我扣除912.5点价值’，坤之守护渐渐消失。 `,
        duration: 5000,
      });

  let last = cloneDeep(props.orginData[props.orginData.length - 1])
  last.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
  last.uid = '250'
  last.uName = '坤之守护者'
  last.price = Number(last.price)  - 912.5
  props.orginData.push(
    last
  )
  initMultiBarChart()
}
,1000, { leading: true, trailing: false })

</script>
