<template>
  <view :class="{ [styles.fullPreview]: true, [styles.dispoint]: !props.back ,myfp:true }" @tap="handleClickPage">
    <view class="title">{{ props.title }}</view>
    <view class="logo">
      <image v-if="props.imgSrc" class="bgImg" :src="props.imgSrc" />
    </view>
    <view class="hypnotic-5"></view>
    <slot name="normalSlot"/>
  </view>
  <svga-play-component
    ref="svgaPlayRef"
    :canvasStyle="{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999999,
      pointerEvents: 'none',
    }"
    :svgaUrl="props.svgaUrl"
    :loop="props.svgaLoop"
    @finsh="onFinsh"
  />
</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss';
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import { ref, watch } from 'vue';
import Taro from '@tarojs/taro';
import imgDefaultSrc from '@/assets/images/project/rabbit.png';

interface Props {
  // 点击去菜单栏
  back: boolean;
  imgSrc: string;
  title: string;
  svgaUrl: string;
  svgaLoop: number;
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  title: 'Welcome to WGGW',
  svgaUrl: '',
  svgaLoop: 1,
  imgSrc: imgDefaultSrc,
});
const emit = defineEmits(['back', 'finsh']);
const svgaPlayRef = ref();

const onFinsh = () => {
  emit('finsh');
};

watch(
  () => props.svgaUrl,
  (val) => {
    // 显示svga动画
    Taro.nextTick(() => {
      if (val) {
        svgaPlayRef.value.showSvga();
      }
    });
  },
  { immediate: true },
);

const handleClickPage = () => {
  !!props.back && emit('back');

};
</script>
