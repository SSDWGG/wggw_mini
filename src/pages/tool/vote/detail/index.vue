<template>
  <myNavBar :fixed="false" :title="pageTitle" background-color="rgba(116, 104, 242, 0.2)">
    <template v-if="!!router.params.isShare" #left>
      <view style="padding: 6px 20px" @tap="goHomePage">
        <IconFont name="home" size="20" />
      </view>
    </template>
  </myNavBar>
  <scroll-view v-if="data.showPage" :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <nut-watermark v-if="chooseItem?.title" :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" :content="chooseItem?.title" />
    <side-bar
      :show="show"
      :showFlags="[1]"
      :onbiddingLineButtonBack="
        () => {
          data.popVisable = true;
        }
      "
    />

    <view class="imgDiv">
      <image v-for="(item, index) in chooseItem?.imgSrc" :key="index" mode="widthFix" :src="item?.picUrl" class="img"></image>
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="desc">
      {{ chooseItem?.voteDesc }}
    </view>

    <view v-if="chooseItem?.chooseMapResList" class="btnGroup">
      <nut-animate v-for="(item, index) in chooseItem.chooseMapResList" :key="index" type="breath" class="rule-button-div" loop>
        <nut-button block type="primary" class="publish">{{ item }}</nut-button>
      </nut-animate>
    </view>
  </scroll-view>
  <view v-if="account.userInfo?.openid === chooseItem?.openid && !router.params.isShare" :class="styles.btnBox">
    <nut-button block type="primary" class="btn" @tap="handleDeleteVote">删除这个投票</nut-button>
  </view>
  <!-- toast提示 -->
  <my-toast-components ref="myToast" :duration="2500" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { reactive, ref } from 'vue';
import myNavBar from '@/components/my-nav-bar/index.vue';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useShareAppMessage, useShareTimeline, useRouter, switchTab, useDidShow } from '@tarojs/taro';
import { changeLongStr } from '@/utils/index';
import { useAccountStore } from '@/stores/account';
import type { IPriceLineItem } from '@/apis/kunChart/model';
import myToastComponents from '@/components/myToast/index.vue';
import { debounce } from 'lodash';
import { cdnHost, ossFilePrePath } from '@/utils/env';
import { deleteVoteByVoteId, getVoteOne } from '@/apis/vote';
import Taro from '@tarojs/taro';

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

const chooseItem = ref();

const init = async () => {
  await account.login();
  const res = await getVoteOne({ voteId: router.params.voteId as string });
  chooseItem.value = res;
  pageTitle.value = `${changeLongStr(chooseItem.value.title, 6)}的投票`;
  chooseItem.value.imgSrc = JSON.parse(chooseItem.value.imgSrc);
  chooseItem.value.chooseMapResList = chooseItem.value.chooseMap.match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g);
};

const handleDeleteVote = async () => {
  await deleteVoteByVoteId({ voteId: router.params.voteId as string });
  Taro.navigateTo({
    url: '/pages/tool/vote/index',
  });
};

useDidShow(() => {
  init();
});

useShareTimeline(() => ({
  title: '快来投票~',
  path: `/pages/tool/vote/detail/index?voteId=${router.params.voteId}&isShare=true`,
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));
useShareAppMessage(() => ({
  title: '快来投票~',
  path: `/pages/tool/vote/detail/index?voteId=${router.params.voteId}&isShare=true`,
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));
const goHomePage = () => {
  switchTab({ url: '/pages/index/index' });
};
</script>
