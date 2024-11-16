<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<template>
  <Navbar title="店铺分享码" />
  <swiper
    :class="styles.swiper"
    :style="{ height }"
    :indicator-dots="state.posters.length > 1"
    indicator-color="#dbd9f7"
    indicator-active-color="#7468f2"
    :current="state.current"
    @change="onChange"
  >
    <swiper-item v-for="(tempPath, index) in state.posters" :key="index">
      <image :src="tempPath" :show-menu-by-longpress="true" />
    </swiper-item>
  </swiper>
  <view :class="styles.footer"><button @tap="onSave">保存图片</button></view>
  <view :class="styles.faker">
    <canvas v-for="id in canvasIds" :key="id" :canvas-id="id" :class="styles.canvas"/>
  </view>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import Taro from '@tarojs/taro';
import { Navbar } from '@fishui/taro-vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import type { IPosterData } from './useGeneratePoster';
import { useGeneratePoster } from './useGeneratePoster';
// @ts-ignore
import styles from './styles.scss';

interface IState {
  current: number; // swiper current
  loading: boolean; //
  posters: string[], // poster file tempPath
}
// 固定 3个 canvas
const canvasIds = ['mpmCanvas-0', 'mpmCanvas-1', 'mpmCanvas-2'];
const systemInfoStore = useSystemInfoStore();

/**
 * 获取相册前面 maxCount 4 张图片 url
 * **/
const getPicUrls = () => {
  const urls: string[] = [
    'https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-default-bg@2x.png',
    'https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-default-bg@2x.png',
    'https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-default-bg@2x.png',
    'https://panshi-on.meipingmi.com.cn/yunxiaoding-mini/share-poster-default-bg@2x.png',
  ];
  // const index = 0;
  // for (const item of albumList) {
  //   for (const details of item.list) {
  //     urls[index++] = details.type === 2 ? details.videoPicUrl : details.picUrl;
  //     if (index === maxCount) return urls;
  //   }
  // }
  return urls;
};

const height = computed(() => `calc( 100vh - ${systemInfoStore.statusBarHeight}px - 88rpx - 150rpx - env(safe-area-inset-bottom))`);

const posterData = computed<IPosterData>(() => ({
  nickname: 'aaaa',
  tenantName: 'bbb',
  avatarUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
  qrcodeUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MDCNIKIN-1665731176017WechatIMG3877.jpeg',
  picUrls: getPicUrls(),
}));
const state = reactive<IState>({
  current: 0,
  loading: true,
  posters: [],
});

const gen = useGeneratePoster(posterData);

const onChange = (e) => {
  state.current = e.detail.current;
};

const onSave = () => {
  Taro.saveImageToPhotosAlbum({
    filePath: state.posters[state.current],
    success() {
      Taro.showToast({ title: '保存成功', icon: 'success' });
    },
    fail() {
      Taro.showToast({ title: '保存失败', icon: 'error' });
    },
  });
};

Taro.showLoading({ title: '生成中...' });
const init = () => {
  // 首先 onReady 生成第一张海报 展示给用户看，再去异步生成第二、第三张海报
  gen.gen0(canvasIds[0]).then((tempPath) => {
    state.posters.push(tempPath);
    Taro.hideLoading();
    Promise.all([
      gen.gen1(canvasIds[1]),
      gen.gen2(canvasIds[2]),
    ]).then((paths) => {
      state.posters.push(...paths);
    });
  });
};

init();



</script>
