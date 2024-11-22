<template>
  <view :class="styles.lockPageContainer">
    <myNavBar  v-if="data.showPage"  title="RRB" background-color="transparent" :goback="goback" />
    <lock
      ref="myLockPage"
      :passwordObj="data.password"
      @cb-input-back="cbTestPassword"
    >
      <template #contentSlot>
        <scroll-view v-if="data.showPage" :class="styles.myMenuContainer" class="pageIn" scroll-y="true" @scroll="onScroll">
          <page-container :show="data.pageContainerShow" :overlay="false" @leave="goback" />
          <nut-watermark :gap-x="20" font-color="rgba(0, 0, 0, .1)" :z-index="1" content="RUNRUNBABY" />
          <nut-noticebar right-icon="circle-close" background="#F1EFFD" color="#8074FE" :speed="35">
            Do not go gentle into that good night。心若有所向往，何惧道阻且长。
          </nut-noticebar>

          <view class="richText">
            <rich-text :nodes="h5" />
            <video
              class="video"
              object-fit="contain"
              :show-bottom-progress="false"
              :initial-time="0"
              :autoplay="true"
              :controls="false"
              :show-fullscreen-btn="false"
              :show-center-play-btn="false"
              :show-play-btn="false"
              :loop="true"
              :muted="true"
              :enable-progress-gesture="false"
              style="width: 100%"
              :src="cdnHost + ossFilePrePath + '/OMFHLJDP-17059977997221.mp4'"
            />
          </view>

          <commonMenu :height="height" :listData="account.rrbMenuList"></commonMenu>

          <side-bar :show="show" :onfullButtonBack="() => (data.showPage = false)" :showFlags="[1, 2, 3]" />
        </scroll-view>
        <!--           :svgaUrl="cdnHost+ossFilePrePathSvga+'/normalSVGA/rose.svga'" -->
        <fullPreview
          v-else
          :svgaLoop="1"
          :svga-url="data.svgaUrl"
          :back="true"
          :imgSrc="imageSrcBg"
          title="RRB"
          @back="data.showPage = true"
          @finsh="onFinsh"
        />
      </template>
    </lock>
  </view>
</template>
<script lang="ts" setup>
import lock from '@/components/lock/index.vue';
// @ts-ignore
import styles from './styles.scss';
import myNavBar from '@/components/my-nav-bar/index.vue';
import { computed, reactive,ref } from 'vue';
import Taro, { useShareAppMessage, useShareTimeline, switchTab, useDidShow } from '@tarojs/taro';
import { useSystemInfoStore } from '@/stores/systemInfo';
import sideBar from '@/components/SideBar/index.vue';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import fullPreview from '@/components/fullPreview/index.vue';
import commonMenu from '@/components/commonMenu/index.vue';
import { useAccountStore } from '@/stores/account';
import { cdnHost, ossFilePrePath,ossFilePrePathSvga,ossFilePrePathRrb } from '@/utils/env';

definePageConfig({
  enableShareAppMessage: true,
  enableShareTimeline: true,
});

const imageSrcBg = `${cdnHost}${ossFilePrePathRrb}/WGG08325.JPG?x-oss-process=image/quality,q_20`;

const { show, onScroll } = useListScroll();
const account = useAccountStore();

const systemInfo = useSystemInfoStore();
const svgaUrlList = [
  '2022110422344569.svga',
  '2022110422395120.svga',
  '2022110422405254.svga',
  '2022110422420815.svga',
  '2022110422433573.svga',
  '2022110422450167.svga',
  '2022110622314192.svga',
  '2022110622330817.svga',
  '2022110622354389.svga',
  '2022110622365540.svga',
  '2022110622383932.svga',
  '2022110622402597.svga',
  '2022110622414965.svga',
  '2022110622454731.svga',
  '2022110622470250.svga',
  '2022110622480018.svga',
  '2022110622501824.svga',
  '2022110622511918.svga',
  '2022110622521142.svga',
  '2022110622531448.svga',
  '2022110622541440.svga',
  '2022110622580595.svga',
  '2022110623020080.svga',
  '2022110623032034.svga',
  '2022110623041923.svga',
  '2022110623053168.svga',
  '2022110623062257.svga',
  '2022110623073233.svga',
  '2022110623082817.svga',
  '2022110623135353.svga',
  '2022110623145092.svga',
  '2022110623160156.svga',
  '2022110623254198.svga',
  '2022110623275326.svga',
  '2022110623291327.svga',
  '2023021413571375.svga',
  '2023021415055742.svga',
  '2024031318511419.svga',
];

const h5 =
  '<h6 style="text-align: center;color: #fff;opacity: .8;"><strong>Do not go gentle into that good night。</strong></h6>';
const height = computed(() => `calc( 100vh - ${systemInfo.statusBarHeight}px - 40px -88rpx  - env(safe-area-inset-bottom))`);

const myLockPage = ref<any>();


const data = reactive({
  pageType: 2,
  showPage: true,
  pageContainerShow: true,
  password:{
        '001023': '大老婆',
      },
  svgaUrl: `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`,
});

// cbInputBack :1 成功 2失败 3失败上限
const cbTestPassword = (type) => {
  if (type === 1) {
    Taro.setStorageSync('wggw-rrb-page-type', type);
  }else if(type === 3){
    Taro.setStorageSync('wggw-rrb-page-type', type);
  }
};

useDidShow(() => {
  data.pageType = Taro.getStorageSync('wggw-rrb-page-type');
  // cbInputBack :1 成功 2失败 3失败上限
  if(data.pageType===1){
    myLockPage.value.pageData.pageShow = false;
  }else if(data.pageType===3){
    myLockPage.value.pageData.canInput = false;
  }
});

const goback = () => {
  switchTab({ url: '/pages/menu/index' });
};

const onFinsh = () => {
  const tempUrl = `${cdnHost}${ossFilePrePathSvga}/liliSvga/${svgaUrlList[Math.floor(Math.random() * svgaUrlList.length)]}`;
  // 防止两次随机出同一个整数导致的watch不刷新
  if (data.svgaUrl === tempUrl) {
    onFinsh();
  } else {
    data.svgaUrl = tempUrl;
  }
};

useShareTimeline(() => ({
  title: 'RUNRUNBABY~',
  path: '/pages/rrb/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));
useShareAppMessage(() => ({
  title: 'RUNRUNBABY~',
  path: '/pages/rrb/index',
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));
</script>
