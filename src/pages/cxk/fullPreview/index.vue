<template>
  <view  :class="{[styles.fullPreview]: true, [styles.dispoint]: !props.back}"  @tap="handleClickPage" >
    <view class="title">{{ !props.back?'Welcome to kzw':'Enjoy' }}</view>
    <view class="logo">
        <image class="bgImg" :src="props.imgSrc" />
      </view>
      <view class="hypnotic-5"></view>
  </view>
  <svga-play-component ref="svgaPlayRef"  svgaUrl="https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/other/wggSVGA/normalSVGA/angel.svga" />

</template>

<script lang="ts" setup>
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
  imgSrc: require('@/assets/images/cxk/kun.png') ,
});
const emit = defineEmits(['back']);
const svgaPlayRef = ref();

// 显示svga动画
Taro.nextTick(()=>{
  svgaPlayRef.value.showSvga()
})

const handleClickPage = ()=>{
  !!props.back&&emit('back')
  return 
}
</script>
