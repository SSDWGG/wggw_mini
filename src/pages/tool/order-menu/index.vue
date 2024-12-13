<template>
  <scroll-view :class="styles.myContainer" scroll-y="true" @scroll="onScroll">
    <myNavBar :title="data.menuUserName ? data.menuUserName + '的菜谱' : '菜谱'">
      <template #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </myNavBar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .2)" :z-index="1" content="点菜" />

    <nut-category v-if="data.category.length > 0" :category="data.category" @change="change">
      <nut-category-pane :categoryChild="data.categoryChild" @on-change="onChange"> </nut-category-pane>
    </nut-category>
    <nut-empty v-else description="您还没有创建菜单~"></nut-empty>

    <nut-sku
      v-model:visible="data.skuShow"
      :sku="data.sku"
      :goods="data.goods"
      :btnOptions="['confirm']"
      :stepperMax="10"
      :stepperMin="1"
      stepper-title="下单数量"
      @change-stepper="changeStepper"
    >
      <template #sku-header-price>
        <view class="goodsTitle">
          <view> {{ data.goods.catName }} </view>
        </view>
      </template>
      <template #sku-stepper-bottom>
        <nut-cell class="bz">
          <nut-textarea
            v-model="data.goodsBz"
            placeholder="请输入您的用餐备注"
            limit-show
            :max-length="50"
            :autosize="{ maxHeight: 150, minHeight: 60 }"
          ></nut-textarea>
        </nut-cell>
        <view v-if="!!data.goods.content" class="descHtml">
          <view class="detail"> 菜品详情 </view>
          <image
            v-for="(item, index) in JSON.parse(data.goods.content)"
            :key="index"
            mode="widthFix"
            :src="item.picUrl"
            @tap="
              () => {
                data.previewInitNo = index;
                data.showPreview = true;
              }
            "
          />
        </view>
      </template>
      <template #sku-operate>
        <div class="sku-operate-box">
          <share-view> </share-view>
        </div>
      </template>
    </nut-sku>
    <!-- -->
    <side-bar v-if="!router.params.isShare" :show="show" :showFlags="[12,13 ]" />
  </scroll-view>
  <nut-image-preview
    v-if="!!data.goods.content"
    :show="data.showPreview"
    :images="previewImgList"
    :init-no="data.previewInitNo"
    pagination-visible
    pagination-color="red"
    @close="
      () => {
        data.showPreview = false;
      }
    "
    @long-press="
      (image) => {
        Taro.getImageInfo({
          src: image.src,
          success: (res) => {
            Taro.saveImageToPhotosAlbum({
              filePath: res.path,
              success: () => {
                Taro.showToast({
                  title: '保存成功',
                });
              },
            });
          },
        });
      }
    "
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import myNavBar from '@/components/my-nav-bar/index.vue';
import Taro, { useDidShow, useRouter, useShareAppMessage, useShareTimeline } from '@tarojs/taro';
import { computed, reactive } from 'vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import sideBar from '@/components/SideBar/index.vue';
import { getCmenuByCid, getCmenuList, getFmenuList, getSmenuList } from '@/apis/orderMenu';
import { useAccountStore } from '@/stores/account';
import shareView from '@/components/button/shareView/index.vue';
import type { ICmenuItem } from '@/apis/orderMenu/model';

const { show, onScroll } = useListScroll();
const router = useRouter();

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const account = useAccountStore();

useShareTimeline(() => ({
  title: `${account.userInfo.username}向您发送了一份菜谱~`,
  path: `/pages/tool/order-menu/index?isShare=true&shareOpenId=${data.paramsOpenId}&menuUserName=${account.userInfo.username}`,
  imageUrl: account.userInfo.avatarurl,
}));
useShareAppMessage(() => ({
  title: `${account.userInfo.username}向您点了一道菜~`,
  path: `/pages/tool/order-menu/index?isShare=true&shareOpenId=${data.paramsOpenId}&cCdId=${data.cCdId}&goodsBz=${data.goodsBz}&menuUserName=${account.userInfo.username}`,
  imageUrl: data.goods.backImg,
}));

const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/tool/menu/index' });
};

const previewImgList = computed(() =>
  JSON.parse(data.goods.content).map((item) => {
    item.src = item.picUrl;
    return item;
  }),
);

const data = reactive({
  category: [] as any,
  categoryChild: [] as any,
  sku: [] as any,
  goods: {} as any,
  skuShow: false,
  goodsBz: '',
  paramsOpenId: '',
  cCdId: '',
  menuUserName: '',
  showPreview: false,
  previewInitNo: 0,
});

const getData = async () => {
  const resFmenu = await getFmenuList(data.paramsOpenId);
  const resSmenu = await getSmenuList(data.paramsOpenId);
  const resCmenu = await getCmenuList(data.paramsOpenId);

  data.category = resFmenu.map((firstCdItem) => ({
    catName: firstCdItem.firstCdName,
    showPic: true,
    showVideo: true,
    children: resSmenu
      .map((secondCdItem) => {
        if (secondCdItem.firstCdId === firstCdItem.firstCdId) {
          return {
            catName: secondCdItem.secondCdName,
            catType: 1,
            childCateList: resCmenu
              .map((cItem) => {
                if (cItem.secondCdId === secondCdItem.secondCdId) {
                  return cItem;
                }
              })
              .filter((item) => !!item),
          };
        }
      })
      .filter((item) => !!item),
  }));

  data.categoryChild = data.category[0].children;
};

const change = (index) => {
  data.categoryChild = [...data.category[index].children];
};

const onChange = (item: ICmenuItem) => {
  data.skuShow = true;
  data.goods = item;
  data.goods.skuId = item.cCdId;
  data.cCdId = item.cCdId;
  data.goods.price = 123;
  data.goods.imagePath = item.backImg;
  data.goodsBz = '';
};

// inputNumber 更改
const changeStepper = (count) => {
  console.log('购买数量', count);
};

useDidShow(async () => {
  await account.login();
  data.paramsOpenId = router.params.shareOpenId ?? account.userInfo.openid;
  getData();
  data.menuUserName = router.params.menuUserName ?? '';
  if (router.params.cCdId) {
    const res = await getCmenuByCid(router.params.cCdId);
    console.log(9999, res);
    if (res.length > 0) {
      onChange(res[0]);
      data.goodsBz = router.params.goodsBz ?? '';
    }
  }
});
// isShare=true&shareOpenId=on2kW41eTcB8XT4x2QmE1uKyg7Dg&cCdId=1856642650820677633&goodsBz=不要辣椒&menuUserName=away
</script>
