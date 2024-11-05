<template>
  <scroll-view :class="styles.myContainer" scroll-y="true" @scroll="onScroll">
    <navbar title="菜单">
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .2)" :z-index="1" content="点菜" />

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
    <side-bar :show="show" :showFlags="[12]" />
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
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import sideBar from '@/components/SideBar/index.vue';


const { show, onScroll } = useListScroll();

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
  firstCd: [
    {
      firstCdId: '1',
      firstCdName: '蔬菜🥬',
    },
    {
      firstCdId: '2',
      firstCdName: '肉肉🥩',
    },
    {
      firstCdId: '3',
      firstCdName: '海鲜🦞',
    },
    {
      firstCdId: '4',
      firstCdName: '午饭不欢🍚',
    },
    {
      firstCdId: '5',
      firstCdName: '汤🍲',
    },
    {
      firstCdId: '6',
      firstCdName: '凉菜🥗',
    },
    {
      firstCdId: '7',
      firstCdName: '早餐🍳',
    },
    {
      firstCdId: '8',
      firstCdName: '甜点🍩',
    },
    {
      firstCdId: '9',
      firstCdName: '水果🫐',
    },
    {
      firstCdId: '10',
      firstCdName: '小食茶饮🥂',
    },
    {
      firstCdId: '11',
      firstCdName: '外出大餐🍻',
    },
    {
      firstCdId: '12',
      firstCdName: '特殊服务🦥',
    },
    {
      firstCdId: '13',
      firstCdName: '打赏💰',
    },
  ],
  secondCd: [
    {
      firstCdId: '1',
      secondCdId: '1q',
      secondCdName: '蔬菜1',
    },
    {
      firstCdId: '1',
      secondCdId: '1w',
      secondCdName: '蔬菜2',
    },
    {
      firstCdId: '2',
      secondCdId: '2q',
      secondCdName: '肉1',
    },
  ],
  cList: [
    {
      backImg: 'https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg',
      catName: '1q菜1',
      secondCdId: '1q',
    },
    {
      backImg: 'https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg',
      catName: '1q菜2',
      secondCdId: '1q',
    },
    {
      backImg: 'https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg',
      catName: '1w菜1',
      secondCdId: '1w',
    },
    {
      backImg: 'https://m.360buyimg.com/n2/jfs/t1/183517/38/7834/227702/60be1915Ed04664b0/eaf7536ab2c5f4b0.jpg',
      catName: '2q菜1',
      secondCdId: '2q',
    },
  ],
});

const getData = () => {
  // const { categoryInfo } = categoryData;
  // data.category = categoryInfo.category;

  data.category = data.firstCd.map((firstCdItem) => ({
    catName: firstCdItem.firstCdName,
    showPic: true,
    showVideo: true,
    children: data.secondCd.map((secondCdItem) => {
      if (secondCdItem.firstCdId === firstCdItem.firstCdId) {
        return {
          catName: secondCdItem.secondCdName,
          catType: 1,
          childCateList: data.cList.map((cItem) => {
            if (cItem.secondCdId === secondCdItem.secondCdId) {
              return cItem;
            }
          }).filter(item=>!!item),
        };
      }
    }).filter(item=>!!item),
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

onMounted(() => {
  getData();
});
</script>
