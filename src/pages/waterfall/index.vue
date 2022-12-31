<template>
  <navbar title="WaterFall" background-color="#f3f3fe" />
  <view :class="styles.myContainer">
    <view class="item" v-for="imgsrc in imgList" :key="imgsrc">
      <image mode="widthFix" :src=imgsrc></image>
    </view>
  </view>
</template>
<script lang="ts" setup>
import styles from "./styles.scss";
import { Navbar } from 'mini-ui';

definePageConfig({ backgroundColor: "#f3f3fe" });

const imgList = [
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LGJCHEMO-16724568566421.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DHNOKPKJ-16724568566422.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EDGGOIDI-16724568566423.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GMDPHFNA-16724568566424.jpeg',
  "https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GAOMFFHE-16724568566425.jpeg",
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IBFDPNGA-16724568566426.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MLACPBIP-16724568566427.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DDGNMOJA-16724568566428.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DGMLIKAM-16724568566429.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/NPOAHPOI-167245685664210.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IELECADL-167245685664211.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LKBMAEEL-167245685664212.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MGFLKPHG-167245685664213.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/HKLCDNJF-167245685664214.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FIOOHCGM-167245685664315.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CHFCHIMN-167245685664316.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JODDNOPG-167245685664317.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JAPKCDON-167245685664318.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/GGEIODNE-167245685664319.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DKNJIAGP-167245685664320.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/BADGNECI-167245685664321.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/IKBIAGBH-167245685664322.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MPPGJPEF-167245685664323.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/EOEMEOHK-167245685664324.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/PNJFOIBH-167245685664325.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CDOFFFMD-167245685664326.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/AIPKICJE-167245685664327.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/PEPCHNMJ-167245685664328.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/ICEGOBKL-167245685664329.jpeg',
  'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/HMGGKJPP-167245685664330.jpeg',
]
</script>
