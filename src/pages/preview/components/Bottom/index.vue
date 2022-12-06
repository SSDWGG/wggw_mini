<template>
  <view :class="styles.bottom">
    <view class="userInfo">
      <view>
        <image :src="itemInfo.avatarurl" class="avatar" @tap="toUserMain" />
      </view>
      <view class="nick" @tap="toUserMain">{{ itemInfo.nick }}</view>
    </view>
    <view class="content">{{ showContent }}</view>
  </view>
</template>
<script lang="ts" setup>
import { changeLongStr } from '@/utils/index';
import styles from './styles.scss';
import { useAttrs } from 'vue';
import Taro from '@tarojs/taro';


const props = defineProps({
  itemInfo: {
    type: Object,
    default: {}
  }
});

const info = useAttrs();
const toUserMain = () => {
  // 分享的跳转到该人主页，不是则返回上一页
  info.isShare ? Taro.navigateTo({ url: `/pages/album/friend/index?id=${props.itemInfo.creatorId}` })
    : Taro.navigateBack();
};

const showContent = changeLongStr(props.itemInfo.content);
</script>
