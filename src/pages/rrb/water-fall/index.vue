<template>
  <lock ref="myLockPage" :passwordObj="pageData.password" @cb-input-back="cbTestPassword">
    <template #contentSlot>
      <myNavBar v-show="!pageData.isPure" title="RR&SS" background-color="#f3f3fe">
        <template v-if="!!router.params.isShare" #left>
          <view style="padding: 6px 20px" @tap="goback">
            <IconFont name="home" size="20" />
          </view>
        </template>
      </myNavBar>
      <!-- :style="{ height:normalHeight}" -->
      <view :class="styles.waterfall" @scroll="onScroll">
        <view v-for="imgsrc in pageData.showImgList" :key="imgsrc" class="item" @tap="onClickImg(imgsrc)">
          <image v-if="imgsrc" mode="widthFix" :src="imgsrc + pageData.imgQParams"></image>
        </view>
      </view>
      <side-bar :show="show" :onfullButtonBack="() => (pageData.isPure = !pageData.isPure)" :showFlags="[1, 2, 9]" />
    </template>
  </lock>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import myNavBar from '@/components/my-nav-bar/index.vue';
import { reactive } from 'vue';
// import { useSystemInfoStore } from '@/stores/systemInfo';
import { useListScroll } from '@/components/scrollHooks/useListScroll';
import sideBar from '@/components/SideBar/index.vue';
import { getImgListByTuser } from '@/apis/rrb';
import { cdnHost, ossFilePrePath, ossFilePrePathRrb } from '@/utils/env';
import Taro, { useRouter, useDidShow, switchTab, useShareAppMessage, useShareTimeline } from '@tarojs/taro';

const router = useRouter();

definePageConfig({ backgroundColor: '#f3f3fe', enableShareAppMessage: true, enableShareTimeline: true });
// waterFallRRB
const { show, onScroll } = useListScroll();

// const systemInfo = useSystemInfoStore();

// const normalHeight = computed(() =>
//   `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx  - env(safe-area-inset-bottom))`
// );

// ?x-oss-process=image/quality,Q_100有的时候会图片过大
const pageData = reactive({
  rrbUrl: `${cdnHost}${ossFilePrePathRrb}/`,
  imgQParams: '?x-oss-process=image/quality,q_80',
  // rrbInitImgList: [
  //   'WGG08130.JPG',
  //   'WGG08162.JPG',
  //   'WGG08179.JPG',
  //   'WGG08223.JPG',
  //   'WGG08234.JPG',
  //   'WGG08241.JPG',
  //   'WGG08265.JPG',
  //   'WGG08286.JPG',
  //   'WGG08312.JPG',
  //   'WGG08315.JPG',
  //   'WGG08320.JPG',
  //   'WGG08322.JPG',
  //   'WGG08325.JPG',
  //   'WGG08346.JPG',
  //   'WGG08357.JPG',
  //   'WGG08390.JPG',
  //   'WGG08457.JPG',
  //   'WGG08500.JPG',
  //   'WGG08541.JPG',
  //   'WGG08549.JPG',
  //   'WGG08578.JPG',
  //   'WGG08584.JPG',
  //   'WGG08604.JPG',
  //   'WGG08697.JPG',
  //   'WGG08701.JPG',
  //   'WGG08709.JPG',
  //   'WGG08713.JPG',
  //   'WGG08734.JPG',
  //   'WGG08773.JPG',
  //   'WGG08801.JPG',
  //   'WGG08838.JPG',
  //   'WGG08850.JPG',
  //   'WGG08861.JPG',
  //   'WGG08867.JPG',
  //   'WGG08873.JPG',
  //   'WGG08900.JPG',
  //   'WGG08938.JPG',
  //   'WGG08947.JPG',
  //   'WGG08950.JPG',
  // ],
  showImgList: [] as string[],
  isPure: false,
  password: {
    '001023': '大老婆',
  },
});

// cbInputBack :1 成功 2失败 3失败上限
const cbTestPassword = (type) => {
  if (type === 1) {
    Taro.setStorageSync('wggw-rrb-page-type', type);
  } else if (type === 3) {
    Taro.setStorageSync('wggw-rrb-page-type', type);
  }
};

const goback = () => {
  switchTab({ url: '/pages/menu/index' });
};

const init = async () => {
  // Taro.showLoading({
  //   title: '精彩获取中',
  //   mask: true,
  // });
  const ImgList = await getImgListByTuser({
    current: 1,
    pageSize: 100,
    tuser: 'rrb',
  });
  // Taro.hideLoading();
  pageData.showImgList = ImgList.map((item) => item.imgSrc);
};

const onClickImg = (imgSrc) => {
  console.log(imgSrc);
};

useDidShow(() => {
  init();
});
useShareTimeline(() => ({
  title: 'RUNRUNBABY~',
  path: '/pages/rrb/water-fall/index?isShare=true',
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));
useShareAppMessage(() => ({
  title: 'RUNRUNBABY~',
  path: '/pages/rrb/water-fall/index?isShare=true',
  imageUrl: `${cdnHost}${ossFilePrePath}/HHHNOCBG-1702544256738kun.jpeg`,
}));

// 普通瀑布流 cdnHost+ossFilePrePathNormalWaterFall+/
//   'LGJCHEMO-16724568566421.jpeg',
//   'DHNOKPKJ-16724568566422.jpeg',
//   'EDGGOIDI-16724568566423.jpeg',
//   'GMDPHFNA-16724568566424.jpeg',
//   'GAOMFFHE-16724568566425.jpeg',
//   'IBFDPNGA-16724568566426.jpeg',
//   'MLACPBIP-16724568566427.jpeg',
//   'DDGNMOJA-16724568566428.jpeg',
//   'DGMLIKAM-16724568566429.jpeg',
//   'NPOAHPOI-167245685664210.jpeg',
//   'IELECADL-167245685664211.jpeg',
//   'LKBMAEEL-167245685664212.jpeg',
//   'MGFLKPHG-167245685664213.jpeg',
//   'HKLCDNJF-167245685664214.jpeg',
//   'FIOOHCGM-167245685664315.jpeg',
//   'CHFCHIMN-167245685664316.jpeg',
//   'JODDNOPG-167245685664317.jpeg',
//   'JAPKCDON-167245685664318.jpeg',
//   'GGEIODNE-167245685664319.jpeg',
//   'DKNJIAGP-167245685664320.jpeg',
//   'BADGNECI-167245685664321.jpeg',
//   'IKBIAGBH-167245685664322.jpeg',
//   'MPPGJPEF-167245685664323.jpeg',
//   'EOEMEOHK-167245685664324.jpeg',
//   'PNJFOIBH-167245685664325.jpeg',
//   'CDOFFFMD-167245685664326.jpeg',
//   'AIPKICJE-167245685664327.jpeg',
//   'PEPCHNMJ-167245685664328.jpeg',
//   'ICEGOBKL-167245685664329.jpeg',
//   'HMGGKJPP-167245685664330.jpeg',
//
</script>
