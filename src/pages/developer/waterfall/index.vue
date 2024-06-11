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

const imgList = [
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/LGJCHEMO-16724568566421.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DHNOKPKJ-16724568566422.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/EDGGOIDI-16724568566423.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GMDPHFNA-16724568566424.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GAOMFFHE-16724568566425.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IBFDPNGA-16724568566426.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MLACPBIP-16724568566427.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DDGNMOJA-16724568566428.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DGMLIKAM-16724568566429.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/NPOAHPOI-167245685664210.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IELECADL-167245685664211.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/LKBMAEEL-167245685664212.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MGFLKPHG-167245685664213.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/HKLCDNJF-167245685664214.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/FIOOHCGM-167245685664315.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/CHFCHIMN-167245685664316.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/JODDNOPG-167245685664317.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/JAPKCDON-167245685664318.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/GGEIODNE-167245685664319.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/DKNJIAGP-167245685664320.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/BADGNECI-167245685664321.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/IKBIAGBH-167245685664322.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/MPPGJPEF-167245685664323.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/EOEMEOHK-167245685664324.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/PNJFOIBH-167245685664325.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/CDOFFFMD-167245685664326.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/AIPKICJE-167245685664327.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/PEPCHNMJ-167245685664328.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/ICEGOBKL-167245685664329.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/waterFall/HMGGKJPP-167245685664330.jpeg',
];
</script>
