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
    <side-bar :show="show" :showFlags = [8,1,3] :onbiddingLineButtonBack = '()=>{
      data.popVisable  =true
    }'/>

    <view class="imgDiv">
      <image mode="aspectFit" :src=item?.picUrl class="img" v-for="(item ,index) in chooseItem?.imgSrc" :key="index"></image>
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="desc">
      {{ chooseItem?.kcDesc }}
    </view>

    <chartLine  :chooseItem="chooseItem"  :orginData = data.priceLine @gx="()=>{init()}" @bj="()=>{data.popVisable  = true}"></chartLine>

    <update-pop
      type="number"
      v-model:modelValue="data.popVisable"
      v-model:inputValue="data.popInputValue"
      title="添加报价（￥）"
      placeholder="添加价格（￥）"
      @ok="handlePopOK"
      :max="1000"
    > </update-pop>


  </scroll-view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { reactive, ref } from "vue";
import { Navbar } from "@fishui/taro-vue";
import sideBar from "@/components/SideBar/index.vue";
import { useListScroll } from "@/components/scrollHooks/useListScroll";
import {
  useShareAppMessage,
  useShareTimeline,
  useRouter,
  switchTab,
  useDidShow,
} from "@tarojs/taro";
import { changeLongStr } from "@/utils/index";
import chartLine from './chartLine.vue'
import { addKunChartLine, getKunCharOne, getKunChartLineList } from "@/apis/kunChart";
import UpdatePop from "@/components/pop/updatePop/index.vue";
import { useAccountStore } from '@/stores/account';
import { IPriceLineItem } from "@/apis/kunChart/model";

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const router = useRouter();

const pageTitle = ref("");

const account = useAccountStore();


const { show, onScroll } = useListScroll();


const data = reactive({
  showPage: true,
  popVisable:false,
  popInputValue:'',
  priceLine:[] as IPriceLineItem[]
});

let chooseItem = ref();


const init = async() => {  
  getKunChartLineList({ shopId: router.params.shopId as string }).then(res=>{
    data.priceLine  = res
  })

  getKunCharOne({ shopId: router.params.shopId as string }).then(res=>{
    chooseItem.value  = res
    pageTitle.value = changeLongStr(chooseItem.value.title, 6, true) + "价格";
    chooseItem.value.imgSrc = JSON.parse(chooseItem.value.imgSrc)
  })
  
};


useDidShow(() => {
  init();
});

const handlePopOK = async ()=>{
 await addKunChartLine(
  {
    shopId: router.params.shopId as string,
    openid: account.userInfo.openid,
    username: account.userInfo.username,
    price: data.popInputValue
  }
)
init();
}



useShareTimeline(() => {
  return {
    title: "守护最好的坤~",
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
useShareAppMessage(() => {
  return {
    title: "守护最好的坤~",
    path: `/pages/bidding/detail/index?shopId=${router.params.shopId}`,
    imageUrl:
      "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/MSI/HHHNOCBG-1702544256738kun.jpeg",
  };
});
const goHomePage = () => {
  switchTab({ url: "/pages/index/index" });
};
</script>
