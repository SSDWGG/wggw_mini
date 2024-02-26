<template>
  <canvas type="2d" class="ec-canvas" :canvas-id="canvasId" @touchStart="touchStart" @touchMove="touchMove"
    @touchEnd="touchEnd"></canvas>
</template>

<script lang="js">
//自定义下载的echarts.min.js 文件  要使用需使用js,ts需要声明文件
import Taro from "@tarojs/taro";
import WxCanvas from "./wx-canvas";
import * as echarts from "./echarts.min";
 
export default {
  name: "EcCanvas",
  props: {
    canvasId: {
      type: String,
      default: ""
    },
    ec: {
      type: Object,
      default: null
    }
  },
  mounted() {
    echarts.registerPreprocessor(option => {
      if (option && option.series) {
        if (option.series.length > 0) {
          option.series.forEach(series => {
            series.progressive = 0;
          });
        } else if (typeof option.series === "object") {
          option.series.progressive = 0;
        }
      }
    });
    if (!this.ec) {
      console.warn(
        '组件需绑定 ec 变量，例：<ec-canvas id="mychart-dom-bar" ' +
        'canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>'
      );
      return;
    }
    if (!this.ec.lazyLoad) {
      this.init();
    }
  },
  methods: {
    init(callback) {
      this.initByNewWay(callback);
    },
    initByNewWay(callback) {
      const query = Taro.createSelectorQuery();
      query
        .select(".ec-canvas")
        .fields({
          node: true,
          size: true
        })
        .exec(res => {
          if (!res || res.length == 0 || res[0] == null || res[0].node == null) {
            console.error('未获取到canvas的dom节点,请确认在页面渲染完成后或节点,taro中页面渲染完成的生命周期是useReady');
            return
          }
          const canvasNode = res[0].node;
          // this.canvasNode = canvasNode;
 
          const canvasDpr = Taro.getSystemInfoSync().pixelRatio;
          const canvasWidth = res[0].width;
          const canvasHeight = res[0].height;
 
          const ctx = canvasNode.getContext("2d");
          const canvas = new WxCanvas(ctx, this.canvasId, true, canvasNode);
          echarts.setCanvasCreator(() => {
            return canvas;
          });
 
          if (typeof callback === "function") {
            this.chart = callback(canvas, canvasWidth, canvasHeight, canvasDpr);
          } else if (typeof this.ec.onInit === "function") {
            this.chart = this.ec.onInit(
              canvas,
              canvasWidth,
              canvasHeight,
              canvasDpr
            );
          } else {
            this.triggerEvent('init', {
              canvas: canvas,
              width: canvasWidth,
              height: canvasHeight,
              dpr: canvasDpr
            })
          }
        });
    },
    canvasToTempFilePath(opt) {
      const query = Taro.createSelectorQuery().in(this);
      query
        .select(".ec-canvas")
        .fields({
          node: true,
          size: true
        })
        .exec(res => {
          const canvasNode = res[0].node;
          opt.canvas = canvasNode;
          Taro.canvasToTempFilePath(opt);
        });
    },
    touchStart(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousedown", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "start");
      }
    },
    touchMove(e) {
      if (this.chart && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.chart.getZr().handler;
        handler.dispatch("mousemove", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "change");
      }
    },
    touchEnd(e) {
      if (this.chart) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.chart.getZr().handler;
        handler.dispatch("mouseup", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch("click", {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(this.wrapTouch(e), "end");
      }
    },
    wrapTouch(event) {
      for (let i = 0; i < event.touches.length; ++i) {
        const touch = event.touches[i];
        touch.offsetX = touch.x;
        touch.offsetY = touch.y;
      }
      return event;
    }
  }
};
</script>
 
<style>
.ec-canvas {
  width: 100%;
  height: 100%;
}
</style>