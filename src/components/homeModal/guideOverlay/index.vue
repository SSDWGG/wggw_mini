
<template>
  <view v-show="(!homeModal.showfreePop && account.isLogined)">
    <nut-overlay
      v-model:visible="homeModal.showGuidePop"
      :z-index="2000"
      :close-on-click-overlay='false'
      :overlay-style="{ background: '#fff' }"
    >
    <!-- 点击全屏幕进行下一步 -->
      <view :class="styles.wrapper"  @tap="next">
        <image 
          v-if="data.current <= 4"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CAGPLGEG-1669369157543x.png"
          class="bg" />
          <image v-if="data.current <= 3"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/KHEEFBNB-1669342492146编组 4@2x.png"
          class="bg" />
          <image v-if="data.current <= 2"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/DOAJFJJK-1669341754465新手引导-新款-3备份@2x.png"
          class="bg" />
          <image v-if="data.current <= 1"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/ALCFJBDB-1669692721442新手引导-2.png"
          class="bg" />
          <image v-if="data.current <= 0"
          src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/JDOONIDE-1669341754465新手引导-发布商品-1备份.png"
          mode="aspectFill"
          class="bg" />
        <!-- <view class="next" :style="{ top: data.nextPostion[data.current].top, left: data.nextPostion[data.current].left }"
          @tap="next" /> -->
      </view>
    </nut-overlay>
  </view>
</template>
<script lang="ts" setup>
import { useHomeModal } from '@/stores/homeModalCtrl';
import { useAccountStore } from '@/stores/account';
// @ts-ignore
import styles from './styles.scss';
import { reactive } from 'vue';
// import Taro from '@tarojs/taro';

const homeModal = useHomeModal();
const account = useAccountStore();

// 高度适配上有点计算不准确，扩大了热区高度覆盖所有机型
// const top = '0px';

const data = reactive({
  current: 0,
  imageList: [
    'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/POFKLKJI-16688249343271.png',
    'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/FNFGIBHL-16688249602292.png',
    'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/ALBHDEMA-16688250043463.png',
    'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MGPJEJPK-16688250350714.png',
    'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/LKBNDCIP-16688250395475.png',
  ],
  // nextPostion: [
  //   { top: `calc(${Taro.pxTransform(450)} + ${top})`, left: Taro.pxTransform(25) },
  //   { top: `calc(${Taro.pxTransform(335)} + ${top})`, left: Taro.pxTransform(85) },
  //   { top: `calc(${Taro.pxTransform(360)} + ${top})`, left: Taro.pxTransform(60) },
  //   { top: `calc(${Taro.pxTransform(385)} + ${top})`, left: Taro.pxTransform(30) },
  //   { top: `calc(${Taro.pxTransform(600)} + ${top})`, left: Taro.pxTransform(30) },
  // ]
});

const next = () => {
  if (data.current < data.imageList.length - 1 ){
    data.current++; 
  } else {
    homeModal.closeBeginnerGuide();
  }
};
</script>