<template>
  <navbar title="WaterFall" background-color="#f3f3fe" />
  <view :class="styles.waterfall"  :style="{ height:normalHeight}">
    <view v-for="imgsrc in pageData.showImgList" :key="imgsrc" class="item" @tap="onClickImg(imgsrc)">
      <image v-if="imgsrc" mode="widthFix" :src="imgsrc+pageData.imgQParams"></image>
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';
import { computed,reactive } from 'vue';
import { useSystemInfoStore } from '@/stores/systemInfo';

definePageConfig({ backgroundColor: '#f3f3fe' });
// waterFallRRB


const systemInfo = useSystemInfoStore();

const normalHeight = computed(() =>
  `calc( 100vh - ${systemInfo.statusBarHeight}px - 88rpx  - env(safe-area-inset-bottom))`
);

const pageData = reactive({
  rrbUrl: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/',
  imgQParams: '?x-oss-process=image/quality,q_20',
  rrbInitImgList: [
    'WGG08130.JPG',
    'WGG08162.JPG',
    'WGG08179.JPG',
    'WGG08223.JPG',
    'WGG08234.JPG',
    'WGG08241.JPG',
    'WGG08265.JPG',
    'WGG08286.JPG',
    'WGG08312.JPG',
    'WGG08315.JPG',
    'WGG08320.JPG',
    'WGG08322.JPG',
    'WGG08325.JPG',
    'WGG08346.JPG',
    'WGG08357.JPG',
    'WGG08390.JPG',
    'WGG08457.JPG',
    'WGG08500.JPG',
    'WGG08541.JPG',
    'WGG08549.JPG',
    'WGG08578.JPG',
    'WGG08584.JPG',
    'WGG08604.JPG',
    'WGG08697.JPG',
    'WGG08701.JPG',
    'WGG08709.JPG',
    'WGG08713.JPG',
    'WGG08734.JPG',
    'WGG08773.JPG',
    'WGG08801.JPG',
    'WGG08838.JPG',
    'WGG08850.JPG',
    'WGG08861.JPG',
    'WGG08867.JPG',
    'WGG08873.JPG',
    'WGG08900.JPG',
    'WGG08938.JPG',
    'WGG08947.JPG',
    'WGG08950.JPG',

    'WGG08130.JPG',
    'WGG08162.JPG',
    'WGG08179.JPG',
    'WGG08223.JPG',
    'WGG08234.JPG',
    'WGG08241.JPG',
    'WGG08265.JPG',
    'WGG08286.JPG',
    'WGG08312.JPG',
    'WGG08315.JPG',
    'WGG08320.JPG',
    'WGG08322.JPG',
    'WGG08325.JPG',
    'WGG08346.JPG',
    'WGG08357.JPG',
    'WGG08390.JPG',
    'WGG08457.JPG',
    'WGG08500.JPG',
    'WGG08541.JPG',
    'WGG08549.JPG',
    'WGG08578.JPG',
    'WGG08584.JPG',
    'WGG08604.JPG',
    'WGG08697.JPG',
    'WGG08701.JPG',
    'WGG08709.JPG',
    'WGG08713.JPG',
    'WGG08734.JPG',
    'WGG08773.JPG',
    'WGG08801.JPG',
    'WGG08838.JPG',
    'WGG08850.JPG',
    'WGG08861.JPG',
    'WGG08867.JPG',
    'WGG08873.JPG',
    'WGG08900.JPG',
    'WGG08938.JPG',
    'WGG08947.JPG',
    'WGG08950.JPG',
  ],
  showImgList: [] as string[],
});

const init = ()=>{
  pageData.showImgList  = pageData.rrbInitImgList.map(item=>pageData.rrbUrl+item);
};
init();

const onClickImg = (imgSrc)=>{
  console.log(imgSrc);

};

// 普通瀑布流  https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/
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
