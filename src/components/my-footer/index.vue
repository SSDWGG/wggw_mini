<!-- eslint-disable vue/no-duplicate-attr-inheritance -->
<!-- eslint-disable complexity -->
<template>
  <view :class="styles.orderFootr">
    <!-- <view v-if="props.showFooterDetailData" class="sum">
        <view class="text-1">合计</view>
        <view class="right">
          <view class="text-2">
            <text>数量：</text>
            <text class="num">{{ props.allNum }}</text>
          </view>
          <view class="text-2">
            <text>金额：</text>
            <text class="num">{{ props.allPrice }}</text>
          </view>
        </view>
      </view>
      <view v-else>
        <slot v-if="!!slots.FooterDetailData" name="FooterDetailData" />
      </view> -->
    <view class="footer">
      <view v-if="props.showFooterDetailData" class="flex column">
        <view class="flex items-center txt-1">
          <view>已选 {{props.typeNum}} 种商品，</view>
          <view>共 {{props.allNum}} 件</view>
        </view>
        <view class="flex items-center">
          <view class="txt-2">合计：</view>
          <view class="txt-3">
            <view class="priceIcon">￥</view>

            {{ props.allPrice }}</view>
        </view>

      </view>
      <view v-else>
        <slot v-if="!!slots.FooterDetailData" name="FooterDetailData" />
      </view>

      <view class="flex items-center justify-end">
        <component :is="buttonComponents[index]" v-for="(_, index) in buttonComponents" :key="index" v-bind="$attrs" />
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import { computed, useSlots } from 'vue';
import addOrderButton from './components/addOrderButton/index.vue';

interface IProps {
  showFooterDetailData?: boolean; // 是否展示footer的数据
  showFlags?: number[]; // 需要展示的 按钮对应的 flags
  allPrice?: number | string; // 价格内容展示
  typeNum?: number | string; // 种类展示
  allNum?: number | string; // 件数 展示
}

const props = withDefaults(defineProps<IProps>(), {
  allPrice: 0,
  typeNum: 0,
  allNum: 0,
  showFooterDetailData: true,
  showFlags: () => [],
});

const slots = useSlots();

const buttonComponentType = {
  1: addOrderButton,
};

const buttonComponents = computed(() => props.showFlags.map((num: number) => buttonComponentType[num]));
</script>
