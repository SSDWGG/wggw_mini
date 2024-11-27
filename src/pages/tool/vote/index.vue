<template>
  <scroll-view :class="styles.myContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
    <myNavBar title="投票" background-color="transparent">
      <template v-if="!!router.params.isShare" #left>
        <view style="padding: 6px 20px" @tap="goHomePage">
          <IconFont name="home" size="20" />
        </view>
      </template>
    </myNavBar>
    <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="vote" />
     <view class="tipGameR"> 您的投票列表 </view>
    <!-- 投票区 -->

    <view class="menu" :style="{ height }">
      <view v-for="item in data.voteList" :key="item.voteId" class="menu-item"  @tap="open(item)">
        <view class="title">
          {{ item.title }}
        </view>
        <image class="bgImg" mode="aspectFill" :src="JSON.parse(item.imgSrc)[0].picUrl" />
      </view>
      <nut-empty v-show="data.voteList.length===0"></nut-empty>
    </view>

    <!-- 投票结果提示区 -->

    <!-- toast提示 -->
    <my-toast-components ref="myToast" :duration="2500" />
    <side-bar :show="show" :showFlags="[10]" :onCreateVoteButton="handleVoteCreate" />

    <view class="tooLowDiv"> </view>
  </scroll-view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { ref, reactive, computed } from 'vue';
import myNavBar from '@/components/my-nav-bar/index.vue';
import myToastComponents from '@/components/myToast/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import Taro, { useDidShow, useShareAppMessage, useShareTimeline, useRouter } from '@tarojs/taro';
import sideBar from '@/components/SideBar/index.vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { getVoteList } from '@/apis/vote';
import { useAccountStore } from '@/stores/account';
import type { IVoteItem } from '@/apis/vote/model';

const systemInfo = useSystemInfoStore();

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const { show, onScroll } = useListScroll();

const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

const myToast = ref<any>();
const router = useRouter();
const account = useAccountStore();

const data = reactive({
  voteList: [] as IVoteItem[],
});

const getInitData = async () => {
  await account.login();
  data.voteList = await getVoteList({
    current: 1,
    pageSize: 10,
    openid: account.userInfo.openid,
  });
  console.log(data.voteList);
};

useDidShow(() => {
  getInitData();
});

useShareTimeline(() => ({
  title: '邀请你投票~',
  path: '/pages/tool/vote/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));
useShareAppMessage(() => ({
  title: '邀请你投票~',
  path: '/pages/tool/vote/index?isShare=true',
  imageUrl: imgDefaultSrc,
}));

const goHomePage = () => {
  Taro.redirectTo({ url: '/pages/tool/menu/index' });
};
const handleVoteCreate = () => {
  Taro.navigateTo({ url: '/pages/tool/vote/post/index?type=image' });
};

const open = (item) => {
  Taro.navigateTo({
    url: `/pages/tool/vote/detail/index?voteId=${item.voteId}`,
  });
};
</script>
