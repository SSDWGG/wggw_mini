<template>
  <view v-if="isPermissionsToWx()" :class="styles.container">
    <myNavBar title="上传照片" />
    <view class="body">
      <!-- 预览列表(图片、视频，添加按钮) -->
      <prelist ref="prelistRef" />
    </view>

    <!-- 发表按钮 -->
    <view class="footer">
      <nut-button block type="primary" class="publish" @tap="handleAddAlbum">确认上传</nut-button>
    </view>
  </view>
  <view v-else :class="styles.emptyContainer">
    <myNavBar title="感谢关注" />
    <view class="empty" >
      感谢您的关注，该功能暂未开启
    </view>
  </view>
</template>
<script lang="ts" setup>
import {  ref } from 'vue';
import Taro from '@tarojs/taro';
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import Prelist from '@/components/postPreList/index.vue';
import { debounce } from 'lodash';
import { isPermissionsToWx } from '@/utils/index';
import { addOneImgFall } from '@/apis/rrb';

definePageConfig({
  disableScroll: true,
});



const prelistRef = ref();



const addMemoData = async (
  List: {
    status: number;
    name: string;
    path?: string;
    fullpath?: string;
    hash?: string;
  }[],
) => {
  // 数据格式化存储的内容
  List.forEach(async(item) => {
   await addOneImgFall({
    imgSrc: item.fullpath??'',
    tuser: 'rrb',
    cuser: 'wgg'
    });
  });
};

const postHttp = debounce(async () => {
  try {
    await addMemoData(await prelistRef.value.uploadOSS());
    Taro.showToast({
      title: '上传成功',
      icon: 'success',
      duration: 2000,
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1500);
  } catch (error) {
    Taro.showToast({
      title: '上传失败',
      icon: 'error',
      duration: 2000,
    });
  }
}, 500);

const handleAddAlbum = () => {

  Taro.showLoading({
    title: '上传中',
    mask: true,
  });
  postHttp();
  return false;
};



</script>
