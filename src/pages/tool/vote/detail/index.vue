<template>
  <myNavBar :fixed="false" :title="pageTitle" background-color="rgba(116, 104, 242, 0.2)">
    <template v-if="!!router.params.isShare" #left>
      <view style="padding: 6px 20px" @tap="goHomePage">
        <IconFont name="home" size="20" />
      </view>
    </template>
  </myNavBar>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <nut-watermark v-if="chooseItem?.title" :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" :content="chooseItem?.title" />
    <side-bar :show="show" :showFlags="[1]" />

    <view class="imgDiv">
      <image v-for="(item, index) in chooseItem?.imgSrc" :key="index" mode="widthFix" :src="item?.picUrl" class="img"></image>
    </view>
    <view class="title">
      {{ chooseItem?.title }}
    </view>
    <view class="desc">
      {{ chooseItem?.voteDesc }}
    </view>

    <view v-if="data.isOver" class="overTip"> 本次投票已结束 </view>
    <view v-else>
      <view v-if="chooseItem?.chooseMapResList" class="btnGroup">
        <nut-animate v-for="(item, index) in chooseItem.chooseMapResList" :key="index" type="breath" class="rule-button-div" :loop="!data.isChoose">
          <nut-button block type="primary" class="publish" :disabled="data.isChoose" @tap="data.isChoose ? tipAlreadyChoose() : addVote(item)">{{
            item
          }}</nut-button>
        </nut-animate>
      </view>
    </view>

    <!-- 信息展示区 -->
    <view v-if="data.isOver || data.isChoose" class="infoDiv">
      <view class="infoDivTitle"> 本轮共有{{ data.voteHistoryList.length }}人投票 </view>
      <view v-for="(value, key) in data.voteInfoObj" :key="key" class="infoItem">
        <span class="infoItemTitle"> {{ key }}: </span>
        <span class="infoItemProgress">
          <nut-progress
            text-inside
            :percentage="((value * 100) / data.voteHistoryList.length).toFixed(2)"
            stroke-color="linear-gradient(270deg, rgba(18,126,255,1) 0%,rgba(32,147,255,1) 32.815625%,rgba(13,242,204,1) 100%)"
            status="active"
          />
        </span>
      </view>
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
import Taro, { useShareAppMessage, useShareTimeline, useRouter, switchTab, useDidShow } from '@tarojs/taro';
import { changeLongStr } from '@/utils/index';
import { useAccountStore } from '@/stores/account';
import myToastComponents from '@/components/myToast/index.vue';
import { debounce } from 'lodash';
import { cdnHost, ossFilePrePath } from '@/utils/env';
import { addVoteHistory, deleteVoteByVoteId, getVoteHistoryListByOpenidAndVoteId, getVoteHistoryListByVoteId, getVoteOne } from '@/apis/vote';
import type { IVoteChooseItem } from '@/apis/vote/model';

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
  // 当前人是否已经投过票
  isChoose: false,
  // 当前人投的拍哦内容
  userChooseVoteInfo: {} as unknown as IVoteChooseItem,
  // 该投票的票合集
  voteHistoryList: [] as IVoteChooseItem[],
  // 该投票的统计信息
  voteInfoObj: {},
  // 该投票是否结束
  isOver: false,
});

const chooseItem = ref();

const init = async () => {
  try {
    // 获取当前人身份信息
    await account.login();
    // 获取投票信息
    chooseItem.value = await getVoteOne({ voteId: router.params.voteId as string });
    pageTitle.value = `${changeLongStr(chooseItem.value.title, 6)}的投票`;
    chooseItem.value.imgSrc = JSON.parse(chooseItem.value.imgSrc);
    chooseItem.value.chooseMapResList = chooseItem.value.chooseMap.match(/[\u4e00-\u9fa5a-zA-Z0-9]+/g);

    // 获取当前人的投票信息
    const voteHistoryRes = await getVoteHistoryListByOpenidAndVoteId({
      current: 1,
      pageSize: 100,
      openid: account.userInfo.openid,
      voteId: router.params.voteId as string,
    });

    if (voteHistoryRes.length > 0) {
      data.isChoose = true;
      data.userChooseVoteInfo = voteHistoryRes[0];
    } else {
      data.isChoose = false;
    }

    // 该投票的票合集
    data.voteHistoryList = await getVoteHistoryListByVoteId({
      current: 1,
      pageSize: 100,
      voteId: router.params.voteId as string,
    });

    data.voteHistoryList.forEach((item) => {
      if (data.voteInfoObj[item.choose] === undefined) {
        data.voteInfoObj[item.choose] = 1;
      } else {
        data.voteInfoObj[item.choose]++;
      }
    });

    // 规则： 按照投票人数截止
    if (chooseItem.value.voteType === 0) {
      if (chooseItem.value.voteMaxNum <= data.voteHistoryList.length) {
        data.isOver = true;
      }
    }
  } catch (error) {
    Taro.navigateTo({
      url: '/pages/tool/vote/index',
    });
  }
};

const tipAlreadyChoose = () => {
  myToast.value.myToastShow({
    icon: 'error',
    title: `您已经投过票了~，您的选择是：${data.userChooseVoteInfo.choose}`,
    duration: 2000,
  });
};

const handleDeleteVote = async () => {
  await deleteVoteByVoteId({ voteId: router.params.voteId as string });
  Taro.navigateTo({
    url: '/pages/tool/vote/index',
  });
};

const addVote = debounce(
  async (chooseVote: string) => {
    await addVoteHistory({
      voteId: router.params.voteId,
      openid: account.userInfo.openid,
      username: account.userInfo.username,
      choose: chooseVote,
    });
    myToast.value.myToastShow({
      icon: 'success',
      title: '您已投票成功~',
      duration: 2000,
    });

    init();
  },
  3000,
  { leading: true, trailing: false },
);

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
