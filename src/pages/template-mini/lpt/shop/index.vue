<template>
  <scroll-view :class="styles.testContainer" scroll-y="true" >
    <!-- navbar -->
    <navbar title="mall" >
      <template #left>
      <view style="padding: 6px 20px" @tap="goHomePage">
        <IconFont name="home" size="20" />
      </view>
    </template>
    </navbar>
    <nut-swiper :init-page="2" :auto-play="3000" pagination-visible pagination-color="#426543"
      pagination-unselected-color="#808080" class="mySwiper">
      <nut-swiper-item v-for="(item, index) in data.swiperList" :key="index" style="height: 150px">
        <img :src="item.imgUrl" mode="widthFit" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>
    <!-- tabbar -->
    <myTabBar></myTabBar>
  </scroll-view>
</template>

<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import myTabBar from '../custom-tab-bar/index';
import { reactive } from 'vue';
import { getIndexImgs } from '@/apis/lpt/mine';
import Taro, { useDidShow } from '@tarojs/taro';


const data = reactive({
  swiperList: [] as any,

});

const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/template-mini/menu/index' });
};

const getSwiperList = async () => {
  data.swiperList = await getIndexImgs();
};

useDidShow(() => {
  // 获取轮播图
  getSwiperList();
});
</script>
