<template>
  <scroll-view :class="styles.myContainer" scroll-y="true">
    <navbar title="菜单">
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

    <nut-sku
      v-model:visible="notSell"
      :sku="data.sku"
      :goods="data.goods"
      :btnExtraText="btnExtraText"
      :btnOptions="['buy', 'cart']"
      @change-stepper="changeStepper"
      @select-sku="selectSku"
    >
      <template #sku-operate>
        <div class="sku-operate-box">
          <nut-button class="sku-operate-box-dis" type="warning">查看相似商品</nut-button>
          <nut-button class="sku-operate-box-dis" type="info">到货通知</nut-button>
        </div>
      </template>
    </nut-sku>
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
// import { ref, reactive, watch, onUnmounted } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';
import { ref, reactive, onMounted } from 'vue';
// import categoryData from './categoryData.json';
import skuData from './skuData.json';
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
  category: [{}],
  categoryChild: [{}],
  sku: [] as any,
  goods: {},
  firstCd: ['蔬菜🥬', '肉肉🥩', '海鲜🦞', '午饭不欢🍚', '汤🍲', '凉菜🥗', '早餐🍳', '甜点🍩', '水果🫐', '小食茶饮🥂', '外出大餐🍻', '特殊服务🦥', '打赏💰'],
});

onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});

const getData = () => {
  // const { categoryInfo } = categoryData;
  // data.category = categoryInfo.category;

  data.category = data.firstCd.map((firstCdItem) => ({
    catName: firstCdItem,
    showPic: true,
    showVideo: true,
    children: [
      {
        catName: '二级分类1',
        catType: 1,
        childCateList: [
          {
            backImg: 'https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg',
            catName: '商品1',
          },
        ],
      },
    ],
  }));

  data.categoryChild = data.category[0].children;

  const { Sku, Goods, imagePathMap } = skuData;
  data.sku = Sku;
  data.goods = Goods;
};

const change = (index) => {
  data.categoryChild = [...data.category[index].children];
};
const onChange = () => {
  console.log('当前分类数据');

  notSell.value = true;
};

const notSell = ref(false);

const btnExtraText = ref('抱歉，此商品在所选区域暂无存货');

// inputNumber 更改
const changeStepper = (count) => {
  console.log('购买数量', count);
};

// 切换规格类目
const selectSku = (ss) => {
  const { sku, skuIndex, parentSku, parentIndex } = ss;
  if (sku.disable) return false;
  data.sku[parentIndex].list.forEach((s) => {
    s.active = s.id == sku.id;
  });
  data.goods = {
    skuId: sku.id,
    price: '4599.00',
    imagePath: '//img14.360buyimg.com/n4/jfs/t1/216079/14/3895/201095/618a5c0cEe0b9e2ba/cf5b98fb6128a09e.jpg',
  };
};

// 底部操作按钮触发
const clickBtnOperate = (op) => {
  console.log('点击了操作按钮', op);
};
</script>
