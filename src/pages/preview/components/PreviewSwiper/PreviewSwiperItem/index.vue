<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<template>
  <swiper-item :class="styles.swiperItem">
    <view  class="content-div"         
      @tap="handleChangePlay(data.info)">

      <!-- 内容不在dom文档中缓存，以减小渲染压力和首屏渲染时间 -->
      <view v-if="props.ShowVirtualFlag" class="content-info">
        <!-- 图片 -->
      <image
        v-if="data.info.albumType === 0"
        :src="data.info.picUrl"
        class="img"
        mode="aspectFit"
      ></image>
      <!-- 视频 -->
      <view v-if="data.info.albumType === 1" class="vedio-div">
        <!-- 暂停标记 -->
        <image
          v-show="data.showFlag"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FCOMANDD-1666325886772video-play.png"
          class="vedio-flag"
        />
        <!--封面图  防止被快速下滑，需要使用封面图站位因为快速下滑回调不会被执行 -->
        <image
          v-if="!props.showVedioFlag"
          :src="data.info.videoPicUrl"
          class="img"
          mode="aspectFit"
        ></image>
        <!-- 视频 优化点：还没有加载完的视屏，封面图也可以盖在上面-->
        <video
          v-if="props.showVedioFlag"
          :id="data.info.id"
          :posterForCrawler="data.info.videoPicUrl"
          :src="!!data.info.transcodingUrl?data.info.transcodingUrl:data.info.picUrl"
          object-fit="contain"
          initial-time="0"
          :autoplay="false"
          :show-fullscreen-btn="false"
          :showCenterPlayBtn="false"
          :showPlayBtn="false"
          :loop="true"
          :muted="false"
          :enableProgressGesture="false"
          :show-bottom-progress="true"
          @play="changeShowFlag(false)"
          @pause="changeShowFlag(true)"
        />
      </view>
       </view>
      <!-- 可以写 css background-image 增加默认的骨架屏背景，优化首屏体验 -->
      <!-- 侧边栏  -->
      <side-bar
        v-if="Object.keys(data.info).length !== 0"
        :itemInfo="data.info"
        v-bind="$attrs"
        @ok-delete = 'handleOkDelete'
      />
      <!-- 底部 -->
      <bottom
        v-if="Object.keys(data.info).length !== 0"
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



const props = defineProps({
  swiperItemInfo: {
    type: Object,
    default: {}
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
  info: {} as any
});



watch(
  () => props.swiperItemInfo,
  newVal => {
    data.info = newVal;
  },
  { immediate: true }
);

// 目前来看做这种动态缓存video应该是最优解，因为在视频暂停的时候是不会长时间加载的，可以防止快速下滑导致的加载阻塞问题
const changeShowFlag = (flag: boolean) => {
  data.showFlag = flag;
};

// 暂停播放切换
const handleChangePlay = item => {
  // 判断是否是视频，图片点击目前不做操作
  if (item.albumType === 0) return;
  const videAUplay = Taro.createVideoContext(item.id);
  data.showFlag ? videAUplay.play() : videAUplay.pause();
};

// 删除的回调
const handleOkDelete =  ()=>{
  emit('okClose');
};
</script>
