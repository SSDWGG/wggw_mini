<template>
  <swiper
    :current="data.initCurrent"
    :indicator-dots="false"
    :autoplay="false"
    :circular="false"
    :vertical="true"
    :duration="400"
    :style="{ height: '100vh' }"
    @animationfinish ="handleChangeSwiper"
  >
  <!--       :showVedioFlag="handleshowVedioFlag(item)" -->
    <preview-swiper-item
      v-for="item in props.List"
      :key="item.memoId"
      :swiperItemInfo="item"
      showVedioFlag
      :ShowVirtualFlag = "handleShowVirtualFlag(item)"
      :hideSideBarItem="props.hideSideBarItem"  
      :isShare="props.isShare"
    />
  </swiper>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue';
import PreviewSwiperItem from './PreviewSwiperItem/index.vue';
import Taro, { useRouter } from '@tarojs/taro';
import { IMemo, IMemoItem } from '@/apis/memo/model';

const props = defineProps({
  List: {
    default: [] as unknown as  (IMemo & IMemoItem) []
  },
  isShare:{
    type:Boolean,
    default: false
  },
  hideSideBarItem:{
    type:Array,
    default: []
  }
});

// detailId:当前需要播放的memoResId
const router = useRouter();


const emit = defineEmits(['loadMore']);

const initIndex = 0;
const data = reactive({
  buffer: 1,
  // 因为微信组件设计的的原因，这个current最好不能被手动修改，不然会出现来回自动滑动bug，所以这边用了两个变量来记录
  initCurrent:initIndex,
  activedBanner: initIndex,
  VideoContext: (undefined as unknown) as Taro.VideoContext
});
watch(
  () => props.List,
  newVal => {    
    // 删除详情后，检查相册该位置内容，没有则返回上一页
    !newVal[data.activedBanner] && Taro.navigateBack();
    // 删除详情后，自动播放下一个的视频
    newVal[data.activedBanner].memoType===1&&
    Taro.createVideoContext(newVal[data.activedBanner].memoResId).play();
  },
  { immediate: true }
);
// 

// 初始化previewList
const init = () => {
  data.activedBanner = props.List.findIndex(
    item =>item.memoResId ===router.params.detailId
  );
  data.initCurrent  = data.activedBanner;
};
init();

// 条件渲染视频标签，只渲染一个视频标签，减少内存使用空间
// const handleshowVedioFlag = (item: any) =>
//  {
//   if(item.albumType===1 ){
//   return   props.List[data.activedBanner].id=== item.id;
//   }
//   return false;
//  };

  // 虚拟渲染dom(缓存2buffer+1个)
const handleShowVirtualFlag = (item: any) =>
  Math.abs(
    props.List.findIndex(i => i.memoResId === props.List[data.activedBanner].memoResId) -
    props.List.findIndex(i => i.memoResId === item.memoResId)
  ) <= data.buffer;

// 切换回调   连续快速下滑不会连续触发这个回调
const handleChangeSwiper = val => {
  // 记录index
  data.activedBanner = val.detail.current;
  // 超出进行扩增pinia缓存   距离 buffer+2个，请求分页加载
  if (data.activedBanner + data.buffer+2 >= props.List.length - 1) {
    emit('loadMore');
  }
};

// 监听滑动，获取vidio实例
watch(
  () => data.activedBanner,
  newVal => {
    const nowItem = props.List[newVal];
    !!data.VideoContext && data.VideoContext.pause();
    data.VideoContext = Taro.createVideoContext(nowItem.memoResId);
  },
  {
    immediate: true
  }
);

// 必须对VideoContext实例进行监听，因为在弱网或者快速下拉情况下，直接play会有实例未生成bug
watch(
  () => data.VideoContext,
  newVal => {
    setTimeout(() => {
      newVal.play();
    }, 500);
  },
  {
    immediate: true
  }
);
</script>
