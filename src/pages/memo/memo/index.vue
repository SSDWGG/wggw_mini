<template>
  <view :class="styles.myContainer">
    <scroll-view v-if="account.memoDataList.length > 0" scroll-y="true" class="scrollList" @scroll="onScroll">
      <view v-for="(item, index) in account.memoDataList" :key="index" class="memoDataList">
        <view class="item">
          <view v-if="!!item.TimeLineList" class="aside">
            <view class="day">
              {{ item.TimeLineList[0] }}
            </view>
            <view class="mouse">
              {{ item.TimeLineList[1] }}
            </view>
          </view>
          <view class="main">
            <view class="content">{{ item.content }}</view>
            <view class="resourceList">
              <view v-for="(resItem, resItemIndex) in item.list" :key="resItemIndex" class="resourceListItem"
                @tap="toPreview(resItem.memoResId)">
                <!-- 判断是图片还是视屏，展示封面图 -->
                <image
                mode="aspectFit"
                :src="resItem.memoItemType === 1
                    ? resItem.videoPicUrl
                    : resItem.picUrl
                  " class="pic" :lazyLoad="true" />
                <!-- <image :src="resItem.picUrl" class="pic" /> -->
                <image v-if="resItem.memoItemType === 1" mode="aspectFill" class="vedioFlag" :lazyLoad="true"
                  src="@/assets/images/project/vedioPlay.png" />
              </view>
            </view>

            <view class="bottom">
              <view class="time">
                {{ timeFormat(item.createTime) }}
              </view>
              <view class="op">
                <view class="opItem add" @tap="editMemo(item)">编辑</view>
                <view class="opItem delete" @tap="deleteMemo(item.memoId)">删除</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-else class="defaultBox">
      <view class="img">
        <image src="@/assets/images/project/emptyDefault.png"></image>
      </view>
      <view class="img tips">快来记录第一个心情吧</view>
    </view>
    <view class="safeBottom"></view>
  </view>
  <side-bar :show="show" :showFlags="[5, 3]" />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import SideBar from '@/components/SideBar/index.vue';

import { useListScroll } from '@/components/scrollHooks/useListScroll';
import { useAccountStore } from '@/stores/account';
import Taro,{ useDidShow } from '@tarojs/taro';
import { timelineFormat, timeFormat } from '@/utils/date';
import { getMemoList } from '@/apis/memo';
import type { IMemo } from '@/apis/memo/model';
import cloneDeep from 'lodash/cloneDeep';

const account = useAccountStore();

const { show, onScroll } = useListScroll();

const initData = async () => {
  const res = await getMemoList({
    current: 1,
    pageSize: 100,
    uid: account.userInfo.openid,
  });

  res.forEach((item, index, arr) => {
    item.list = JSON.parse(item.list as unknown as string);
    const beforeItemTime = arr[index - 1]
      ? timelineFormat(arr[index - 1].createTime)
      : [];
    const nowItemTime = timelineFormat(item.createTime);
    if (
      beforeItemTime[0] === nowItemTime[0] &&
      beforeItemTime[1] === nowItemTime[1]
    ) {
      item.TimeLineList = [];
    } else {
      item.TimeLineList = nowItemTime;
    }
  });
  account.memoDataList = res;
};

const toPreview = (detailId: string) => {
  Taro.navigateTo({ url: `/pages/preview/index?detailId=${detailId}` });
};

const editMemo = (item:IMemo) => {
  account.editMemoData =  cloneDeep(item);
  Taro.navigateTo({ url: `/pages/memo/memo/post/index?type=${item.memoType==1?'video':'image'}&memoId=${item.memoId}` });
};

const deleteMemo = (memoId: string) => {
  Taro.showModal({
    content: '确定删除该条记录？',
    cancelColor: '#999999',
    confirmColor: '#7468F2 ',
    confirmText: '删除',
    success: async (res) => {
      if (res.confirm) {
        await account.removeMemoItem(memoId);
      }
    },
  });
};
useDidShow(async () => {

    initData();
});
</script>
