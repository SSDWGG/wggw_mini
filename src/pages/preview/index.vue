<template>
  <view :class="styles.preview">
    <view class="goback" @tap="Taro.navigateBack()">
      <image
        src="@/assets/images/project/back.png"
        class="goback-icon"
        :style="{
          paddingTop: `${top}`
        }"
      />
    </view>
    <preview-swiper
      :List="
      data.swiperListData"
    />
  </view>
</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import Taro from '@tarojs/taro';
import PreviewSwiper from './components/PreviewSwiper/index.vue';
import { useSystemInfoStore } from '@/stores/systemInfo';
import { getSizeToPx  } from '@/utils/index';
import { useAccountStore } from '@/stores/account';
import { reactive,computed} from 'vue';
import type { IMemo, IMemoItem } from '@/apis/memo/model';


const systemInfo = useSystemInfoStore();
const account = useAccountStore();
const top = getSizeToPx((systemInfo.statusBarHeight as number) + 16);


const data = reactive({
  swiperListData:[] as  (IMemo & IMemoItem)[]
});

const flat = (arr: IMemo[]) => arr.flatMap(i => i.list.map(v => ({...i, ...v})));
 data.swiperListData = computed(() => flat(account.memoDataList)) as any;

definePageConfig({
  backgroundColor: '#000',
});

</script>
