<template>
  <view :class="[styles.myNavBar, className]">
    <!-- fix -->
    <view
      class="navbar__fixed"
      :style="{
        position: fixed ? 'fixed' : 'relative',
      }"
    >
      <!-- 顶部安全区 -->
      <view :style="{ height: `${statusBarHeight}px`, backgroundColor: backgroundColor, }"> </view>

      <!-- 内容区 -->
      <view
        class="navbar__header"
        :style="{
          height: contentHight,
          backgroundColor: backgroundColor,
        }"
      >
        <!-- left -->
        <view class="navbar__header-left">
          <slot v-if="!!slots.left" name="left" />

          <view v-else-if="!hideBack" class="navbar__goback" @tap="handleGoTo">
            <image class="navbar__icon" :src="leftIcon" mode="scaleToFill"> </image>
          </view>
        </view>
        <!-- tltle -->
        <slot v-if="!!slots.title" name="title" />
        <view v-else class="navbar__header-wrap" :style="{ color: props.titleColor }">
          {{ title }}
        </view>
      </view>
    </view>
    <!-- 占位块 -->
    <view v-if="fixed" class="navbar__placeholder">
      <view :style="{ height: `${statusBarHeight}px` }"> </view>
      <view
        :style="{
          height: contentHight,
          backgroundColor: backgroundColor,
        }"
      >
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro, { usePageScroll } from '@tarojs/taro';
// @ts-ignore
import styles from './styles.scss';
import { computed, useSlots } from 'vue';
import { getSizeToPx } from '@/utils/index';
import iconPath from './icon-back.png';

interface IProps {
  className?: string;
  title?: string;
  titleColor?: string;
  fixed?: boolean;
  contentHight?: number;
  backgroundColor?: string;
  // 隐藏返回
  hideBack?: boolean;
  leftIcon?: string;
  goback?: (e: any) => void; // eslint-disable-line no-unused-vars
}

const props = withDefaults(defineProps<IProps>(), {
  className: 'wgg-navbar',
  title: 'NavBar',
  fixed: true,
  contentHight: 44,
  titleColor: '#222222',
  backgroundColor: '#FFFFFF',
  hideBack: false,
  leftIcon:iconPath
});

const slots = useSlots();


const { statusBarHeight } = Taro.getSystemInfoSync();


const handleGoTo = (e) => {
  if (typeof props.goback === 'function') {
    props.goback(e);
  } else {
    Taro.navigateBack();
  }
};

usePageScroll((res) => {
  console.log(res.scrollTop);
});

const contentHight = computed(() => getSizeToPx(props.contentHight));

</script>
