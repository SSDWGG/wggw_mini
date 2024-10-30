<template>
  <view :class="styles.preview">
    <view class="goback" @tap="Taro.navigateBack()">
      <image
        :src="AIcon"
        class="goback-icon" :style="{
          paddingTop: `${top}`
        }" />
    </view>
    <preview-swiper :List="(account.vistorDataList as any)" />
  </view>
</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import Taro from '@tarojs/taro';
import PreviewSwiper from './components/PreviewSwiper/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { getSizeToPx } from '@/utils/index';
import { useAccountStore } from '@/stores/account';
import AIcon from '../img/MIPOCGJA-1666323984843icon-back.png';


const systemInfo = useSystemInfoStore();
const account = useAccountStore();
const top = getSizeToPx((systemInfo.statusBarHeight as number) + 16);


definePageConfig({
  backgroundColor: '#000',
});

</script>
