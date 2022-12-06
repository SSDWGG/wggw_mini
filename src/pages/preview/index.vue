<!-- eslint-disable vue/prefer-true-attribute-shorthand -->
<template>
  <view :class="styles.preview">
    <view class="goback" @tap="Taro.navigateBack()">
      <image
        src="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/MIPOCGJA-1666323984843icon-back.png"
        class="goback-icon"
        :style="{
          paddingTop: `${top}`
        }"
      />
    </view>
    <preview-swiper
      :List="account.memoDataList"
      @load-more="loadMore"

    />
  </view>
</template>

<script lang="ts" setup>
import styles from './styles.scss';
import Taro from '@tarojs/taro';
import PreviewSwiper from './components/PreviewSwiper/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { getSizeToPx  } from '@/utils/index';
import { useAccountStore } from '@/stores/account';
import { reactive } from 'vue';


const systemInfo = useSystemInfoStore();
const account = useAccountStore();
const top = getSizeToPx((systemInfo.statusBarHeight as number) + 16);


const data = reactive({
// 需要扁平化处理一下相册数据，然后传入轮播器组件

})

const loadMore = () =>console.log('扩增数据');

definePageConfig({
  backgroundColor: '#000',
  enableShareAppMessage: true,
});

</script>
