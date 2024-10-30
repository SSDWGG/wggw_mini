<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <swiper-item :class="styles.swiperItem">
    <view class="content-div" @tap="handleClickItem(data.info)">
      <!-- 内容不在dom中缓存，以减小渲染压力和首屏渲染时间 -->
      <view v-if="props.ShowVirtualFlag" class="content-info">
        <!-- 图片 -->
        <image  :src="ossImgHostLpt+data.info.pic" class="img" mode="aspectFit"></image>

      </view>
      <!-- 侧边栏  -->
      <side-bar
        :itemInfo="data.info"
        v-bind="$attrs"
      />
      <!-- 底部 -->
      <bottom
        :itemInfo="data.info"
        v-bind="$attrs"
      />
    </view>
  </swiper-item>
</template>
<script lang="ts" setup>
import Taro from '@tarojs/taro';
import SideBar from '../../SideBar/index.vue';
import Bottom from '../../Bottom/index.vue';
import { reactive, watch } from 'vue';
// @ts-ignore
import styles from './styles.scss';
import type { IMemo, IMemoItem } from '@/apis/memo/model';
import { ossImgHostLpt } from '@/utils/env';

const props = defineProps({
  swiperItemInfo: {
    type: Object,
    default: {} as (IMemo & IMemoItem)
  },
  showVedioFlag: {
    type: Boolean,
    default: false
  },
  ShowVirtualFlag: {
    type: Boolean,
    default: false
  },

});

const emit = defineEmits(['okClose']);

const data = reactive({
  showFlag: false,
  info: {} as (IMemo & IMemoItem)
});



watch(
  () => props.swiperItemInfo as (IMemo & IMemoItem),
  newVal => {
    data.info = newVal;
  },
  { immediate: true }
);


// 点击
const handleClickItem = (item: IMemo & IMemoItem) => {
  // 判断是否是视频，图片点击（预览），视频点击播放暂停切换
  if (item.memoItemType === 0) {
    Taro.previewImage({
      urls: [item.picUrl] // 需要预览的图片http链接列表
    });
  } else {
    const videAUplay = Taro.createVideoContext(item.memoResId);
    data.showFlag ? videAUplay.play() : videAUplay.pause();
  }
};

</script>
