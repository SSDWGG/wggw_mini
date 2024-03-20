<template>
  <view class="title">Echarts图表</view>
  <view class="bar-chart">
    <EChart ref="barChat" canvas-id="bar-canvas" />
  </view>
</template>
<script lang="ts" setup>
// import * as echarts from "@/components/ec-canvas/echarts";
import EChart from '@/components/myEcharts/index.vue';
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const barChat = ref<any>();
Taro.nextTick(() => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  barChat.value.refresh(option)
})
</script>
