<template>
  <ec-canvas 
  :ref="(el) => setRefMap(el, item)"
  :canvas-id="canvasId" :ec="ec"></ec-canvas>
</template>

<script lang="js">
/**
* 自定义下载的echarts.min.js 文件  要使用需使用js,ts需要声明文件
* 此组件不能使用setup语法糖，会报错的.
https://echarts.apache.org/zh/builder.html  在线构建echart.min
*/
import * as echarts from './ec-canvas/echarts.min';
import EcCanvas from './ec-canvas/ec-canvas.vue';
import { ref, reactive } from 'vue';
export default {
  components: {
    EcCanvas,
  },
  props: {
    canvasId: {
      type: String,
      default: '',
    },
  },
  setup(props, { expose }) {
    const ec = reactive({
      lazyLoad: true,
    });

    const refMap = {};

    const setRefMap = (el, item) => {
      if (el) {
        refMap[`${el.canvasId}`] = el;
      }
    };

    const refresh = (options) => {
      if (!refMap[props.canvasId]) {
        console.error('ecCanvas未获取到dom');
        return;
      }
      refMap[props.canvasId].init((canvas, width, height, canvasDpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: canvasDpr,
        });
        canvas.setChart(chart);
        chart.setOption(options);
        return chart;
      });
    };

    expose({
      refresh,
    });
    return {
      // 返回值会暴露给模板和其他的选项式 API 钩子
      ec,
      setRefMap
    };
  },
};
</script>
