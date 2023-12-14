<template>
  <view  :class="{[styles.fullPreview]: true, [styles.dispoint]: !props.back}"  @tap="handleClickPage" >
    <view class="title">{{ !props.back?'Welcome to WGGW':'Enjoy' }}</view>
    <view class="logo">
        <image class="bgImg" :src="props.imgSrc" />
      </view>
      <view class="hypnotic-5"></view>
  </view>
</template>

<script lang="ts" setup>
import styles from './styles.scss'

interface Props {
  // 点击去菜单栏
  back: boolean
  imgSrc: string
  
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  imgSrc: 'https://panshi-on.oss-cn-hangzhou.aliyuncs.com/yunxiaoding-mini/system/assets/images/CGHMKNBP-1669687856120rabbit.jpg',
});
const emit = defineEmits(['back']);


const handleClickPage = ()=>{
  !!props.back&&emit('back')
  return 
}
</script>
