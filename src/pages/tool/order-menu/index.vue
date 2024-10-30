<template>
  <scroll-view :class="styles.myContainer"  scroll-y="true" >
    <navbar title="菜单" >
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="菜单" />

    <nut-category :category="data.category" @change="change">
      <nut-category-pane :categoryChild="data.categoryChild" @on-change="onChange"> </nut-category-pane>
    </nut-category>
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
// import { ref, reactive, watch, onUnmounted } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';
import { reactive, onMounted } from 'vue';
import categoryData from './categoryData.json';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

useShareTimeline(() => ({
  title: '来点菜吧',
  path: '/pages/tool/order-menu/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));
useShareAppMessage(() => ({
  title: '来点菜吧',
  path: '/pages/tool/order-menu/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));

const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/tool/menu/index' });
};

const data = reactive({
  categoryInfo: {},
  category: [{}],
  categoryChild: [{}],
});

onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});

const getData = () => {
  console.log(categoryData);

  // fetch('//storage.360buyimg.com/nutui/3x/categoryData.js')
  //   .then((response) => response.json())
  //   .then((res) => {
  //     console.log(res);

      const { categoryInfo, categoryChild } = categoryData;
      data.categoryInfo = categoryInfo;
      data.category = categoryInfo.category;
      data.categoryChild = categoryChild;
  //   })
  //   .catch((err) => console.log('Oh, error', err));
};

const change = (index) => {
  data.categoryChild = [].concat(data.categoryInfo.category[index + 1].children);
};
const onChange = () => {
  console.log('当前分类数据');
};
</script>
