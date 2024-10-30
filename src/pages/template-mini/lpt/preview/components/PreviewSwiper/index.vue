<template>
  <swiper :current="data.initCurrent" :indicator-dots="false" :autoplay="false" :circular="false" :vertical="true"
    :duration="400" :style="{ height: '100vh' }" @animationfinish="handleChangeSwiper">
    <!--       :showVedioFlag="handleshowVedioFlag(item)" -->
    <preview-swiper-item v-for="item in props.List" :key="item.memoId" :swiperItemInfo="item" showVedioFlag
      :ShowVirtualFlag="handleShowVirtualFlag(item)" :hideSideBarItem="props.hideSideBarItem"
      :isShare="props.isShare" />
  </swiper>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';
import PreviewSwiperItem from './PreviewSwiperItem/index.vue';
import Taro, { useRouter } from '@tarojs/taro';
import type { IMemo, IMemoItem } from '@/apis/memo/model';

const props = defineProps({
  List: {
    default: [] as unknown as (IMemo & IMemoItem)[]
  },
  isShare: {
    type: Boolean,
    default: false
  },
  hideSideBarItem: {
    type: Array,
    default: []
  }
});

const emit = defineEmits(['loadMore']);


// detailId:当前需要播放的id
const router = useRouter();


const initIndex = 0;
const data = reactive({
  buffer: 1,
  // 因为微信组件设计的的原因，这个current最好不能被手动修改，不然会出现来回自动滑动bug，所以这边用了两个变量来记录
  initCurrent: initIndex,
  activedBanner: initIndex,
  VideoContext: (undefined as unknown) as Taro.VideoContext
});
watch(
  () => props.List,
  newVal => {
    // 删除详情后，检查相册该位置内容，没有则返回上一页
    !newVal[data.activedBanner] && Taro.navigateBack();
  },
  { immediate: true }
);
//

// 初始化previewList
const init = () => {
  data.activedBanner = props.List.findIndex(
    item => item.id === router.params.detailId
  );
  data.initCurrent = data.activedBanner;
};
init();


// 虚拟渲染dom(缓存2buffer+1个)
const handleShowVirtualFlag = (item: any) =>
  Math.abs(
    props.List.findIndex(i => i.id === props.List[data.activedBanner].id) -
    props.List.findIndex(i => i.id === item.id)
  ) <= data.buffer;

// 切换回调   连续快速下滑不会连续触发这个回调
const handleChangeSwiper = val => {
  // 记录index
  data.activedBanner = val.detail.current;
  // 超出进行扩增pinia缓存   距离 buffer+2个，请求分页加载
  if (data.activedBanner + data.buffer + 2 >= props.List.length - 1) {
    emit('loadMore');
  }
};


</script>
