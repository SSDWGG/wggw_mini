<template>
  <view :class="styles.commonMenu" :style="{ height }">
    <nut-animate v-for="(item, index) in props.listData" :key="index" type="breath" class="rule-button-div" loop>
      <view v-if="item.isShow !== false" class="menu-item" @tap="goto(item)">
        <view class="title">
          {{ item.title }}
        </view>
        <view class="title">
          {{ item.Ctitle }}
        </view>
        <image class="bgImg" mode="aspectFill" :style="{ opacity: item.opacity ?? 0.2 }" :src="item.bgSrc ?? imgDefaultSrc" />
      </view>
    </nut-animate>
  </view>
  <openOutLinkTipPop
    :pop-tip-visible="data.popTipVisible"
    :qrSrc="data.chooseItem.qrSrc"
    :show-name="data.chooseItem.Ctitle"
    :href="data.chooseItem.linkUrl"
    @close="
      () => {
        data.popTipVisible = false;
      }
    "
  />
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import Taro from '@tarojs/taro';
import type { IListDataItem } from 'types/global';
import { reactive } from 'vue';
import openOutLinkTipPop from '@/components/pop/openOutLinkTipPop/index.vue';
import { isDeving } from '@/utils/index';

interface IProps {
  height?: string;
  listData: IListDataItem[];
}

const props = withDefaults(defineProps<IProps>(), {
  height: '',
  listData: () => [] as IListDataItem[],
});

const imgDefaultSrc = 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CGHMKNBP-1669687856120rabbit.jpg';

const data = reactive({
  chooseItem: {} as IListDataItem,
  popTipVisible: false,
});

const goto = (item: IListDataItem) => {
  if (isDeving()) {
    if (item.linkUrl) {
      Taro.navigateTo({ url: `/pages/webViewPage/index?webViewUrl=${item.linkUrl}` });
    } else {
      Taro.navigateTo({ url: item.router as string });
    }
  } else if (item.linkUrl) {
      // 提示网址
      data.chooseItem = item;
      data.popTipVisible = true;
    } else {
      Taro.navigateTo({ url: item.router as string });
    }
};
</script>
