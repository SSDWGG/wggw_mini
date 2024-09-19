<template>
  <navbar title="WaterFall" background-color='#f3f3fe' />
  <view :class="styles.waterfall">
    <view v-for="imgsrc in imgList" :key="imgsrc" class="item">
      <image v-if="imgsrc" mode="widthFix" :src=imgsrc></image>
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { Navbar } from '@fishui/taro-vue';


definePageConfig({ backgroundColor: '#f3f3fe' });
// waterFallRRB


const imgList = [
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08130.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08162.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08179.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08187.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08198.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08223.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08234.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08241.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08265.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08286.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08312.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08315.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08320.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08322.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08325.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08346.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08357.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08390.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08457.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08500.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08541.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08549.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08578.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08584.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08604.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08697.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08701.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08709.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08713.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08734.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08773.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08801.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08838.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08850.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08861.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08867.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08873.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08900.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08938.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08947.JPG',
'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFallRRB/WGG08950.JPG',
];

// 普通瀑布流
// [
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/LGJCHEMO-16724568566421.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DHNOKPKJ-16724568566422.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/EDGGOIDI-16724568566423.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GMDPHFNA-16724568566424.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GAOMFFHE-16724568566425.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IBFDPNGA-16724568566426.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MLACPBIP-16724568566427.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DDGNMOJA-16724568566428.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DGMLIKAM-16724568566429.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/NPOAHPOI-167245685664210.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IELECADL-167245685664211.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/LKBMAEEL-167245685664212.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MGFLKPHG-167245685664213.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/HKLCDNJF-167245685664214.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/FIOOHCGM-167245685664315.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/CHFCHIMN-167245685664316.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/JODDNOPG-167245685664317.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/JAPKCDON-167245685664318.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GGEIODNE-167245685664319.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DKNJIAGP-167245685664320.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/BADGNECI-167245685664321.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IKBIAGBH-167245685664322.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MPPGJPEF-167245685664323.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/EOEMEOHK-167245685664324.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/PNJFOIBH-167245685664325.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/CDOFFFMD-167245685664326.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/AIPKICJE-167245685664327.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/PEPCHNMJ-167245685664328.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/ICEGOBKL-167245685664329.jpeg',
//   'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/HMGGKJPP-167245685664330.jpeg',
// ];
</script>
