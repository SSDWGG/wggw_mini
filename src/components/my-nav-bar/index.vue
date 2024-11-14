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
      <view :style="{ height: safeTop }"> </view>

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
        <view v-else class="navbar__header-wrap">
          {{ title }}
        </view>
      </view>
    </view>
    <!-- 占位块 -->
    <view v-if="fixed" class="navbar__placeholder">
      <view :style="{ height: safeTop }"> </view>
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

<!-- todo

  左侧插槽
  title插槽
  右侧插槽

-->

<script lang="ts" setup>
// @ts-ignore
import Taro from '@tarojs/taro';
import styles from './styles.scss';
import { useSlots } from 'vue';

interface IProps {
  className?: string;
  title?: string;
  fixed?: boolean;
  safeTop?: string;
  contentHight?: string;
  backgroundColor?: string;
  // 隐藏返回
  hideBack?: boolean;
  leftIcon?: string;
  goBack?: () => {};
}

const props = withDefaults(defineProps<IProps>(), {
  className: 'wgg-navbar',
  title: 'NavBar',
  fixed: true,
  safeTop: '44px',
  contentHight: '44px',
  // transparent
  backgroundColor: '#fff',
  hideBack: false,
  leftIcon:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApJJREFUaEPtmVmO1DAQhn8HhieugIQrfRceENDd0zPsF0DcBvEMM8AATyD25Sqx3ULcYRapU8hSIoVMko6TOIs0/RjZzv/VX0lXVQQm/hMT148LgKEd9OYAEd0E8JyZd4IgeKqU+uAD1gsAEe0CeAtgJxH9V2t9bRIAUsqVEOIoI97qVlrr2egBpJR7Qog3OfFnQRDciqLo16gBSsSfMvOeMeazD/H2zE6eASnlfhL5yxmh3sV3AjCbzfbjOLZp8594ACut9RdfkU/PbeVAGIZ3mfl1gfhdrfVX3+JbORCG4T1mfjWk+MYAFeKXWutvfUS+cQoR0X0Ah7nInwCwadOreGcHysQLIZZKqe99Rt7ZASJ6AOAgH/khxdd2wIpn5kMhxKVMlE+EEAul1I8hIl/bASJ6yMwHYxS/1QEp5SMAL/PigyCYR1H0c8jIb3WgRPxxHMeL9Xo9CvGlDkgpHwN4kYv8MTPPjTFeqsqmbp4rJWxts9lsjgrE3zHG/G56I1/7zgEQ0R8A2e7JRn6U4gtTiIgMgOtje12WOVjkwBLA+4I/rMHf+UUQheX0GEuG2g6kC6cCUdnQjKlsdnYg3VDRdfVe+9d+BvILx9A6NnYg3VjRvPfW/zZ2IN1YNj5JurFemvg8hPNUomyA1dcYpTWAPaBk/nk6BISzA5l0Khri9jKNy7rQGMAeUjBGt5d7hWgFUAFxxswrn0PdrR2ZS/1ORLYAfJcfqyeT6U8uZ7mube1ApnYaBKIzAAsShuGCmW0pnn5aspftB47bvoYAnQJkIGw6XUndYWZtjAld06PO+s4BEoh54kQKMZ2PfJna6UYcx88AXBVCPFFKfawTUdc1XhxwFdFm/QVAm+h1sXfyDvwDmUo+QDLH3GkAAAAASUVORK5CYII=',
  goBack: undefined,
});

const slots = useSlots();

const handleGoTo = () => {
  if (props.goBack) {
    props.goBack();
  } else {
    Taro.navigateBack();
  }
};
</script>
