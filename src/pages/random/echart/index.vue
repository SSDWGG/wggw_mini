<template>
  <!-- <view class="title"></view> -->
  <view class="bar-chart">
    <EChart ref="barChat" canvas-id="bar-canvas" />
  </view>
</template>
<script lang="ts" setup>
import EChart from '@/components/myEcharts/index.vue';
import Taro from '@tarojs/taro';
import { ref } from 'vue';

const props = defineProps({
  mainData: {} as any,
});


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
        name: '选项概率',
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
          { value: 1, name: 'Search Engine' },
          { value: 2, name: 'Direct' },
          { value: 3, name: 'Email' },
          { value: 4, name: 'Union Ads' },
          { value: 10, name: 'Video Ads1' },
          { value: 20, name: 'Video Ads2' },
          { value: 30, name: 'Video Ads3' },
          { value: 40, name: 'Video Ads4' },
        ]
      }
    ]
  };
  option.series[0].data = props.mainData;
  barChat.value.refresh(option);
});
</script>
