<template>
  <view :class="styles.mapContainer">
    <myNavBar title="足迹地图" />
    <view class="img_box">
      <image :src="data.url"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import amapFile from './amap-wx.130.js';
import { reactive } from 'vue';

const data = reactive({
  url: '',
});

const init = () => {
  const myAmapFun = new amapFile.AMapWX({ key: 'b74332ce8f82260c9a41a305e1cd6a3a' });
  myAmapFun.getRegeo({
    success: (data) => {
        // 🎈 保存位置的描述信息（ longitude经度 latitude纬度 和位置信息 ）
        console.log(data);

      },
      fail: function(info){
        console.log('get Location fail',info);
      }
    });

  wx.getSystemInfo({
    success: function (res) {
      const height = res.windowHeight;
      const width = res.windowWidth;
      const size = `${width}*${height}`;
      myAmapFun.getStaticmap({
        zoom: 8,
        size: size,
        scale: 2,
        markers: 'mid,0xFF0000,A:116.37359,39.92437;116.47359,39.92437',
        success: function (info) {
          data.url = info.url;
        },
        fail: function (info) {
          wx.showModal({ title: info.errMsg });
        },
      });
    },
  });
};

init();
</script>
