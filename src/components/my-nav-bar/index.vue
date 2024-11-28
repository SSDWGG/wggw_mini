<template>
  <view :class="[styles.myNavBar, className]">
    <!-- fixed -->
    <view
      class="navbar__fixed"
      :style="{
        position: fixed ? 'fixed' : 'relative',
        opacity: isScrollChange ? opacityBg : 1,
        backgroundColor,
      }"
    >
      <!-- 顶部安全区 -->
      <view :style="{ height: `${statusBarHeight}px` }"> </view>

      <!-- 内容区 -->
      <view
        class="navbar__header"
        :style="{
          height: contentHight,
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
    <!-- 占位块(初始状态块) -->
    <view
      v-if="fixed"
      class="navbar__placeholder"
      :style="{
        position: 'relative',
        opacity: isScrollChange ? 1 - opacityBg : 0,
        backgroundColor: initBackgroundColor,
      }"
    >
      <view :style="{ height: `${statusBarHeight}px` }"> </view>
      <!-- 内容区 -->
      <view
        class="navbar__header"
        :style="{
          height: contentHight,
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
  </view>
</template>

<script lang="ts" setup>
import Taro, { usePageScroll } from '@tarojs/taro';
// @ts-ignore
import styles from './styles.scss';
import { computed, useSlots, ref } from 'vue';
import { getSizeToPx } from '@/utils/index';
import iconPath from './icon-back.png';

interface IProps {
  className?: string;
  title?: string;
  titleColor?: string;
  fixed?: boolean;

  contentHight?: number;
  // 底色
  backgroundColor?: string;
  // 是否开启滑动渐变效果
  isScrollChange?: boolean;
  // 滑动渐变的渐变距离,将作为除数，不能被等于0
  longScrollChange?: number;
  // 滑动渐变效果开启时，初始底色
  initBackgroundColor?: string;

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
  initBackgroundColor: 'transparent',
  longScrollChange: 100,
  hideBack: false,
  isScrollChange: false,
  leftIcon: iconPath,
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

const opacityBg = ref(0);

usePageScroll((res) => {
  if (res.scrollTop < 0) {
    opacityBg.value = 0;
  } else if (res.scrollTop > props.longScrollChange) {
    opacityBg.value = 1;
  } else {
    // 加快渐变时间
    opacityBg.value = Math.sqrt(res.scrollTop  / props.longScrollChange) ;
  }
});

const contentHight = computed(() => getSizeToPx(props.contentHight));
</script>
