<template>
  <view  :class="{[styles.fullPreview]: true, [styles.dispoint]: !props.back}"  @tap="handleClickPage" >
    <view class="title">{{ !props.back?'Welcome to WGGW':'Enjoy' }}</view>
    <view class="logo">
        <image class="bgImg" :src="props.imgSrc" />
      </view>
      <view class="hypnotic-5"></view>
      <svga-play-component ref="svgaPlayRef"  svgaUrl="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/rose.svga" />
  </view>

</template>

<script lang="ts" setup>
// @ts-ignore
import styles from './styles.scss'
import svgaPlayComponent from '@/components/svgaPlay/index.vue';
import { ref } from 'vue';
import Taro from '@tarojs/taro';

interface Props {
  // 点击去菜单栏
  back: boolean
  imgSrc: string
  
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  imgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggw/CGHMKNBP-1669687856120rabbit.jpg',
});
const emit = defineEmits(['back']);
const svgaPlayRef = ref();

// 显示svga动画
Taro.nextTick(()=>{
  // svgaPlayRef.value.showSvga()
})


const handleClickPage = ()=>{
  !!props.back&&emit('back')
  return 
}
</script>
