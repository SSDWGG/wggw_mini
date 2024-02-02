<template>
  <scroll-view :class="styles.myContainer" class="pageIn" v-if="data.showPage" @scroll="onScroll" scroll-y="true">
    <navbar :title="pageTitle" background-color="rgba(116, 104, 242,.1)">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </navbar>

    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" v-if="chooseItem?.title" :z-index="1" :content="chooseItem?.title" />
    <side-bar
      :show="show"
      :showFlags="[1, 3]"
      :onbiddingLineButtonBack="
        () => {
          data.popVisable = true;
        }
      "
    />

    <view class="imgDiv">
      <image mode="aspectFit" :src="item?.picUrl" class="img" v-for="(item, index) in chooseItem?.imgSrc" :key="index"></image>
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="desc">
      {{ chooseItem?.kcDesc }}
    </view>

    <chartLine
      :chooseItem="chooseItem"
      :orginData="data.priceLine"
      @gx="
        () => {
          init();
        }
      "
      @bj="handlebj"
    ></chartLine>

    <update-pop
      type="number"
      v-model:modelValue="data.popVisable"
      v-model:inputValue="data.popInputValue"
      title="添加报价（￥）"
      placeholder="添加价格（￥）"
      @ok="handlePopOK"
      :max="1000"
    />
  </scroll-view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import { Navbar } from '@fishui/taro-vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useShareAppMessage, useShareTimeline, useRouter, switchTab, useDidShow } from '@tarojs/taro';
import { changeLongStr } from '@/utils/index';
import chartLine from './chartLine.vue';
import { addKunChartLine, getKunCharOne, getKunChartLineList } from '@/apis/kunChart';
import UpdatePop from '@/components/pop/updatePop/index.vue';
import { useAccountStore } from '@/stores/account';
import { IPriceLineItem } from '@/apis/kunChart/model';
import myToastComponents from '@/components/myToast/index.vue';
import { debounce } from 'lodash';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const myToast = ref<any>();

const router = useRouter();

const pageTitle = ref('');

const account = useAccountStore();

const { show, onScroll } = useListScroll();

const data = reactive({
  showPage: true,
  popVisable: false,
  popInputValue: '',
  priceLine: [] as IPriceLineItem[],
});

let chooseItem = ref();

const handlebj =  debounce( async () => {
  // 彩蛋判断是否是kun
  if (!!chooseItem.value.isKun) {
    myToast.value.myToastShow({
      icon: 'error',
      title: `坤之守护大笑着现身，“没有人可以定义我坤！老天爷也不行！” 随后发动技能 ‘无懈可击：不接受其余人任何定义，但坤会损失912.5点价值’，随后坤之守护渐渐消失。 `,
      duration: 5000,
    });
    await addKunChartLine({
      shopId: chooseItem.value.shopId,
      openid: chooseItem.value.openid,
      username: '坤之守护者',
      price: `${Number(data.priceLine[data.priceLine.length-1].price)- 912.5}`,
    });
    init();
  } else {
    data.popVisable = true;
  }
}
,1000, { leading: true, trailing: false })

const init = async () => {
  getKunChartLineList({ shopId: router.params.shopId as string }).then((res) => {
    data.priceLine = res;
  });

  getKunCharOne({ shopId: router.params.shopId as string }).then((res) => {
    chooseItem.value = res;
    pageTitle.value = changeLongStr(chooseItem.value.title, 6, true) + '价格';
    chooseItem.value.imgSrc = JSON.parse(chooseItem.value.imgSrc);
  });
};

useDidShow(() => {
  init();
});

const handlePopOK = async () => {
  await addKunChartLine({
    shopId: router.params.shopId as string,
    openid: account.userInfo.openid,
    username: account.userInfo.username,
    price: data.popInputValue,
  });
  init();
};

useShareTimeline(() => {
  return {
    title: '~WGGW~',
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
  };
});
useShareAppMessage(() => {
  return {
    title: '~WGGW~',
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg',
  };
});
const goHomePage = () => {
  switchTab({ url: '/pages/index/index' });
};
</script>
