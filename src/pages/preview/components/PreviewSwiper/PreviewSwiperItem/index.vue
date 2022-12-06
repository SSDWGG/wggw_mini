<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <swiper-item :class="styles.swiperItem">
    <view class="content-div" @tap="handleClickItem(data.info)">
      <!-- 内容不在dom中缓存，以减小渲染压力和首屏渲染时间 -->
      <view v-if="props.ShowVirtualFlag" class="content-info">
        <!-- 图片 -->
        <image v-if="data.info.memoItemType === 0" :src="data.info.picUrl" class="img" mode="aspectFit"></image>
        <!-- 视频 -->
        <view v-if="data.info.memoItemType === 1" class="vedio-div">
          <!-- 暂停标记 -->
          <image v-show="data.showFlag"
            src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FCOMANDD-1666325886772video-play.png"
            class="vedio-flag" />
          <!--封面图  防止被快速下滑，需要使用封面图站位因为快速下滑回调不会被执行 -->
          <image v-if="!props.showVedioFlag" :src="data.info.videoPicUrl" class="img" mode="aspectFit"></image>
          <!-- 视频 优化点：还没有加载完的视屏，封面图也可以盖在上面-->
          <video v-if="props.showVedioFlag" :id="data.info.memoResId" :posterForCrawler="data.info.videoPicUrl"
            :src="data.info.picUrl" object-fit="contain" initial-time="0" :autoplay="false" :show-fullscreen-btn="false"
            :showCenterPlayBtn="false" :showPlayBtn="false" :loop="true" :muted="false" :enableProgressGesture="false"
            :show-bottom-progress="true" @play="changeShowFlag(false)" @pause="changeShowFlag(true)" />
        </view>
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
import styles from './styles.scss';
import { IMemo, IMemoItem } from '@/apis/memo/model';

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

// 目前来看做这种动态缓存video应该是最优解，因为在视频暂停的时候是不会长时间加载的，可以防止快速下滑导致的加载阻塞问题
const changeShowFlag = (flag: boolean) => {
  data.showFlag = flag;
};

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
