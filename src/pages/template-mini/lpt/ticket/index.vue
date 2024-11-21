<!-- eslint-disable vue/v-on-event-hyphenation -->
<template>
  <myNavBar title="商城" />
  <view :class="styles.container">
    <nut-category :category="data.category" @change="changeCategory">
      <nut-category-pane :categoryChild="data.categoryChild" @onChange="handleClickCategoryPane"> </nut-category-pane
    ></nut-category>

    <nut-sku
      v-model:visible="data.customStepper"
      :sku="data.sku"
      :goods="data.goods"
      :stepperMax="1"
      :stepperMin="1"
      :stepperExtraText="stepperExtraText"
      @changeStepper="changeStepper"
      @overLimit="overLimit"
      @selectSku="selectSku"
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
    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
  </view>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import myNavBar from '@/components/my-nav-bar/index.vue';
// @ts-ignore
import styles from './styles.scss';
import { getCategoryInfoList, getPageProdList, getPageProdDetail, postSubmitOrder, postOrderPay, postOrderConfirm } from '@/apis/lpt/shop';
import type { ICategoryInfoItem } from '@/apis/lpt/shop/model';
import myToastComponents from '@/components/myToast/index.vue';
import { debounce } from 'lodash';

const data = reactive({
  category: [] as ICategoryInfoItem[],
  categoryChild: [] as any,
  customStepper: false,
  sku: [] as any,
  goods: {} as any,
  descHtml: '',
});

const myToast = ref<any>();

// 分类商品
const getData = async () => {
  data.category = await getCategoryInfoList();
  data.category.forEach((item) => {
    item.catName = item.categoryName;
  });
  getCategoryDetailById(data.category[0]);
};
getData();

const getCategoryDetailById = async (categoryItem: ICategoryInfoItem) => {
  const res = await getPageProdList({
    categoryId: categoryItem.categoryId,
    current: 0,
    size: 100,
  });

  res.records.forEach((item) => {
    item.catName = item.prodName;
    item.backImg = item.pic;
  });

  data.categoryChild = [
    {
      catName: categoryItem.catName,
      catType: 1,
      childCateList: [],
    },
  ];

  data.categoryChild[0].childCateList = res.records;
};

const changeCategory = (index) => {
  console.log('点击分类切换', index);
  getCategoryDetailById(data.category[index]);
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

// sku

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

// 底部操作按钮触发
const clickBtnOperate = debounce(
  () => {
    myToast.value.myToastShow({
      icon: 'success',
      title: '支付成功~~~',
      duration: 3000,
    });
    setTimeout(() => {
      data.customStepper = false;
    }, 2000);
  },
  3000,
  { leading: true, trailing: false },
);
</script>
