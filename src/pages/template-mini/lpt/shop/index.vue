<template>
  <!-- 内容物 -->
  <scroll-view :class="styles.myContainer" scroll-y="true" @scroll="onScroll">
    <!-- navbar -->
    <navbar title="mall">
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="旅拍通" />
    <view class="addressTitle"> 天台山风景区 </view>
    <nut-swiper :init-page="2" :auto-play="3000" pagination-visible pagination-color="#426543" pagination-unselected-color="#808080" class="mySwiper">
      <nut-swiper-item v-for="(item, index) in data.swiperList" :key="index" style="height: 150px">
        <img :src="item.imgUrl" mode="widthFit" alt="" style="height: 100%; width: 100%" draggable="false" />
      </nut-swiper-item>
    </nut-swiper>

    <nut-noticebar right-icon="circle-close" background="transparent" color="#000" :speed="35">
      {{ data.noticebarContent }}
    </nut-noticebar>

    <view class="moreContent">
      <view class="title">
        <view class="txt"> 景点展示 </view>
        <view class="iconContent">
          更多
          <image src="../img/arrow.png" />
        </view>
      </view>

      <view class="moreMain scenery">
        <nut-cell v-for="(item, index) in data.sceneryItemList" :key="index" class="sceneryItem">
          <image :src="imgHostLpt + '/' + item.pic" />
          <view class="title">
            {{ item.name }}
          </view>
        </nut-cell>
      </view>
    </view>
    <view class="menuContent">
      <view class="item vistor"> 游客照片 </view>
      <view class="item photographer"> 摄影师核销 </view>
    </view>

    <view class="moreContent">
      <view class="title">
        <view class="txt"> 拍照服务 </view>
        <view class="iconContent">
          更多
          <image src="../img/arrow.png" />
        </view>
      </view>

      <view class="moreMain prodList">
        <nut-cell v-for="item in data.ticketList" :key="item.prodId" class="prod" @tap="handleClickCategoryPane(item)">
          <image :src="item.pic" />
          <view class="info">
            <view class="line1">
              {{ item.prodName }}
            </view>
            <view class="line2"> 售价： ￥{{ item.price }} </view>
            <view class="line3"> 不含门票 </view>
          </view>
        </nut-cell>
      </view>
    </view>
    <!-- sku -->
    <nut-sku
      v-model:visible="data.customStepper"
      :sku="data.sku"
      :goods="data.goods"
      :stepperMax="1"
      :stepperMin="1"
      :stepperExtraText="stepperExtraText"
      @change-stepper="changeStepper"
      @over-limit="overLimit"
      @select-sku="selectSku"
    >
      <!-- <template #sku-stepper>
        <view class="numContent">
          <view class="tip">
            商品数量
          </view>
          <view class="num">
            1件
          </view>
        </view>

      </template> -->
      <template #sku-stepper-bottom>
        <view class="descHtml">
          <view class="detail"> 商品详情 </view>
          <rich-text :nodes="data.descHtml" />
        </view>
      </template>

      <template #sku-operate>
        <div class="sku-operate-box">
          <nut-button class="sku-operate-item" shape="square" open-type="contact" type="warning">联系客服</nut-button>
          <nut-button class="sku-operate-item" shape="square" type="primary" @tap="clickBtnOperate">立即购买</nut-button>
        </div>
      </template>
    </nut-sku>
  </scroll-view>
  <!-- tabbar -->
  <myTabBar></myTabBar>
  <!-- 提示组件 -->
  <my-toast-components ref="myToast" :duration="2500" />
  <!-- 侧边栏 -->
  <side-bar :show="show" :showFlags="[]" />
</template>

<script lang="ts" setup>
import { Navbar } from '@fishui/taro-vue';
// @ts-ignore
import styles from './styles.scss';
import myTabBar from '../custom-tab-bar/index';
import { reactive, ref } from 'vue';
import { getIndexImgs } from '@/apis/lpt/mine';
import Taro, { useDidShow } from '@tarojs/taro';
import { getPageProdList, getSceneryItemPage, getPageProdDetail } from '@/apis/lpt/shop';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import myToastComponents from '@/components/myToast/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { imgHostLpt } from '@/utils/env';
import { debounce } from 'lodash';

const { show, onScroll } = useListScroll();
const myToast = ref<any>();

const data = reactive({
  swiperList: [] as any,
  noticebarContent: '欢迎使用旅拍通，欢迎来到天台山风景区。天台山的自然景观尤其的独厚风韵。天台山在浙江这块土地上独领着属于他的风骚。',
  ticketList: [] as any,
  sceneryItemList: [] as any,
  customStepper: false,
  goods: {} as any,
  sku: [] as any,
  descHtml: '',
});

const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/template-mini/menu/index' });
};

const handleClickCategoryPane = async (val) => {
  const res = await getPageProdDetail({
    prodId: val.prodId,
  });
  data.sku = [
    {
      id: 1,
      name: '可选规格',
      list: res.skuList.map((item) => ({
        ...val,
        ...item,
        id: item.skuId,
        active: false,
        disable: !item.stocks,
        name: item.skuName,
      })),
    },
  ];

  data.descHtml = res.content;

  selectSku({ sku: data.sku[0].list[0], parentIndex: 0 });
  data.customStepper = true;
};

const stepperExtraText = () => '<div style="width:100%;text-align:right;color:#F00">单笔订单限购买一张</div>';
// inputNumber 更改
const changeStepper = (count) => {
  console.log('购买数量', count);
};

// inputNumber 极限值
const overLimit = (val) => {
  if (val.action === 'reduce') {
    myToast.value.myToastShow({
      icon: 'error',
      title: `至少买${val.value}件哦`,
      duration: 2000,
    });
  } else {
    myToast.value.myToastShow({
      icon: 'error',
      title: `最多买${val.value}件哦`,
      duration: 2000,
    });
  }
};
const selectSku = (ss) => {
  const { sku, parentIndex } = ss;
  if (sku.disable) return false;
  data.sku[parentIndex].list.forEach((s) => {
    s.active = s.id === sku.id;
  });
  data.goods = {
    ...sku,
    skuId: sku.skuId,
    price: sku.price,
    imagePath: sku.pic,
  };
};

const getSwiperList = async () => {
  data.swiperList = await getIndexImgs();
};

const getTicketProdList = async () => {
  const res = await getPageProdList({
    categoryId: '107',
    current: 0,
    size: 10,
  });
  data.ticketList = res.records;
};

const getSceneryItemList = async () => {
  const res = await getSceneryItemPage({
    current: 1,
    size: 10,
  });
  data.sceneryItemList = res.records;
};

// 底部操作按钮触发
const clickBtnOperate = debounce(
  () => {
    myToast.value.myToastShow({
      icon: 'success',
      title: '支付成功~~~',
      duration: 3000,
    });
    setTimeout(() => {
      // Taro.redirectTo({ url: '/pages/order/index' });
    }, 2000);
  },
  3000,
  { leading: true, trailing: false },
);

useDidShow(() => {
  // 获取景点列表
  getSceneryItemList();
  // 获取轮播图
  getSwiperList();
  // 获取旅拍票商品
  getTicketProdList();
});
</script>
