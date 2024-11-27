<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<template>
  <myNavBar title="店铺分享码" />
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
import myNavBar from '@/components/my-nav-bar/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import type { IPosterData } from './useGeneratePoster';
import { useGeneratePoster } from './useGeneratePoster';
// @ts-ignore
import styles from './styles.scss';
import { cdnHost,ossFilePrePath } from '@/utils/env';

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
  `${cdnHost}${ossFilePrePath}/3al21kb413ywd1xznx078g31x5x2ximf.jpg`,
  `${cdnHost}${ossFilePrePath }/ysogxohp76f4ko2pe5oz8bpxey0u0jcx.jpg`,
  `${cdnHost}${ossFilePrePath}/yrxyhzuaxg2p1f525tkx5pwg9eziqnxq.jpg`,
  `${cdnHost}${ossFilePrePath }/IBCAAIAD-1732519687686OGDO4916.jpg`,
  // `${cdnHost}${ossFilePrePath }/share-poster-default-bg@2x.png`,
  ];
  return urls;
};

const height = computed(() => `calc( 100vh - ${systemInfoStore.statusBarHeight}px - 88rpx - 150rpx - env(safe-area-inset-bottom))`);

const posterData = computed<IPosterData>(() => ({
  nickname: '玮**',
  tenantName: 'wgg科技有限公司',
  avatarUrl: `${cdnHost}${ossFilePrePath}/tx999879.jpg`,
  qrcodeUrl: `${cdnHost}${ossFilePrePath}/LIMEPFJB-1731722201729wechat.jpg`,
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
